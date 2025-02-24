import {
	TableBodySectionElement,
	TableCellContentElement,
	TableCellElement,
	TableElement,
	TableFootSectionElement,
	TableHeadSectionElement,
	TableHeaderCellElement,
	TableRowElement,
} from "@/app/editor/types";
import { Location } from "slate";

export interface WithTableOptions {
	blocks: {
		td: TableCellElement["type"];
		th: TableHeaderCellElement["type"];
		content: TableCellContentElement["type"];
		tr: TableRowElement["type"];
		table: TableElement["type"];
		tbody: TableBodySectionElement["type"];
		tfoot: TableFootSectionElement["type"];
		thead: TableHeadSectionElement["type"];
	};
	withDelete: boolean;
	withFragments: boolean;
	withInsertText: boolean;
	withNormalization: boolean;
	withSelection: boolean;
	withSelectionAdjustment: boolean;
}

export const DEFAULT_WITH_TABLE_OPTIONS = {
	blocks: {
		td: "table-cell",
		th: "table-header-cell",
		content: "table-cell-content",
		tr: "table-row",
		table: "table",
		tbody: "table-body",
		tfoot: "table-footer",
		thead: "table-head",
	},
	withDelete: true,
	withFragments: true,
	withInsertText: true,
	withNormalization: true,
	withSelection: true,
	withSelectionAdjustment: true,
} as const satisfies WithTableOptions;

export interface InsertTableOptions {
	rows: number;
	cols: number;
	at?: Location;
}

export const DEFAULT_INSERT_TABLE_OPTIONS = {
	rows: 2,
	cols: 2,
} as const satisfies InsertTableOptions;
