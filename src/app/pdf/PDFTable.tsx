import { flatten } from "@react-pdf/stylesheet";

import { Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import _ from "lodash";
import React, { useContext, useMemo } from "react";
import flattenChildren from "react-keyed-flatten-children";

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

export interface PDFTableProps extends Omit<React.ComponentProps<typeof View>, "children"> {
	children: React.ReactNode;
}

export interface PDFTableContextData {
	borderWidth: string;
	borderStyle: Style["borderStyle"];
	borderColor: string;
}

export const PDFTableContext = React.createContext<PDFTableContextData>({
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: "black",
});

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
			<View {...rest} style={style}>
				{rows}
			</View>
		</PDFTableContext.Provider>
	);
}
