import { Document, Page } from "@react-pdf/renderer";
import { useMemo } from "react";
import { TableCellPercentageWidthsRecord } from "../../editor/editor-data-store";
import { MultiPassRenderData, MultiPassRenderDataUpdaters, PreprocessedTreeData } from "../pdf-rendering-utils";
import { Ctx } from "../PDFContextData";
import "../registerFontsForPDF";
import { itemRenderer } from "./PDFElementRenderer";
import { PDFFrontPageRenderer } from "./PDFFrontPageRenderer";
import { PDFSectionRenderer } from "./PDFSectionRenderer";
import { styles } from "./styles";

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
