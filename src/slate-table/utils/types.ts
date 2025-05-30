import { TableCellElement, TableHeaderCellElement } from "@/app/editor/types";
import { Element, NodeEntry } from "slate";

export type CellElement = TableHeaderCellElement | TableCellElement;

/** Extends an element with the "type" property  */
export type WithType<T extends Element> = T & Record<"type", unknown>;

export type NodeEntryWithContext = [
	NodeEntry<CellElement>,
	{
		rtl: number; // right-to-left (colspan)
		ltr: number; // left-to-right (colspan)
		//ttb: never; // top-to-bottom (rowspan)
		//btt: never; // bottom-to-top (rowspan)
	},
];

export type SelectionMode = "start" | "end" | "all";

export type Edge = "start" | "end" | "top" | "bottom";
