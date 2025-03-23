import { Table, TableCell, TableHeadCell } from "@/components/ui/Table";
import useResizeObserver from "@/hooks/useResizeObserver";
import { cn } from "@/lib/utils";
import { TableCursor } from "@/slate-table";
import mergeRefs from "merge-refs";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSlateSelection, useSlateStatic } from "slate-react";
import { useEditorStore } from "../editor-data-store";
import { RenderElementAttributesProp, TableCellElement, TableElement, TableHeaderCellElement } from "../types";

export function TableElementRenderer({
	attributes,
	children,
	className,
	element,
}: {
	attributes: RenderElementAttributesProp;
	element: TableElement;
	children: unknown;
	className?: string;
}) {
	const editor = useSlateStatic();
	const [isSelecting] = TableCursor.selection(editor);

	return (
		<Table className={cn(!!isSelecting ? "table-selection-none" : "", className)} {...attributes} border={element.border}>
			{children as any}
		</Table>
	);
}

const resizeObserverOptions: ResizeObserverOptions = {
	box: "border-box",
};

export function TableCellElementCommonRenderer({
	attributes: { ref: slateTableElemRef, ...attributes },
	children,
	className,
	element,
}: {
	attributes: RenderElementAttributesProp;
	element: TableCellElement | TableHeaderCellElement;
	children: unknown;
	className?: string;
}) {
	useSlateSelection();
	const ref = useRef<HTMLTableCellElement | null>(null);
	const editor = useSlateStatic();
	const editorDataStore = useEditorStore();
	const selected = TableCursor.isSelected(editor, element);
	const Renderer = useMemo(() => (element.type === "table-cell" ? TableCell : TableHeadCell), [element.type]);
	const onSizeChangeCallback = useCallback(() => {
		const domTdElem = ref.current;
		if (domTdElem == null) return;
		const domTrElem = domTdElem.parentElement ?? domTdElem;
		const widthInPercentage = (domTdElem.offsetWidth / domTrElem.offsetWidth) * 100;
		editorDataStore.setTableCellPercentageWidth(element.id, widthInPercentage.toFixed(2));
	}, [editorDataStore, element.id]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onSizeChangeCallback, []);
	useResizeObserver(ref.current, resizeObserverOptions, onSizeChangeCallback);

	//rowSpan={element.rowSpan}
	return (
		<Renderer
			className={cn(selected ? "bg-amber-200" : "", className)}
			colSpan={element.colSpan}
			{...attributes}
			ref={mergeRefs(slateTableElemRef as React.Ref<HTMLTableCellElement> | undefined, ref)}>
			{children as any}
		</Renderer>
	);
}
