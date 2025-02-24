import { createContext } from "react";
import { TableCellPercentageWidthsRecord } from "../editor/editor-data-store";

export type PDFContextData = {
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
};

export const PDFDataContext = createContext<PDFContextData | null>(null);
