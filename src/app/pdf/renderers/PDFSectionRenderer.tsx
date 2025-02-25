import { SectionBreakElement, SectionBreakHeaderFooterEditorElement } from "@/app/editor/types";
import { Page, Text, View } from "@react-pdf/renderer";
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

export function PDFSectionRenderer({ section, elements, ctx: oldCtx }: { ctx: Ctx; section: SectionBreakElement; elements: Descendant[] }) {
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
			<View style={styles.sectionedBody}>{elements.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}</View>
			<View
				render={({ pageNumber }) => <PDFHeaderFooterRenderer element={pageNumber % 2 === 0 ? evenFooter : oddFooter} isHeader={false} ctx={ctx} />}
				fixed
				style={styles.fixedFooter}
			/>
		</Page>
	);
}
