import { CustomElement, ListItemElement } from "@/app/editor/types";
import { getAddress } from "@/lib/uniq-address";
import { Image, Text, View } from "@react-pdf/renderer";
import { Descendant } from "slate";
import { PDFTable } from "../base-tables";
import { Ctx } from "../PDFContextData";
import { PDFAutoTableOfContentsRenderer } from "./PDFAutoTableOfContentsRenderer";
import { styles } from "./styles";
import { PDFTableFooterRowRenderer, PDFTableHeaderRowRenderer, PDFTableRowRenderer } from "./tableLikeRenderers";
import { PDFHeadingRenderer, PDFTextLikeElementRenderer, PDFTextStringRenderer } from "./textLikeRenderers";

export function PDFElementRenderer({ element, isFirstElementInView, ctx }: { ctx: Ctx; element: CustomElement; isFirstElementInView: boolean }) {
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

export function itemRenderer(item: Descendant, i: number, ctx: Ctx) {
	return "id" in item ? (
		<PDFElementRenderer element={item} key={item.id} isFirstElementInView={i === 0} ctx={ctx} />
	) : (
		<PDFTextStringRenderer element={item} key={getAddress(item)} ctx={ctx} />
	);
}
