import { flatten } from "@react-pdf/stylesheet";

import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import _ from "lodash";
import React, { useMemo } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { PDFTableContext, PDFTableContextData } from "./PDFTableContext";
import { PDFTableRowProps } from "./PDFTableRow";

export * from "./PDFTableCell";
export * from "./PDFTableContext";
export * from "./PDFTableRow";

export interface PDFTableProps extends Omit<React.ComponentProps<typeof View>, "children"> {
	children: React.ReactNode;
}

export function PDFTable({ children, style: styleProps, ...rest }: PDFTableProps) {
	const flatStyle = useMemo(() => (styleProps == null ? {} : flatten(styleProps)), [styleProps]);
	const tableCtx = useMemo<PDFTableContextData>(() => {
		const style = flatStyle;

		if (typeof style.border === "string") {
			const [borderWidth, borderStyle, borderColor] = style.border.split(/\s+/);

			return {
				borderWidth: borderWidth,
				borderStyle: borderStyle as Style["borderStyle"],
				borderColor: borderColor,
			};
		}
		if (typeof style.border === "number") {
			return {
				borderWidth: `${style.border.toFixed(0)}px`,
				borderStyle: "solid",
				borderColor: "black",
			};
		}
		const { borderWidth, borderStyle, borderColor } = style;
		return {
			borderWidth: borderWidth == null ? "1px" : typeof borderWidth === "number" ? `${borderWidth.toFixed(0)}px` : borderWidth,
			borderStyle: borderStyle ?? "solid",
			borderColor: borderColor ?? "black",
		};
	}, [flatStyle]);

	const rows = useMemo(
		() =>
			flattenChildren(children).map((tr, rowIndex, arr) =>
				React.cloneElement(tr as React.ReactElement<PDFTableRowProps>, {
					//isFirstRow: rowIndex === 0,
					isLastRow: rowIndex === arr.length - 1,
				}),
			),
		[children],
	);

	const style = useMemo<Style>(() => {
		const resStyle = _.omit(flatStyle, ["border", "borderWidth", "borderStyle", "borderColor"]);
		const borderString = `${tableCtx.borderWidth} ${tableCtx.borderStyle} ${tableCtx.borderColor}`;
		return {
			width: "100%",
			borderTop: borderString,
			borderRight: borderString,
			borderLeft: borderString,
			borderBottom: "0px",
			...resStyle,
		};
	}, [flatStyle, tableCtx.borderColor, tableCtx.borderStyle, tableCtx.borderWidth]);

	return (
		<PDFTableContext.Provider value={tableCtx}>
			<View {...rest} wrap style={style}>
				{rows}
			</View>
		</PDFTableContext.Provider>
	);
}
