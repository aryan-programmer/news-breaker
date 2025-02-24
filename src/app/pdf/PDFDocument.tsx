import { getAddress } from "@/lib/uniq-address";
import { Document, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ReactNode, useMemo } from "react";
import { toRoman } from "roman-numerals";
import { Descendant } from "slate";
import { TableCellPercentageWidthsRecord } from "../editor/editor-data-store";
import {
	AutoTableOfContentsElement,
	CustomElement,
	CustomText,
	FrontPageWithTextElement,
	HeadingNElement,
	ListItemElement,
	PageNumberFormatType,
	SectionBreakElement,
	SectionBreakHeaderFooterEditorElement,
	TableCellElement,
	TableHeaderCellElement,
	TableRowElement,
} from "../editor/types";
import { MultiPassRenderData, MultiPassRenderDataUpdaters, PreprocessedTreeData } from "./pdf-rendering-utils";
import { PDFTable, PDFTableCell, PDFTableRow } from "./PDFTable";
import "./registerFontsForPDF";
import { monospacePDFFont, sansSerifPDFFont, serifPDFFont } from "./registerFontsForPDF";

const styles = StyleSheet.create({
	frontPageBody: {
		padding: "0px",
		fontFamily: sansSerifPDFFont,
		fontSize: 16,
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	frontPageHeaderWithLogo: {
		justifySelf: "stretch",
		padding: "4px",
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
	},
	frontPageLogo: {
		marginTop: "4px",
		marginRight: "4px",
		height: "3.5rem",
		width: "auto",
		aspectRatio: "auto",
	},
	frontPageMainImageHolder: {
		maxWidth: "100%",
		maxHeight: "100%",
		minHeight: "0%",
		minWidth: "0%",
		display: "flex",
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	frontPageMainImage: {
		maxWidth: "100%",
		maxHeight: "100%",
		aspectRatio: "auto",
		objectFit: "scale-down",
	},

	body: {
		paddingTop: 55,
		paddingBottom: 60,
		paddingHorizontal: 35,
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
	},
	sectionedBodyPage: {
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
		paddingBottom: 60,
		paddingTop: 55,
	},
	sectionedBody: {
		paddingHorizontal: 35,
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
	},
	fixedHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	fixedFooter: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	headerFooter: {
		paddingVertical: 4,
		paddingHorizontal: 35,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 15,
	},
	headerFooterLeft: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	headerFooterCenter: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	headerFooterRight: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},

	tocContainer: { fontFamily: serifPDFFont, width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" },
	tocFields: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: "1px dotted #ddd",
	},
	"tocField:heading-1": {
		lineHeight: 1,
		paddingTop: "18px",
	},
	"tocField:heading-2": {
		lineHeight: 1,
		paddingLeft: 10,
		paddingTop: "8px",
	},
	"tocField:heading-3": {
		lineHeight: 1,
		paddingLeft: 20,
		paddingTop: "4px",
	},
	"tocFieldText:heading-1": {
		fontSize: "1.5rem",
		fontWeight: "semibold",
	},
	"tocFieldText:heading-2": {
		fontSize: "1.25rem",
		fontWeight: "medium",
	},
	"tocFieldText:heading-3": {},

	bold: {
		fontWeight: "bold",
	},
	italic: {
		fontStyle: "italic",
	},
	underline: {
		textDecoration: "underline",
		textDecorationStyle: "solid",
	},
	pageNumber: {
		fontFamily: monospacePDFFont,
	},
	code: {
		fontFamily: monospacePDFFont,
		backgroundColor: "#eee",
	},
	paragraph: {
		marginTop: "12px",
	},
	firstParagraph: {},
	blockquote: {
		borderLeft: "2px solid #ddd",
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: "10px",
		color: "#aaa",
		fontStyle: "italic",
	},

	"heading-1": {
		//mb-4 text-5xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.5rem",
		fontFamily: serifPDFFont,
		fontWeight: "extrabold",
		lineHeight: 1,
	},
	"heading-2": {
		//mb-3 text-4xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.25rem",
		fontFamily: serifPDFFont,
		fontWeight: "bold",
		lineHeight: 1,
	},
	"heading-3": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "2px",
		marginBottom: "5px",
		fontSize: "1.875rem",
		fontFamily: serifPDFFont,
		lineHeight: 1,
	},

	list: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	listItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		width: "100%",
		marginTop: "1px",
	},
	bullet: {
		margin: 0,
		padding: 0,
	},
	text: {
		flex: 1,
		margin: 0,
		padding: 0,
	},

	tableCell: {
		padding: "4px",
	},
	tableRow: {},
	tableHeaderRow: {
		borderColor: "#a7f3d0",
		fontWeight: "bold",
		backgroundColor: "#f1f5f9",
	},
	tableHeaderRowLast: {
		borderColor: "#a7f3d0",
		borderWidth: "4px",
		fontWeight: "semibold",
	},
	tableFooterRow: {
		backgroundColor: "rgba(241, 245, 249, 0.4)",
		color: "#64748b",
	},
});

export type PDFContextData = {
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
} & PreprocessedTreeData &
	MultiPassRenderData &
	MultiPassRenderDataUpdaters;

type Ctx = {
	pdfContext: PDFContextData;
	section: SectionBreakElement | null;
};

const char_a = "a".charCodeAt(0);

function toLowerAlpha(i: number) {
	if (i <= 26) {
		return String.fromCharCode(char_a + i - 1);
	}
	let res = "";
	while (i > 0) {
		const rem = i % 26;

		if (rem === 0) {
			res = "z" + res;
			i = Math.floor(i / 26) - 1;
		} else {
			res = String.fromCharCode(rem - 1 + char_a) + res;
			i = Math.floor(i / 26);
		}
	}
	return res;
}

function formatPageNumber(page: number, sectionId: string, pageNumberFormatting: PageNumberFormatType, ctx: Ctx): string {
	const normalizedPageNumber = page - (ctx.pdfContext.pageNumbers[ctx.pdfContext.effectiveSectionMap[sectionId]] ?? 1) + 1;
	switch (pageNumberFormatting) {
		case "numeric":
			return normalizedPageNumber.toFixed(0);
		case "lower":
			return toLowerAlpha(normalizedPageNumber);
		case "upper":
			return toLowerAlpha(normalizedPageNumber).toUpperCase();
		case "lower-roman":
			return toRoman(normalizedPageNumber).toLowerCase();
		case "upper-roman":
			return toRoman(normalizedPageNumber).toUpperCase();
	}
}

function PDFTextStringRenderer({ element, ctx }: { ctx: Ctx; element: CustomText }) {
	let style: Style = {};
	if (element.bold) style = { ...style, ...styles.bold };
	if (element.italic) style = { ...style, ...styles.italic };
	if (element.underline) style = { ...style, ...styles.underline };
	if (element.code) style = { ...style, ...styles.code };
	if (element.pageNumberOverride) {
		style = { ...style, ...styles.pageNumber };
		return (
			<Text
				style={style}
				render={({ pageNumber }) =>
					formatPageNumber(pageNumber, ctx.section?.id ?? ctx.pdfContext.first.id, ctx.section?.pageNumberFormat ?? "numeric", ctx)
				}>
				???
			</Text>
		);
	} else {
		return <Text style={style}>{element.text}</Text>;
	}
}

function PDFTextLikeElementRenderer({ style, id, childrenElements, ctx }: { ctx: Ctx; style: Style; id: string; childrenElements: CustomText[] }) {
	return (
		<Text wrap style={style} id={id}>
			{childrenElements.map((child) => (
				<PDFTextStringRenderer element={child} key={getAddress(child)} ctx={ctx} />
			))}
		</Text>
	);
}

function PDFHeadingRenderer({ style, element, ctx }: { ctx: Ctx; style: Style; element: HeadingNElement }) {
	return (
		<Text wrap style={style} id={element.id}>
			<Text
				render={({ pageNumber }) => {
					ctx.pdfContext.setPageNumber(element.id, pageNumber);
					return "";
				}}
			/>
			{element.children.map((child) => (
				<PDFTextStringRenderer element={child} key={getAddress(child)} ctx={ctx} />
			))}
		</Text>
	);
}

function PDFTableRowCommonRenderer({ elements, style, ctx }: { ctx: Ctx; elements: (TableCellElement | TableHeaderCellElement)[]; style: Style }) {
	const res: ReactNode[] = [];
	let totalWidth = 0;
	for (const element of elements) {
		let percentageWidth = +ctx.pdfContext.tableCellPercentageWidths[element.id];
		totalWidth += percentageWidth;
		if (totalWidth >= 100) {
			percentageWidth -= totalWidth - 100;
		}
		res.push(
			<PDFTableCell
				key={element.id}
				style={{
					...styles.tableCell,
					width: percentageWidth + "%",
					...style,
				}}>
				{element.children.map((c, i) => itemRenderer(c, i, ctx))}
			</PDFTableCell>,
		);
	}
	return res;
}

function PDFTableHeaderRowRenderer({ element, isLastRow, ctx }: { ctx: Ctx; element: TableRowElement; isLastRow: boolean }) {
	return (
		<PDFTableRow style={isLastRow ? styles.tableHeaderRowLast : styles.tableHeaderRow}>
			{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}
		</PDFTableRow>
	);
}

function PDFTableRowRenderer({ element, ctx }: { ctx: Ctx; element: TableRowElement }) {
	return <PDFTableRow>{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}</PDFTableRow>;
}

function PDFTableFooterRowRenderer({ element, ctx }: { ctx: Ctx; element: TableRowElement }) {
	return <PDFTableRow style={styles.tableFooterRow}>{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}</PDFTableRow>;
}

function PDFFrontPageRenderer({ element, ctx }: { ctx: Ctx; element: FrontPageWithTextElement }) {
	return (
		<Page
			style={{
				...styles.frontPageBody,
				backgroundColor: element.textSectionBgColor ?? undefined,
			}}>
			<View style={styles.frontPageHeaderWithLogo}>
				<View
					style={{
						flex: 1,
						// Yes, this invisible border is necessary, otherwise the text overflows
						border: `1px solid ${element.textSectionBgColor ?? "white"}`,
					}}>
					{element.children.map((c, i) => itemRenderer(c, i, ctx))}
				</View>
				{element.logoImageUrl != null ? (
					/* eslint-disable-next-line jsx-a11y/alt-text */
					<Image src={element.logoImageUrl} style={styles.frontPageLogo} />
				) : null}
			</View>
			<View style={styles.frontPageMainImageHolder}>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				<Image src={element.mainImageUrl} style={styles.frontPageMainImage} />
			</View>
		</Page>
	);
}

function PDFElementRenderer({ element, isFirstElementInView, ctx }: { ctx: Ctx; element: CustomElement; isFirstElementInView: boolean }) {
	const paragraphStyle = isFirstElementInView ? styles.firstParagraph : styles.paragraph;
	switch (element.type) {
		case "paragraph":
			return (
				<PDFTextLikeElementRenderer
					id={element.id}
					childrenElements={element.children}
					style={{ ...paragraphStyle, textAlign: element.align ?? "left" }}
					ctx={ctx}
				/>
			);
		case "block-quote":
			return (
				<PDFTextLikeElementRenderer
					id={element.id}
					childrenElements={element.children}
					style={{ ...paragraphStyle, ...styles.blockquote, textAlign: element.align ?? "left" }}
					ctx={ctx}
				/>
			);
		case "bulleted-list":
			return (
				<View style={{ ...paragraphStyle, ...styles.list, textAlign: element.align ?? "left" }}>
					{element.children.map((child: ListItemElement, i) => (
						<View style={styles.listItem} key={child.id}>
							<View style={styles.bullet}>
								<Text>{"\u2022" + " "}</Text>
							</View>
							<View style={styles.text}>
								<PDFElementRenderer element={child} isFirstElementInView={i === 0} ctx={ctx} />
							</View>
						</View>
					))}
				</View>
			);
		case "numbered-list":
			return (
				<View style={{ ...paragraphStyle, ...styles.list, textAlign: element.align ?? "left" }}>
					{element.children.map((child: ListItemElement, i: number) => (
						<View style={styles.listItem} key={child.id}>
							<View style={styles.bullet}>
								<Text>{i + 1}.</Text>
							</View>
							<View style={styles.text}>
								<PDFElementRenderer element={child} isFirstElementInView={i === 0} ctx={ctx} />
							</View>
						</View>
					))}
				</View>
			);
		case "list-item":
			return (
				<PDFTextLikeElementRenderer
					id={element.id}
					childrenElements={element.children}
					style={{ ...paragraphStyle, textAlign: element.align ?? "left", marginTop: 0 }}
					ctx={ctx}
				/>
			);
		case "heading-1":
		case "heading-2":
		case "heading-3":
			return (
				<PDFHeadingRenderer element={element} style={{ ...paragraphStyle, ...styles[element.type], textAlign: element.align ?? "left" }} ctx={ctx} />
			);
		case "image":
			return (
				// eslint-disable-next-line jsx-a11y/alt-text
				<Image src={element.srcUrl} style={{ width: "100%", height: "auto" }} />
			);
		case "page-break":
			return <Text break />;
		case "table":
			return (
				<PDFTable
					style={{
						borderWidth: "2px",
						borderColor: "#ddd",
					}}>
					{element.children.map((child, i) => (
						<PDFElementRenderer element={child} key={child.id} isFirstElementInView={i === 0} ctx={ctx} />
					))}
				</PDFTable>
			);
		case "table-cell-content":
			return <View style={{ width: "100%" }}>{element.children.map((c, i) => itemRenderer(c, i, ctx))}</View>;
		case "table-head":
			return (
				<>
					{element.children.map((child, i, arr) => (
						<PDFTableHeaderRowRenderer element={child} key={child.id} isLastRow={i === arr.length - 1} ctx={ctx} />
					))}
				</>
			);
		case "table-body":
			return (
				<>
					{element.children.map((child) => (
						<PDFTableRowRenderer element={child} key={child.id} ctx={ctx} />
					))}
				</>
			);
		case "table-row":
			return <PDFTableRowRenderer element={element} ctx={ctx} />;
		case "table-cell":
		case "table-header-cell":
			throw new Error(
				"Trying to render table-cell & table-header-cell in ElementPDFRenderer, which is impossible, as these cases are automatically handled in TableRowRenderer & TableHeaderRowRenderer.",
			);
		case "table-footer":
			return (
				<>
					{element.children.map((child) => (
						<PDFTableFooterRowRenderer element={child} key={child.id} ctx={ctx} />
					))}
				</>
			);
		case "front-page-with-text":
			throw new Error(
				"Trying to render front-page-with-text in ElementPDFRenderer, which is not allowed: The front page is to be rendered separately.",
			);
		case "section-break-header-footer-cell":
			return (
				<PDFTextLikeElementRenderer
					id={element.id}
					childrenElements={element.children}
					style={{ ...paragraphStyle, textAlign: element.align ?? "left" }}
					ctx={ctx}
				/>
			);
		case "section-break":
		case "section-break-header-footer-editor-element":
			throw new Error(
				"Trying to render section-break & section-break-header-footer-editor-element in ElementPDFRenderer, which is not allowed, as these cases are separately handled in PDFSectionRenderer & PDFHeaderFooterRenderer.",
			);
		case "auto-toc":
			return <PDFAutoTableOfContentsRenderer element={element} ctx={ctx} />;
	}
}

function PDFAutoTableOfContentsRenderer({ element, ctx }: { element: AutoTableOfContentsElement; ctx: Ctx }) {
	return (
		<View style={styles.tocContainer}>
			<Text style={{ ...styles["heading-1"], textAlign: "center", width: "100%", borderBottom: "2px dashed #faa" }}>Table of Contents</Text>
			{ctx.pdfContext.headersList.map((header) => {
				if (+header.type.split("-")[1] > element.includeHeaderLevelUpto) return null;
				const pageNum = ctx.pdfContext.pageNumbers[header.id];
				const parent = ctx.pdfContext.parentSectionMap[header.id];
				const numFormat = "pageNumberFormat" in parent ? parent.pageNumberFormat : "numeric";
				return (
					<View style={{ ...styles.tocFields, ...styles[`tocField:${header.type}`] }} key={header.id}>
						<Link href={`#${header.id}`} style={styles[`tocFieldText:${header.type}`]}>
							<PDFTextLikeElementRenderer id={header.id} childrenElements={header.children} style={styles.firstParagraph} ctx={ctx} />
						</Link>
						<View>
							<Text style={styles.pageNumber}>{pageNum == null ? "???" : formatPageNumber(pageNum, parent.id, numFormat, ctx)}</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
}

function PDFHeaderFooterRenderer({ element, ctx }: { ctx: Ctx; element: SectionBreakHeaderFooterEditorElement; isHeader: boolean }) {
	const [left, center, right] = element.children;
	return (
		<View style={{ ...styles.headerFooter, backgroundColor: element.bgColor }}>
			<View style={styles.headerFooterLeft}>
				<PDFElementRenderer element={left} isFirstElementInView ctx={ctx} />
			</View>
			<View style={styles.headerFooterCenter}>
				<PDFElementRenderer element={center} isFirstElementInView ctx={ctx} />
			</View>
			<View style={styles.headerFooterRight}>
				<PDFElementRenderer element={right} isFirstElementInView ctx={ctx} />
			</View>
		</View>
	);
}

function PDFSectionRenderer({ section, elements, ctx: oldCtx }: { ctx: Ctx; section: SectionBreakElement; elements: Descendant[] }) {
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
				render={({ pageNumber }) => <PDFHeaderFooterRenderer element={pageNumber % 2 === 0 ? evenHeader : oddHeader} isHeader ctx={ctx} />}
				fixed
				style={styles.fixedHeader}
			/>
			<Text
				style={styles.fixedHeader}
				render={({ pageNumber }) => {
					if (section.id === ctx.pdfContext.effectiveSectionMap[section.id]) {
						ctx.pdfContext.setPageNumber(section.id, pageNumber);
					}
					return "";
				}}
			/>
			<View style={styles.sectionedBody}>{elements.map((c, i) => itemRenderer(c, i, ctx))}</View>
			<View
				render={({ pageNumber }) => <PDFHeaderFooterRenderer element={pageNumber % 2 === 0 ? evenFooter : oddFooter} isHeader={false} ctx={ctx} />}
				fixed
				style={styles.fixedFooter}
			/>
		</Page>
	);
}

function itemRenderer(item: Descendant, i: number, ctx: Ctx) {
	return "id" in item ? (
		<PDFElementRenderer element={item} key={item.id} isFirstElementInView={i === 0} ctx={ctx} />
	) : (
		<PDFTextStringRenderer element={item} key={getAddress(item)} ctx={ctx} />
	);
}

export function PDFDocument({
	preprocessedData,
	tableCellPercentageWidths,
	renderData,
	renderDataUpdaters,
}: {
	preprocessedData: PreprocessedTreeData;
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
	renderData: MultiPassRenderData;
	renderDataUpdaters: MultiPassRenderDataUpdaters;
}) {
	const value = useMemo(
		() => ({ ...preprocessedData, tableCellPercentageWidths, ...renderData, ...renderDataUpdaters }),
		[preprocessedData, renderData, renderDataUpdaters, tableCellPercentageWidths],
	);
	const { first, blanks, withSections } = value;
	const ctx = useMemo<Ctx>(
		() => ({
			pdfContext: value,
			section: null,
		}),
		[value],
	);

	return (
		<Document>
			<PDFFrontPageRenderer element={first} ctx={ctx} />
			<Page style={styles.body}>{blanks.map((c, i) => itemRenderer(c, i, ctx))}</Page>
			{withSections.map(({ section, elements }) => (
				<PDFSectionRenderer section={section} elements={elements} key={section.id} ctx={ctx} />
			))}
		</Document>
	);
}
