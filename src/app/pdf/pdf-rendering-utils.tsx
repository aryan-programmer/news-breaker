import { pageNumberToLowerAlpha } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import deepEqual from "deep-equal";
import { toRoman } from "roman-numerals";
import { Descendant } from "slate";
import { TableCellPercentageWidthsRecord } from "../editor/editor-data-store";
import { recursiveTraverse } from "../editor/editor-utils";
import { FrontPageWithTextElement, HeadingNElement, PageNumberFormatType, SectionBreakElement } from "../editor/types";
import { isHeadingTypeName } from "../editor/types.guard";
import { Ctx } from "./PDFContextData";
import { PDFDocument } from "./renderers/PDFDocument";

export type PreprocessedTreeData = {
	first: FrontPageWithTextElement;
	blanks: Descendant[];
	withSections: { section: SectionBreakElement; elements: Descendant[] }[];
	headersList: HeadingNElement[];
	parentSectionMap: Record<string, SectionBreakElement | FrontPageWithTextElement>;
	effectiveSectionMap: Record<string, string>;
};

export function preprocessTree(elements: Descendant[]): PreprocessedTreeData {
	const [first, ...rest] = elements;
	if (!("type" in first && first.type === "front-page-with-text")) {
		throw new Error("The first element must be a front-page-with-text.");
	}

	const headings: HeadingNElement[] = [];
	recursiveTraverse(rest, (elem) => {
		if ("type" in elem && isHeadingTypeName(elem.type)) {
			headings.push(elem as HeadingNElement);
		}
	});
	headings.reverse();

	const effectiveSectionMap: Record<string, string> = {
		[first.id]: first.id,
	};
	let isFirst = true;
	let blanks: Descendant[] = [];
	const withSections: PreprocessedTreeData["withSections"] = [];
	let lastElementWithReset = first.id;
	let lastSectionBreak: SectionBreakElement | null = null;
	let sectionedElements: Descendant[] = [];
	for (const element of rest) {
		if (
			isFirst &&
			"type" in element &&
			element.type === "paragraph" &&
			(element.children.length === 0 || (element.children.length === 1 && element.children[0].text === ""))
		) {
			isFirst = false;
			continue;
		}
		isFirst = false;

		if ("type" in element && element.type === "section-break") {
			if (lastSectionBreak == null) {
				blanks = sectionedElements;
			} else {
				effectiveSectionMap[lastSectionBreak.id] = lastElementWithReset;
				withSections.push({ section: lastSectionBreak, elements: sectionedElements });
			}
			sectionedElements = [];
			lastSectionBreak = element;
			if (element.resetPageNumbering) lastElementWithReset = element.id;
		} else {
			sectionedElements.push(element);
		}
	}
	if (lastSectionBreak == null) {
		blanks = sectionedElements;
	} else {
		effectiveSectionMap[lastSectionBreak.id] = lastElementWithReset;
		withSections.push({ section: lastSectionBreak, elements: sectionedElements });
	}

	const parentSectionMap: Record<string, SectionBreakElement | FrontPageWithTextElement> = {};
	for (const id of recursiveTraverse(blanks)) {
		parentSectionMap[id] = first;
	}
	for (const { section, elements } of withSections) {
		for (const id of recursiveTraverse(elements)) {
			parentSectionMap[id] = section;
		}
	}

	return { first, blanks, withSections, headersList: headings, parentSectionMap, effectiveSectionMap };
}

export type PageNumberingData = {
	[key: string]: number | undefined;
};

export type MultiPassRenderData = {
	pageNumbers: PageNumberingData;
};

export type MultiPassRenderDataUpdaters = {
	setPageNumber(key: string, value: number): void;
};

export async function multiPassRender(elements: Descendant[], tableCellPercentageWidths: TableCellPercentageWidthsRecord) {
	const preprocessedData = preprocessTree(elements);
	let currData: MultiPassRenderData = {
		pageNumbers: {
			[preprocessedData.first.id]: 1,
		},
	};
	let nextData: MultiPassRenderData = {
		pageNumbers: {},
	};

	const nextUpdaters: MultiPassRenderDataUpdaters = {
		setPageNumber(key: string, value: number) {
			nextData.pageNumbers[key] = value;
		},
	};

	while (true) {
		const res = await pdf(
			<PDFDocument
				preprocessedData={preprocessedData}
				renderData={currData}
				renderDataUpdaters={nextUpdaters}
				tableCellPercentageWidths={tableCellPercentageWidths}
			/>,
		).toBlob();
		console.log({ currData, nextData });
		if (deepEqual(currData, nextData)) {
			return res;
		} else {
			currData = nextData;
			nextData = { pageNumbers: {} };
		}
	}
}

export function formatPageNumber(page: number, sectionId: string, pageNumberFormatting: PageNumberFormatType, ctx: Ctx): string {
	const normalizedPageNumber = page - (ctx.pdfContext.pageNumbers[ctx.pdfContext.effectiveSectionMap[sectionId]] ?? 1) + 1;
	switch (pageNumberFormatting) {
		case "numeric":
			return normalizedPageNumber.toFixed(0);
		case "lower":
			return pageNumberToLowerAlpha(normalizedPageNumber);
		case "upper":
			return pageNumberToLowerAlpha(normalizedPageNumber).toUpperCase();
		case "lower-roman":
			return toRoman(normalizedPageNumber).toLowerCase();
		case "upper-roman":
			return toRoman(normalizedPageNumber).toUpperCase();
	}
}
