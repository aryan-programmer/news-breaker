import { Table, TableCell, TableHeadCell } from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { TableCursor } from "@/slate-table";
import { useSlateSelection, useSlateStatic } from "slate-react";
import { RenderElementAttributesProp, TableCellElement, TableElement, TableHeaderCellElement } from "../types";

export function TableElementRenderer({
	attributes,
	children,
	className,
}: {
	attributes: RenderElementAttributesProp;
	element: TableElement;
	children: unknown;
	className?: string;
}) {
	const editor = useSlateStatic();
	const [isSelecting] = TableCursor.selection(editor);

	return (
		<Table className={cn(!!isSelecting ? "table-selection-none" : "", className)} {...attributes}>
			{children as any}
		</Table>
	);
}

export function TableHeaderCellElementRenderer({
	attributes,
	children,
	className,
	element,
}: {
	attributes: RenderElementAttributesProp;
	element: TableHeaderCellElement;
	children: unknown;
	className?: string;
}) {
	useSlateSelection();
	const editor = useSlateStatic();
	const selected = TableCursor.isSelected(editor, element);

	return (
		<TableHeadCell className={cn(selected ? "bg-amber-200" : "", className)} rowSpan={element.rowSpan} colSpan={element.colSpan} {...attributes}>
			{children as any}
		</TableHeadCell>
	);
}

export function TableCellElementRenderer({
	attributes,
	children,
	className,
	element,
}: {
	attributes: RenderElementAttributesProp;
	element: TableCellElement;
	children: unknown;
	className?: string;
}) {
	useSlateSelection();
	const editor = useSlateStatic();
	const selected = TableCursor.isSelected(editor, element);

	return (
		<TableCell className={cn(selected ? "bg-amber-200" : "", className)} rowSpan={element.rowSpan} colSpan={element.colSpan} {...attributes}>
			{children as any}
		</TableCell>
	);
}
