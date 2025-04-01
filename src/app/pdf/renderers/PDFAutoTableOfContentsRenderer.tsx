import { AutoTableOfContentsElement } from "@/app/editor/types";
import { Link, Text, View } from "@react-pdf/renderer";
import { formatPageNumber } from "../pdf-rendering-utils";
import { Ctx } from "../PDFContextData";
import { styles } from "./styles";
import { PDFTextLikeElementRenderer } from "./textLikeRenderers";

export function PDFAutoTableOfContentsRenderer({ element, ctx }: { element: AutoTableOfContentsElement; ctx: Ctx }) {
	return (
		<View wrap style={styles.tocContainer}>
			<Text style={{ ...styles["heading-1"], textAlign: "center", width: "100%", borderBottom: "4px dashed #f33" }}>Table of Contents</Text>
			{ctx.pdfContext.headersList.map((header) => {
				if (+header.type.split("-")[1] > element.includeHeaderLevelUpto) return null;
				const pageNum = ctx.pdfContext.pageNumbers[header.id];
				const parent = ctx.pdfContext.parentSectionMap[header.id];
				const numFormat = "pageNumberFormat" in parent ? parent.pageNumberFormat : "numeric";
				return (
					<View style={{ ...styles.tocFields, ...styles[`tocField:${header.type}`] }} key={header.id}>
						<Link href={`#${header.id}`} style={styles[`tocFieldText:${header.type}`]}>
							<PDFTextLikeElementRenderer id={header.id} childrenElements={header.children} style={styles.lastParagraph} ctx={ctx} />
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
