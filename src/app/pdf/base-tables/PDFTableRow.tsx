import { flatten } from "@react-pdf/stylesheet";

import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import React, { useContext, useMemo } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { PDFTableCellProps } from "./PDFTableCell";
import { PDFTableContext } from "./PDFTableContext";

export interface PDFTableRowProps extends Omit<React.ComponentProps<typeof View>, "children"> {
	//isFirstRow?: boolean;
	isLastRow?: boolean;

	children?: React.ReactNode;
}

export function PDFTableRow({ children, style: styleProps, isLastRow, ...rest }: PDFTableRowProps) {
	const tableCtx = useContext(PDFTableContext);

	const cells = useMemo(
		() =>
			flattenChildren(children).map((td, columnIndex, arr) =>
				React.cloneElement(td as React.ReactElement<PDFTableCellProps>, {
					//isFirstColumn: columnIndex === 0,
					isLastColumn: columnIndex === arr.length - 1,
					//isFirstRow,
					isLastRow,
				}),
			),
		[children, isLastRow],
	);

	const styleNew = useMemo<Style>(() => {
		const { borderWidth, borderStyle, borderColor, border: _border, ...style } = styleProps == null ? {} : flatten(styleProps);
		const borderString = `${borderWidth ?? tableCtx.borderWidth} ${borderStyle ?? tableCtx.borderStyle} ${borderColor ?? tableCtx.borderColor}`;
		return {
			width: "100%",
			display: "flex",
			flexDirection: "row",
			...style,
			borderTop: "0px",
			borderRight: "0px",
			borderBottom: isLastRow ? "0px" : borderString,
			borderLeft: "0px",
		};
	}, [isLastRow, styleProps, tableCtx.borderColor, tableCtx.borderStyle, tableCtx.borderWidth]);

	return (
		<View {...rest} style={styleNew}>
			{cells}
		</View>
	);
}
