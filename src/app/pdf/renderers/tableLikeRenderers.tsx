import { TableCellElement, TableHeaderCellElement, TableRowElement } from "@/app/editor/types";
import { Style } from "@react-pdf/stylesheet";
import { ReactNode, useContext } from "react";
import { PDFTableCell, PDFTableContext, PDFTableRow } from "../base-tables";
import { Ctx } from "../PDFContextData";
import { itemRenderer } from "./PDFElementRenderer";
import { styles } from "./styles";

export function PDFTableRowCommonRenderer({
	elements,
	style,
	ctx,
}: {
	ctx: Ctx;
	elements: (TableCellElement | TableHeaderCellElement)[];
	style: Style;
}) {
	const tableCtx = useContext(PDFTableContext);
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
					// TODO: Fix
					padding: tableCtx.borderWidth !== "0px" ? "4px" : "0px",
					width: percentageWidth + "%",
					...style,
				}}>
				{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
			</PDFTableCell>,
		);
	}
	return res;
}

export function PDFTableHeaderRowRenderer({ element, isLastRow, ctx }: { ctx: Ctx; element: TableRowElement; isLastRow: boolean }) {
	return (
		<PDFTableRow style={isLastRow ? styles.tableHeaderRowLast : styles.tableHeaderRow}>
			{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}
		</PDFTableRow>
	);
}

export function PDFTableRowRenderer({ element, ctx }: { ctx: Ctx; element: TableRowElement }) {
	return <PDFTableRow>{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}</PDFTableRow>;
}

export function PDFTableFooterRowRenderer({ element, ctx }: { ctx: Ctx; element: TableRowElement }) {
	return <PDFTableRow style={styles.tableFooterRow}>{PDFTableRowCommonRenderer({ elements: element.children, style: {}, ctx })}</PDFTableRow>;
}
