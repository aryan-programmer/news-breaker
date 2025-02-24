import { Button } from "@/components/ui/Button";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Table, TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from "@/components/ui/Table";
import { randomAddress } from "@/lib/uniq-address";
import { useCallback } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import {
	CustomEditor,
	RenderElementAttributesProp,
	SectionBreakElement,
	SectionBreakHeaderFooterCell,
	SectionBreakHeaderFooterEditorElement,
	SectionBreakHeaderFooterEditorElementType,
} from "../types";
import { isPageNumberFormatType } from "../types.guard";

export function generateDefaultSectionBreakElement(): SectionBreakElement {
	return {
		id: randomAddress(),
		type: "section-break",
		children: [
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "odd-header",
				bgColor: "#aaf",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: [{ text: "Left" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: [{ text: "Center" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: [{ text: "Right" }] },
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "odd-footer",
				bgColor: "#aaf",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: [{ text: "Left" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: [{ text: "Center" }] },
					{
						id: randomAddress(),
						type: "section-break-header-footer-cell",
						elementType: "right",
						children: [{ text: "Pg. " }, { text: "PAGE", pageNumberOverride: true }],
					},
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "even-header",
				bgColor: "#aaf",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: [{ text: "Left" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: [{ text: "Center" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: [{ text: "Right" }] },
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "even-footer",
				bgColor: "#aaf",
				children: [
					{
						id: randomAddress(),
						type: "section-break-header-footer-cell",
						elementType: "left",
						children: [{ text: "Pg. " }, { text: "PAGE", pageNumberOverride: true }],
					},
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: [{ text: "Center" }] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: [{ text: "Right" }] },
				],
			},
		],
		pageNumberFormat: "numeric",
		resetPageNumbering: false,
	};
}

export function insertSectionBreak(editor: CustomEditor) {
	const sectionBreak: SectionBreakElement = generateDefaultSectionBreakElement();
	Transforms.insertNodes(editor, sectionBreak);
	Transforms.insertNodes(editor, {
		id: randomAddress(),
		type: "paragraph",
		children: [{ text: "" }],
	});
}

export type SectionBreakProps = {
	attributes: RenderElementAttributesProp;
	element: SectionBreakElement;
	children: unknown;
};

export function SectionBreak({ attributes, element, children }: SectionBreakProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const onPageNumberFormattingChange = useCallback(
		(v: string) => {
			Transforms.setNodes<SectionBreakElement>(editor, { pageNumberFormat: isPageNumberFormatType(v) ? v : "numeric" }, { at: path });
		},
		[editor, path],
	);
	const onResetPageNumberingChange = useCallback(
		(v: boolean) => {
			Transforms.setNodes<SectionBreakElement>(editor, { resetPageNumbering: v }, { at: path });
		},
		[editor, path],
	);
	const onRemove = useCallback(() => Transforms.removeNodes(editor, { at: path }), [editor, path]);
	return (
		<>
			<h1 className="py-2 text-2xl font-extrabold leading-none w-100 text-center bg-muted">Section Break</h1>
			<Table className=" !mt-0">
				<TableHeader>
					<TableRow>
						<TableHeadCell className="max-w-full w-0 text-nowrap text-center">Name</TableHeadCell>
						<TableHeadCell className="max-w-full w-0 text-nowrap text-center">Bg Color</TableHeadCell>
						<TableHeadCell>Left part</TableHeadCell>
						<TableHeadCell className="text-center">Center part</TableHeadCell>
						<TableHeadCell className="text-right">Right part</TableHeadCell>
					</TableRow>
				</TableHeader>
				<TableBody {...attributes}>
					{children as any}
					<TableRow>
						<TableCell colSpan={5}>
							<div className="flex justify-evenly content-between space-x-2">
								<div className="flex items-center space-x-2">
									<span>Page Number Formatting</span>
									<Select value={element.pageNumberFormat} onValueChange={onPageNumberFormattingChange}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select heading level" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="numeric">Numeric (1, 2, 3)</SelectItem>
											<SelectItem value="lower">Lowercase Letters (a, b, c)</SelectItem>
											<SelectItem value="upper">Uppercase Letters (A, B, C)</SelectItem>
											<SelectItem value="lower-roman">Lowercase Roman Numerals (i, ii, iii)</SelectItem>
											<SelectItem value="upper-roman">Uppercase Roman Numerals (I, II, III)</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center space-x-2">
									<Label className="flex items-center space-x-2">
										<Switch checked={element.resetPageNumbering} onCheckedChange={onResetPageNumberingChange} />
										<span>Reset Page Numbering</span>
									</Label>
								</div>
								<Button variant="destructive" onClick={onRemove}>
									Remove Section Break
								</Button>
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	);
}

export type SectionBreakHeaderFooterEditorElementProps = {
	attributes: RenderElementAttributesProp;
	element: SectionBreakHeaderFooterEditorElement;
	children: unknown;
};

const HFerElementTypeToPrintableName: {
	[k in SectionBreakHeaderFooterEditorElementType]: string;
} = {
	"odd-header": "Odd page header",
	"odd-footer": "Odd page footer",
	"even-header": "Even page header",
	"even-footer": "Even page footer",
};

export function SectionBreakHeaderFooterEditorElementRenderer({ attributes, children, element }: SectionBreakHeaderFooterEditorElementProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const onColorChange = useCallback(
		(color: string) => {
			Transforms.setNodes<SectionBreakHeaderFooterEditorElement>(editor, { bgColor: color }, { at: path });
		},
		[editor, path],
	);
	return (
		<TableRow {...attributes}>
			<TableCell className="max-w-full w-0 text-nowrap text-center">{HFerElementTypeToPrintableName[element.elementType]}</TableCell>
			<TableCell className="max-w-full w-0 text-nowrap text-center">
				<ColorPicker className="mx-auto" value={element.bgColor} onChange={onColorChange} />
			</TableCell>
			{children as any}
		</TableRow>
	);
}

export type SectionBreakHeaderFooterCellProps = {
	attributes: RenderElementAttributesProp;
	element: SectionBreakHeaderFooterCell;
	children: unknown;
};

export function SectionBreakHeaderFooterCellRenderer({ attributes, children, element }: SectionBreakHeaderFooterCellProps) {
	return (
		<TableCell
			className={
				element.elementType === "left"
					? "text-left"
					: element.elementType === "center"
					? "text-center"
					: element.elementType === "right"
					? "text-right"
					: ""
			}
			{...attributes}>
			{children as any}
		</TableCell>
	);
}
