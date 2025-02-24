import { Style } from "@react-pdf/stylesheet";
import { createContext } from "react";

export interface PDFTableContextData {
	borderWidth: string;
	borderStyle: Style["borderStyle"];
	borderColor: string;
}

export const PDFTableContext = createContext<PDFTableContextData>({
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: "black",
});