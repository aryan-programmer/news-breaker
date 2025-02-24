import { getAddress } from "@/lib/uniq-address";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ReactNode, useContext, useMemo } from "react";
import { Descendant } from "slate";
import { TableCellPercentageWidthsRecord } from "../editor/editor-data-store";
import { CustomElement, CustomText, ListItemElement, TableCellElement, TableHeaderCellElement, TableRowElement } from "../editor/types";
import { PDFDataContext } from "./PDFDataContext";
import { PDFTable, PDFTableCell, PDFTableRow } from "./PDFTable";
import "./registerFontsForPDF";
import { monospacePDFFont, sansSerifPDFFont, serifPDFFont } from "./registerFontsForPDF";

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
	},
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

function TextStringPDFRenderer({ element }: { element: CustomText }) {
	let style: Style = {};
	if (element.bold) style = { ...style, ...styles.bold };
	if (element.italic) style = { ...style, ...styles.italic };
	if (element.underline) style = { ...style, ...styles.underline };
	if (element.code) style = { ...style, ...styles.code };
	return <Text style={style}>{element.text}</Text>;
}

function TextLikeElementRenderer({ style, childrenElements }: { style: Style; childrenElements: CustomText[] }) {
	return (
		<Text wrap style={style}>
			{childrenElements.map((child) => (
				<TextStringPDFRenderer element={child} key={getAddress(child)} />
			))}
		</Text>
	);
}

function TableRowCommonRenderer({ elements, style }: { elements: (TableCellElement | TableHeaderCellElement)[]; style: Style }) {
	const data = useContext(PDFDataContext)!;
	const res: ReactNode[] = [];
	let totalWidth = 0;
	const arr = elements.map((el) => +data.tableCellPercentageWidths[el.id]);
	console.log(
		arr,
		arr.reduce((a, b) => a + b, 0),
	);
	for (const element of elements) {
		let percentageWidth = +data.tableCellPercentageWidths[element.id];
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
				{element.children.map(itemRenderer)}
			</PDFTableCell>,
		);
	}
	return res;
}

function TableHeaderRowRenderer({ element, isLastRow }: { element: TableRowElement; isLastRow: boolean }) {
	return (
		<PDFTableRow style={isLastRow ? styles.tableHeaderRowLast : styles.tableHeaderRow}>
			{TableRowCommonRenderer({ elements: element.children, style: {} })}
		</PDFTableRow>
	);
}

function TableRowRenderer({ element }: { element: TableRowElement }) {
	return <PDFTableRow>{TableRowCommonRenderer({ elements: element.children, style: {} })}</PDFTableRow>;
}

function TableFooterRowRenderer({ element }: { element: TableRowElement }) {
	return <PDFTableRow style={styles.tableFooterRow}>{TableRowCommonRenderer({ elements: element.children, style: {} })}</PDFTableRow>;
}

function ElementPDFRenderer({ element, isFirstElementInView }: { element: CustomElement; isFirstElementInView: boolean }) {
	const paragraphStyle = isFirstElementInView ? styles.firstParagraph : styles.paragraph;
	switch (element.type) {
		case "paragraph":
			return <TextLikeElementRenderer childrenElements={element.children} style={{ ...paragraphStyle, textAlign: element.align ?? "left" }} />;
		case "block-quote":
			return (
				<TextLikeElementRenderer
					childrenElements={element.children}
					style={{ ...paragraphStyle, ...styles.blockquote, textAlign: element.align ?? "left" }}
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
								<ElementPDFRenderer element={child} isFirstElementInView={i === 0} />
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
								<ElementPDFRenderer element={child} isFirstElementInView={i === 0} />
							</View>
						</View>
					))}
				</View>
			);
		case "list-item":
			return (
				<TextLikeElementRenderer
					childrenElements={element.children}
					style={{ ...paragraphStyle, textAlign: element.align ?? "left", marginTop: 0 }}
				/>
			);
		case "heading-1":
		case "heading-2":
		case "heading-3":
			return (
				<TextLikeElementRenderer
					childrenElements={element.children}
					style={{ ...paragraphStyle, ...styles[element.type], textAlign: element.align ?? "left" }}
				/>
			);
		case "image":
			return (
				// <View
				// 	style={{
				// 		display: "flex",
				// 		flexDirection: "row",
				// 		alignItems: "center",
				// 		justifyContent: value.align === "center" ? "center" : value.align === "right" ? "flex-end" : "flex-start",
				// 	}}>
				// eslint-disable-next-line jsx-a11y/alt-text
				<Image src={element.srcUrl} style={{ width: "100%", height: "auto" }} />
				// </View>
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
						<ElementPDFRenderer element={child} key={child.id} isFirstElementInView={i === 0} />
					))}
				</PDFTable>
			);
		case "table-cell-content":
			return <View style={{ width: "100%" }}>{element.children.map(itemRenderer)}</View>;
		case "table-head":
			return (
				<>
					{element.children.map((child, i, arr) => (
						<TableHeaderRowRenderer element={child} key={child.id} isLastRow={i === arr.length - 1} />
					))}
				</>
			);
		case "table-body":
			return (
				<>
					{element.children.map((child) => (
						<TableRowRenderer element={child} key={child.id} />
					))}
				</>
			);
		case "table-row":
			return <TableRowRenderer element={element} />;
		case "table-cell":
		case "table-header-cell":
			throw new Error(
				"Trying to render table-cell & table-header-cell in ElementPDFRenderer, which is impossible, as these cases are automatically handled in TableRowRenderer & TableHeaderRowRenderer.",
			);
		case "table-footer":
			return (
				<>
					{element.children.map((child) => (
						<TableFooterRowRenderer element={child} key={child.id} />
					))}
				</>
			);
		case "front-page-with-text":
		case "auto-toc":
		case "section-break":
		case "section-break-header-footer-editor-element":
		case "section-break-header-footer-cell":
			return <></>;
	}
}

function itemRenderer(item: Descendant, i: number) {
	return "id" in item ? (
		<ElementPDFRenderer element={item} key={item.id} isFirstElementInView={i === 0} />
	) : (
		<TextStringPDFRenderer element={item} key={getAddress(item)} />
	);
}

export function PDFDocument({
	elements,
	tableCellPercentageWidths,
}: {
	elements: Descendant[];
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
}) {
	const value = useMemo(() => ({ tableCellPercentageWidths }), [tableCellPercentageWidths]);
	return (
		<Document>
			<PDFDataContext.Provider value={value}>
				<Page style={styles.body}>{elements.map(itemRenderer)}</Page>
			</PDFDataContext.Provider>
		</Document>
	);
}
