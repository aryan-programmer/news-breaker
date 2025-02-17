import { Table, TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TableCursor } from "@/slate-table";
import { FC } from "react";
import { useSlateSelection, useSlateStatic } from "slate-react";
import { RenderElementAttributesProp, TableCellElement, TableElement, TableHeaderCellElement } from "./types";

export const TableElementRenderer: FC<{
	attributes: RenderElementAttributesProp;
	element: TableElement;
	children: unknown;
	className?: string;
}> = ({ attributes, children, className }) => {
	const editor = useSlateStatic();
	const [isSelecting] = TableCursor.selection(editor);

	return (
		<Table className={cn(!!isSelecting ? "table-selection-none" : "", className)} {...attributes}>
			{children as any}
		</Table>
	);
};

export const TableHeaderCellElementRenderer: FC<{
	attributes: RenderElementAttributesProp;
	element: TableHeaderCellElement;
	children: unknown;
	className?: string;
}> = ({ attributes, children, className, element }) => {
	useSlateSelection();
	const editor = useSlateStatic();
	const selected = TableCursor.isSelected(editor, element);

	return (
		<TableHead className={cn(selected ? "bg-amber-200" : "", className)} rowSpan={element.rowSpan} colSpan={element.colSpan} {...attributes}>
			{children as any}
		</TableHead>
	);
};

export const TableCellElementRenderer: FC<{
	attributes: RenderElementAttributesProp;
	element: TableCellElement;
	children: unknown;
	className?: string;
}> = ({ attributes, children, className, element }) => {
	useSlateSelection();
	const editor = useSlateStatic();
	const selected = TableCursor.isSelected(editor, element);

	return (
		<TableCell className={cn(selected ? "bg-amber-200" : "", className)} rowSpan={element.rowSpan} colSpan={element.colSpan} {...attributes}>
			{children as any}
		</TableCell>
	);
};
