import { CustomElement, ListItemElement } from "@/app/editor/types";
import { getAddress } from "@/lib/uniq-address";
import { coreceEmptyToUndef, isNonNullAndNonEmpty } from "@/lib/utils";
import { Image, Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import { Descendant } from "slate";
import { PDFTable } from "../base-tables";
import { Ctx } from "../PDFContextData";
import { PDFAddBottomShadowOptionally } from "./PDFAddBottomShadow";
import { PDFAutoTableOfContentsRenderer } from "./PDFAutoTableOfContentsRenderer";
import { PDFCardRenderer } from "./PDFCardRenderer";
import { styles } from "./styles";
import { PDFTableFooterRowRenderer, PDFTableHeaderRowRenderer, PDFTableRowRenderer } from "./tableLikeRenderers";
import { PDFHeadingRenderer, PDFTextLikeElementRenderer, PDFTextStringRenderer } from "./textLikeRenderers";

const alignToJustifyContentValue = {
	left: "flex-start",
	right: "flex-end",
	justify: "flex-start",
	center: "center",
} as const;

export function PDFElementRenderer({
	element,
	isLastElementInView,
	ctx,
	style: styleOrig,
}: {
	ctx: Ctx;
	element: CustomElement;
	isLastElementInView: boolean;
	style?: Style;
}) {
	const paragraphStyle = isLastElementInView ? styles.lastParagraph : styles.paragraph;
	const style = { ...styleOrig, textAlign: element.align ?? "left" };
	switch (element.type) {
		case "paragraph":
			return <PDFTextLikeElementRenderer id={element.id} childrenElements={element.children} style={{ ...paragraphStyle, ...style }} ctx={ctx} />;
		case "block-quote":
			return (
				<PDFTextLikeElementRenderer
					id={element.id}
					childrenElements={element.children}
					style={{ ...paragraphStyle, ...style, ...styles.blockquote }}
					ctx={ctx}
				/>
			);
		case "bulleted-list":
			return (
				<View wrap style={{ ...paragraphStyle, ...style, ...styles.list }}>
					{element.children.map((child: ListItemElement, i, arr) => (
						<View wrap style={styles.listItem} key={child.id}>
							<View style={styles.bullet}>
								<Text>{"\u2022" + " "}</Text>
							</View>
							<View style={styles.text}>
								<PDFElementRenderer element={child} isLastElementInView={i === arr.length - 1} ctx={ctx} />
							</View>
						</View>
					))}
				</View>
			);
		case "numbered-list":
			return (
				<View wrap style={{ ...paragraphStyle, ...style, ...styles.list }}>
					{element.children.map((child: ListItemElement, i: number, arr) => (
						<View wrap style={styles.listItem} key={child.id}>
							<View style={styles.bullet}>
								<Text>{i + 1}.</Text>
							</View>
							<View style={styles.text}>
								<PDFElementRenderer element={child} isLastElementInView={i === arr.length - 1} ctx={ctx} />
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
					style={{ ...paragraphStyle, ...style, marginBottom: 0 }}
					ctx={ctx}
				/>
			);
		case "heading-1":
		case "heading-2":
		case "heading-3":
		case "heading-4":
		case "heading-5":
		case "heading-6":
			return <PDFHeadingRenderer element={element} style={{ ...paragraphStyle, ...style, ...styles[element.type] }} ctx={ctx} />;
		case "image": {
			const borderRadius = element.rounded ? "12px" : undefined;
			return (
				<View
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: alignToJustifyContentValue[element.align ?? "left"],
						...style,
					}}>
					<View style={{ width: element.width, paddingLeft: "3px", paddingRight: "3px" }}>
						<PDFAddBottomShadowOptionally borderRadius={borderRadius} shadowColor={element.shadowColor}>
							<View
								style={[
									{
										borderRadius,
										width: "100%",
									},
									coreceEmptyToUndef(element.bgColor) == null ? { backgroundColor: element.bgColor!, padding: "3px" } : {},
									isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
								]}>
								{/* eslint-disable-next-line jsx-a11y/alt-text*/}
								<Image src={element.srcUrl} style={{ borderRadius, width: "100%", height: "auto", maxHeight: "100%", objectFit: "scale-down" }} />
							</View>
						</PDFAddBottomShadowOptionally>
					</View>
				</View>
			);
		}
		case "page-break":
			return <Text wrap break />;
		case "table":
			return (
				<PDFTable
					style={{
						...style,
						borderWidth: element.border ? "2px" : "0px",
						borderColor: "#ddd",
					}}>
					{element.children.map((child, i, arr) => (
						<PDFElementRenderer element={child} key={child.id} isLastElementInView={i === arr.length - 1} ctx={ctx} />
					))}
				</PDFTable>
			);
		case "table-cell-content":
			return <View style={{ ...style, width: "100%" }}>{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}</View>;
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
			return <PDFTextLikeElementRenderer id={element.id} childrenElements={element.children} style={{ ...paragraphStyle, ...style }} ctx={ctx} />;
		case "section-break":
		case "section-break-header-footer-editor-element":
			throw new Error(
				"Trying to render section-break & section-break-header-footer-editor-element in ElementPDFRenderer, which is not allowed, as these cases are separately handled in PDFSectionRenderer & PDFHeaderFooterRenderer.",
			);
		case "auto-toc":
			return <PDFAutoTableOfContentsRenderer element={element} ctx={ctx} />;
		case "flexbox": {
			const t = {
				maxWidth: "100%",
				...style,
				display: "flex",
				alignContent: element.alignContent,
				alignItems: element.alignItems ?? "flex-start",
				flexDirection: "row",
				flexWrap: element.flexWrap ?? "wrap",
				justifyContent: element.justifyContent ?? "flex-start",
				alignSelf: element.alignSelf,
				flexGrow: element.flexGrow ?? 0,
				flexShrink: element.flexShrink ?? 0,
				flexBasis: element.flexBasis ?? "auto",
				width: element.width ?? "auto",
				height: element.height ?? "auto",
			} as const satisfies Style;
			const fixChildrenWidthRatios = element.fixChildrenWidthRatios;
			if (fixChildrenWidthRatios == null || fixChildrenWidthRatios.length === 0) {
				return (
					<View style={t} wrap={false}>
						{element.children.map((child, i, arr) => itemRenderer(child, i === arr.length - 1, ctx))}
					</View>
				);
			} else {
				const total = fixChildrenWidthRatios.reduce((a, b) => a + b, 0);
				const percentages = fixChildrenWidthRatios.map((a) => (a / total) * 100 + "%");
				return (
					<View style={t} wrap={false}>
						{element.children.map((child, i, arr) =>
							itemRenderer(child, i === arr.length - 1, ctx, { style: { width: percentages[i % fixChildrenWidthRatios.length] } }),
						)}
					</View>
				);
			}
		}
		case "card":
			return <PDFCardRenderer style={style} element={element} ctx={ctx} />;
	}
}

export function itemRenderer(item: Descendant, isLastElementInView: boolean, ctx: Ctx, info?: { style: Style }) {
	return "id" in item ? (
		<PDFElementRenderer element={item} key={item.id} isLastElementInView={isLastElementInView} ctx={ctx} style={info?.style} />
	) : (
		<PDFTextStringRenderer element={item} key={getAddress(item)} ctx={ctx} style={info?.style} />
	);
}
