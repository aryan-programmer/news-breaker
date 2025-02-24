import { flatten } from "@react-pdf/stylesheet";

import { Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import React, { useContext, useMemo } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { PDFTableContext } from "./PDFTableContext";

export interface PDFTableCellProps extends Omit<React.ComponentProps<typeof View>, "children"> {
	//weighting?: number;
	//colSpan: number;

	//isFirstColumn?: boolean;
	isLastColumn?: boolean;
	//isFirstRow?: boolean;
	isLastRow?: boolean;

	children?: React.ReactNode | React.ReactNode[];
}

export function PDFTableCell({ children, isLastColumn, style: styleProps, ...rest }: PDFTableCellProps) {
	const content = useMemo(
		() =>
			flattenChildren(children).map((child, index) => {
				if (typeof child === "string" || typeof child === "number") {
					return <Text key={`table_cell_${index}_content`}>{child}</Text>;
				} else {
					return child;
				}
			}),
		[children],
	);

	const tableCtx = useContext(PDFTableContext);

	const styleNew = useMemo<Style>(() => {
		const { borderWidth, borderStyle, borderColor, border: _border, ...style } = styleProps == null ? {} : flatten(styleProps);
		const borderString = `${borderWidth ?? tableCtx.borderWidth} ${borderStyle ?? tableCtx.borderStyle} ${borderColor ?? tableCtx.borderColor}`;
		return {
			// flexBasis: 0,
			// flexGrow: weighting ?? 1,
			// flexShrink: weighting ?? 1,
			display: "flex",
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			...style,
			borderTop: "0px",
			borderRight: isLastColumn ? "0px" : borderString,
			borderBottom: "0px",
			borderLeft: "0px",
		};
	}, [isLastColumn, styleProps, tableCtx.borderColor, tableCtx.borderStyle, tableCtx.borderWidth]);

	return (
		<View wrap={true} style={styleNew} {...rest}>
			{content}
		</View>
	);
}
