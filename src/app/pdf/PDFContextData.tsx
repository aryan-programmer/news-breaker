import { TableCellPercentageWidthsRecord } from "../editor/editor-data-store";
import { SectionBreakElement } from "../editor/types";
import { MultiPassRenderData, MultiPassRenderDataUpdaters, PreprocessedTreeData } from "./pdf-rendering-utils";

export type PDFContextData = {
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
} & PreprocessedTreeData &
	MultiPassRenderData &
	MultiPassRenderDataUpdaters;

export type Ctx = {
	pdfContext: PDFContextData;
	section: SectionBreakElement | null;
};
