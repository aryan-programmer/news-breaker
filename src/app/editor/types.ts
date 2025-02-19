import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderElementProps } from "slate-react";

/** @see {isAlignType} ts-auto-guard:type-guard */
export type AlignType = "left" | "center" | "right" | "justify";

export type AlignTypeNoJustify = "left" | "center" | "right";

export type SectionBreakHeaderFooterEditorElementType = "odd-header" | "odd-footer" | "even-header" | "even-footer";

/** @see {isPageNumberFormatType} ts-auto-guard:type-guard */
export type PageNumberFormatType = "numeric" | "lower" | "upper" | "lower-roman" | "upper-roman";

export type FrontPageWithTextElement = {
	type: "front-page-with-text";
	children: Descendant[];
	mainImageUrl: string;
	logoImageUrl?: string | null | undefined;
	textSectionBgColor?: string | null | undefined;
	id: string;
};
export type AutoTableOfContentsElement = {
	type: "auto-toc";
	children: [CustomText];
	id: string;
	includeHeaderLevelUpto: 1 | 2 | 3;
};
export type PageBreakElement = {
	type: "page-break";
	children: [CustomText];
	id: string;
};
export type DivElement = {
	type: "div";
	align?: AlignType;
	children: Descendant[];
};
export type Paragraph = {
	type: "paragraph";
	align?: AlignType;
	children: CustomText[];
};
export type BlockQuote = {
	type: "block-quote";
	children: CustomText[];
};
export type ListItemElement = {
	type: "list-item";
	children: CustomText[];
};
export type Heading1Element = {
	type: "heading-1";
	children: CustomText[];
};
export type Heading2Element = {
	type: "heading-2";
	children: CustomText[];
};
export type Heading3Element = {
	type: "heading-3";
	children: CustomText[];
};
export type NumberedListElement = {
	type: "numbered-list";
	children: ListItemElement[];
};
export type BulletedListElement = {
	type: "bulleted-list";
	children: ListItemElement[];
};
export type ImageElement = {
	type: "image";
	srcUrl: string;
	children: [CustomText];
	id: string;
};
export type TableCellElement = {
	type: "table-cell";
	children: Descendant[];
	rowSpan?: number;
	colSpan?: number;
};
export type TableHeaderCellElement = {
	type: "table-header-cell";
	children: Descendant[];
	rowSpan?: number;
	colSpan?: number;
};
export type TableRowElement = {
	type: "table-row";
	children: (TableCellElement | TableHeaderCellElement)[];
};
export type TableElement = {
	type: "table";
	children: (TableHeadSectionElement | TableBodySectionElement | TableFootSectionElement)[];
};
export type TableBodySectionElement = { type: "table-body"; children: TableRowElement[] };
export type TableFootSectionElement = { type: "table-footer"; children: TableRowElement[] };
export type TableHeadSectionElement = { type: "table-head"; children: TableRowElement[] };

export type SectionBreakHeaderFooterCellGeneric<T extends AlignTypeNoJustify> = {
	type: "section-break-header-footer-cell";
	elementType: T;
	children: CustomText[];
};
export type SectionBreakHeaderFooterCell = SectionBreakHeaderFooterCellGeneric<AlignTypeNoJustify>;

export type SectionBreakHeaderFooterEditorElementGeneric<T extends SectionBreakHeaderFooterEditorElementType> = {
	type: "section-break-header-footer-editor-element";
	elementType: T;
	children: [
		SectionBreakHeaderFooterCellGeneric<"left">,
		SectionBreakHeaderFooterCellGeneric<"center">,
		SectionBreakHeaderFooterCellGeneric<"right">,
	];
	bgColor: string;
};
export type SectionBreakHeaderFooterEditorElement = SectionBreakHeaderFooterEditorElementGeneric<SectionBreakHeaderFooterEditorElementType>;
export type SectionBreakElement = {
	type: "section-break";
	id: string;
	pageNumberFormat: PageNumberFormatType;
	resetPageNumbering: boolean;
	children: [
		SectionBreakHeaderFooterEditorElementGeneric<"odd-header">,
		SectionBreakHeaderFooterEditorElementGeneric<"odd-footer">,
		SectionBreakHeaderFooterEditorElementGeneric<"even-header">,
		SectionBreakHeaderFooterEditorElementGeneric<"even-footer">,
	];
};

export type CustomElement =
	| Paragraph
	| BlockQuote
	| ListItemElement
	| Heading1Element
	| Heading2Element
	| Heading3Element
	| BulletedListElement
	| NumberedListElement
	| ImageElement
	| FrontPageWithTextElement
	| AutoTableOfContentsElement
	| PageBreakElement
	| TableCellElement
	| TableHeaderCellElement
	| TableRowElement
	| TableElement
	| TableBodySectionElement
	| TableFootSectionElement
	| TableHeadSectionElement
	| DivElement
	| SectionBreakElement
	| SectionBreakHeaderFooterEditorElement
	| SectionBreakHeaderFooterCell;

export type ElementsWhoseTypesCannotBeChanged =
	| ImageElement
	| FrontPageWithTextElement
	| AutoTableOfContentsElement
	| PageBreakElement
	| TableCellElement
	| TableHeaderCellElement
	| TableRowElement
	| TableElement
	| TableBodySectionElement
	| TableFootSectionElement
	| TableHeadSectionElement
	| SectionBreakElement
	| SectionBreakHeaderFooterEditorElement
	| SectionBreakHeaderFooterCell;

/** @see {isElementNameThatOfElementWhoseTypeCannotBeChanged} ts-auto-guard:type-guard */
export type TypeNamesOfElementsWhoseTypesCannotBeChanged = ElementsWhoseTypesCannotBeChanged["type"];

// const PAGE_NUMBER_SPECIAL = "___PAGE_NUMBER_SPECIAL___";

export type CustomText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
	code?: true;
	pageNumberOverride?: true;
};
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TextMarkTypes = keyof Omit<CustomText, "text">;

/** @see {isCustomElementTypeStr} ts-auto-guard:type-guard */
export type CustomElementTypeStr = CustomElement["type"];

/** @see {isListElementTypeStr} ts-auto-guard:type-guard */
export type ListElementTypeStr = (NumberedListElement | BulletedListElement)["type"];

export type RenderElementAttributesProp = RenderElementProps["attributes"];

declare module "slate" {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
