import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCursor, TableEditor } from "@/slate-table";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useCallback } from "react";
import { useSlate } from "slate-react";
import {
	ColumnIcon,
	ColumnInsertLeftIcon,
	ColumnInsertRightIcon,
	ColumnRemoveIcon,
	MergeCellIcon,
	RowIcon,
	RowInsertBottomIcon,
	RowInsertTopIcon,
	RowRemoveIcon,
	SplitCellIcon,
	TableMinusIcon,
} from "./SVGIcons";

export function TableDropDownMenu(): ReactNode {
	const editor = useSlate();
	const enable = TableCursor.isInTable(editor, { at: editor.selection?.anchor.path });
	const mergeCallback = useCallback(() => TableEditor.merge(editor), [editor]);
	const splitCallback = useCallback(() => TableEditor.split(editor), [editor]);
	const insertRowAfterCallback = useCallback(() => TableEditor.insertRow(editor), [editor]);
	const insertRowBeforeCallback = useCallback(() => TableEditor.insertRow(editor, { before: true }), [editor]);
	const removeRowCallback = useCallback(() => TableEditor.removeRow(editor), [editor]);
	const insertColumnAfterCallback = useCallback(() => TableEditor.insertColumn(editor), [editor]);
	const insertColumnBeforeCallback = useCallback(() => TableEditor.insertColumn(editor, { before: true }), [editor]);
	const removeColumnCallback = useCallback(() => TableEditor.removeColumn(editor), [editor]);
	const removeTableCallback = useCallback(() => TableEditor.removeTable(editor), [editor]);
	return enable ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" rounding="zero">
					<FontAwesomeIcon icon={faTable} />
					{/* <ChevronDownIcon width={14} height={14} /> */}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem onSelect={mergeCallback}>
					<MergeCellIcon width={20} height={20} />
					Merge Cells
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={splitCallback}>
					<SplitCellIcon width={20} height={20} /> Split Cell
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<RowIcon width={20} height={20} /> Rows
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={insertRowBeforeCallback}>
						<RowInsertTopIcon width={20} height={20} /> Add Row Above
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={insertRowAfterCallback}>
						<RowInsertBottomIcon width={20} height={20} /> Add Row Below
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={removeRowCallback} variant="destructive-outline">
						<RowRemoveIcon width={20} height={20} /> Delete Row
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<ColumnIcon width={20} height={20} /> Columns
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={insertColumnBeforeCallback}>
						<ColumnInsertLeftIcon width={20} height={20} /> Add Column Left
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={insertColumnAfterCallback}>
						<ColumnInsertRightIcon width={20} height={20} /> Add Column Right
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={removeColumnCallback} variant="destructive-outline">
						<ColumnRemoveIcon width={20} height={20} /> Delete Column
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={removeTableCallback} variant="destructive">
					<TableMinusIcon width={20} height={20} /> Delete Table
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : null;
}
