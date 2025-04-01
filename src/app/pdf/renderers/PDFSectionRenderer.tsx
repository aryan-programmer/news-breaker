/* eslint-disable jsx-a11y/alt-text */
import { SectionBreakElement, SectionBreakHeaderFooterEditorElement } from "@/app/editor/types";
import { isNonNullAndNonEmpty } from "@/lib/utils";
import { Image, Page, Text, View } from "@react-pdf/renderer";
import { useMemo } from "react";
import { Descendant } from "slate";
import { Ctx } from "../PDFContextData";
import { itemRenderer, PDFElementRenderer } from "./PDFElementRenderer";
import { styles } from "./styles";

function PDFHeaderFooterRenderer({ element, ctx }: { ctx: Ctx; element: SectionBreakHeaderFooterEditorElement; isHeader: boolean }) {
	const [left, center, right] = element.children;
	return (
		<View style={{ ...styles.headerFooter, backgroundColor: element.bgColor }}>
			<View style={styles.headerFooterLeft}>
				<PDFElementRenderer element={left} isLastElementInView ctx={ctx} />
			</View>
			<View style={styles.headerFooterCenter}>
				<PDFElementRenderer element={center} isLastElementInView ctx={ctx} />
			</View>
			<View style={styles.headerFooterRight}>
				<PDFElementRenderer element={right} isLastElementInView ctx={ctx} />
			</View>
		</View>
	);
}

function PDFBackgroundRenderer({ element, isOdd }: { ctx: Ctx; element: SectionBreakElement; isOdd: boolean }) {
	const imageUrl = isOdd ? element.oddPageImageUrl : element.evenPageImageUrl;
	const bgColor = isOdd ? element.oddPageBackgroundColor : element.evenPageBackgroundColor;
	return isNonNullAndNonEmpty(imageUrl) ? (
		<Image
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: bgColor,
			}}
			source={imageUrl}
		/>
	) : (
		<View
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: bgColor,
			}}
		/>
	);
}

export function PDFSectionRenderer({
	section,
	elements,
	isFirst,
	ctx: oldCtx,
}: {
	ctx: Ctx;
	section: SectionBreakElement;
	elements: Descendant[];
	isFirst: boolean;
}) {
	const ctx = useMemo<Ctx>(
		() => ({
			pdfContext: oldCtx.pdfContext,
			section: section,
		}),
		[oldCtx.pdfContext, section],
	);
	const [oddHeader, oddFooter, evenHeader, evenFooter] = section.children;
	return (
		<Page style={styles.sectionedBodyPage}>
			<View
				render={({ pageNumber }) => <PDFBackgroundRenderer element={section} isOdd={pageNumber % 2 === 1} ctx={ctx} />}
				fixed
				style={styles.fixedBackground}
			/>
			<View
				render={({ pageNumber }) => <PDFHeaderFooterRenderer element={pageNumber % 2 === 0 ? evenHeader : oddHeader} isHeader ctx={ctx} />}
				fixed
				style={styles.fixedHeader}
			/>
			{isFirst ? (
				<Text
					style={styles.fixedHeader}
					render={({ pageNumber }) => {
						if (isFirst && section.id === ctx.pdfContext.effectiveSectionMap[section.id]) {
							ctx.pdfContext.setPageNumber(section.id, pageNumber);
						}
						return "";
					}}
				/>
			) : null}

			<View style={styles.sectionedBody}>{elements.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}</View>
			<View
				render={({ pageNumber }) => <PDFHeaderFooterRenderer element={pageNumber % 2 === 0 ? evenFooter : oddFooter} isHeader={false} ctx={ctx} />}
				fixed
				style={styles.fixedFooter}
			/>
		</Page>
	);
}
