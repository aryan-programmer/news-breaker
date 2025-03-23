import React, { useContext } from "react";

import { cn } from "@/lib/utils";
import { createContext } from "react";

const TableCtx = createContext({ border: true });

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement> & { border?: boolean }>(
	({ className, border, ...props }, ref) => (
		<TableCtx.Provider value={{ border: border ?? true }}>
			<table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
		</TableCtx.Provider>
	),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
	const { border } = useContext(TableCtx);
	return (
		<thead
			ref={ref}
			className={cn(
				"bg-muted",
				border ? "[&_tr]:border-b-2 border-emerald-200 [&_tr]:border-emerald-200 [&_tr_th]:border-emerald-200" : "border-0",
				className,
			)}
			{...props}
		/>
	);
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
	const { border } = useContext(TableCtx);
	return (
		<tfoot
			ref={ref}
			className={cn(border ? "border-t-2" : "border-0", "bg-muted/40 text-muted-foreground font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	);
});
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => {
	const { border } = useContext(TableCtx);
	return (
		<tr
			ref={ref}
			className={cn(border ? "border-b-2" : "border-0", "transition-colors hover:bg-muted/75 data-[state=selected]:bg-muted", className)}
			{...props}
		/>
	);
});
TableRow.displayName = "TableRow";

const TableHeadCell = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
	const { border } = useContext(TableCtx);
	return (
		<th
			ref={ref}
			className={cn(
				border ? "border-2" : "border-0",
				"h-10 px-2 text-left align-middle font-semibold text-black [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
});
TableHeadCell.displayName = "TableHeadCell";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
	const { border } = useContext(TableCtx);
	return (
		<td
			ref={ref}
			className={cn(
				border ? "border-2 p-2" : "border-0 p-0",
				"align-top [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeadCell, TableHeader, TableRow };
