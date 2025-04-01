import { Button } from "@/components/ui/Button";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Table, TableBody, TableCell, TableHeadCell, TableHeader, TableRow } from "@/components/ui/Table";
import { randomAddress } from "@/lib/uniq-address";
import { prefixUrlWithSiteNameIfNecessary } from "@/lib/utils";
import { ChangeEvent, useCallback } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { useChangeCallbackForNode, useChangeCallbackWithTransformerForNode } from "../editor-utils";
import {
	CustomEditor,
	CustomText,
	PageNumberFormatType,
	RenderElementAttributesProp,
	SectionBreakElement,
	SectionBreakHeaderFooterCell,
	SectionBreakHeaderFooterEditorElement,
	SectionBreakHeaderFooterEditorElementType,
} from "../types";
import { isPageNumberFormatType } from "../types.guard";

export function generateDefaultSectionBreakElement(pageNumberFormat?: PageNumberFormatType, resetPageNumbering?: boolean): SectionBreakElement {
	return generateSpecificSectionBreakElement(pageNumberFormat ?? "numeric", resetPageNumbering ?? false, {
		top: [[{ text: "Left" }], [{ text: "Center" }], [{ text: "Right" }]],
		bottomNotPage: [{ text: "Not Page" }],
		bottomCenter: [{ text: "Center" }],
	});
}

export function generateSpecificSectionBreakElement(
	pageNumberFormat: PageNumberFormatType,
	resetPageNumbering: boolean,
	data: {
		top: [CustomText[], CustomText[], CustomText[]];
		bottomCenter: CustomText[];
		bottomNotPage: CustomText[];
		bottomPage?: CustomText[];
	},
): SectionBreakElement {
	return {
		id: randomAddress(),
		type: "section-break",
		children: [
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "odd-header",
				bgColor: "#a7f3d0",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: data.top[0] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: data.top[1] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: data.top[2] },
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "odd-footer",
				bgColor: "#f9c780",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: data.bottomNotPage },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: data.bottomCenter },
					{
						id: randomAddress(),
						type: "section-break-header-footer-cell",
						elementType: "right",
						children: data.bottomPage ?? [{ text: "Pg. " }, { text: "PAGE", pageNumberOverride: true }],
					},
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "even-header",
				bgColor: "#a7f3d0",
				children: [
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "left", children: data.top[0] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: data.top[1] },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: data.top[2] },
				],
			},
			{
				id: randomAddress(),
				type: "section-break-header-footer-editor-element",
				elementType: "even-footer",
				bgColor: "#f9c780",
				children: [
					{
						id: randomAddress(),
						type: "section-break-header-footer-cell",
						elementType: "left",
						children: data.bottomPage ?? [{ text: "Pg. " }, { text: "PAGE", pageNumberOverride: true }],
					},
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "center", children: data.bottomCenter },
					{ id: randomAddress(), type: "section-break-header-footer-cell", elementType: "right", children: data.bottomNotPage },
				],
			},
		],
		pageNumberFormat: pageNumberFormat,
		resetPageNumbering: resetPageNumbering,
		oddPageImageUrl: "/Images/bg1.png",
		oddPageBackgroundColor: "#fdf6e3",
		evenPageImageUrl: "/Images/bg2.png",
		evenPageBackgroundColor: "#e3fce7",
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

function corecePageNumbering(v: string) {
	return isPageNumberFormatType(v) ? v : "numeric";
}

function imageUrlChangeConverter(v: ChangeEvent<HTMLInputElement>) {
	return prefixUrlWithSiteNameIfNecessary(v.target.value);
}

export function SectionBreak({ attributes, element, children }: SectionBreakProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const onPageNumberFormattingChange = useChangeCallbackWithTransformerForNode(editor, path, "pageNumberFormat", corecePageNumbering, element);
	const onResetPageNumberingChange = useChangeCallbackForNode(editor, path, "resetPageNumbering", element);
	const onOddPageBackgroundColorChange = useChangeCallbackForNode(editor, path, "oddPageBackgroundColor", element);
	const onEvenPageBackgroundColorChange = useChangeCallbackForNode(editor, path, "evenPageBackgroundColor", element);
	const onOddPageImageUrlChange = useChangeCallbackWithTransformerForNode(editor, path, "oddPageImageUrl", imageUrlChangeConverter, element);
	const onEvenPageImageUrlChange = useChangeCallbackWithTransformerForNode(editor, path, "evenPageImageUrl", imageUrlChangeConverter, element);
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
					<TableRow contentEditable={false}>
						<TableCell className="max-w-full w-0 text-nowrap text-center">Odd background</TableCell>
						<TableCell className="max-w-full w-0 text-nowrap text-center">
							<ColorPicker
								className="mx-auto"
								value={element.oddPageBackgroundColor ?? "#ffffff00"}
								onChange={onOddPageBackgroundColorChange}
								useAlpha
							/>
						</TableCell>
						<TableCell className="max-w-full" colSpan={3}>
							<Input
								className="w-full"
								value={prefixUrlWithSiteNameIfNecessary(element.oddPageImageUrl) ?? undefined}
								onChange={onOddPageImageUrlChange}
							/>
						</TableCell>
					</TableRow>
					<TableRow contentEditable={false}>
						<TableCell className="max-w-full w-0 text-nowrap text-center">Even background</TableCell>
						<TableCell className="max-w-full w-0 text-nowrap text-center">
							<ColorPicker
								className="mx-auto"
								value={element.evenPageBackgroundColor ?? "#ffffff00"}
								onChange={onEvenPageBackgroundColorChange}
								useAlpha
							/>
						</TableCell>
						<TableCell className="max-w-full" colSpan={3}>
							<Input
								className="w-full"
								value={prefixUrlWithSiteNameIfNecessary(element.evenPageImageUrl) ?? undefined}
								onChange={onEvenPageImageUrlChange}
							/>
						</TableCell>
					</TableRow>
					<TableRow contentEditable={false}>
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
	const onColorChange = useChangeCallbackForNode(editor, path, "bgColor", element);
	return (
		<TableRow {...attributes}>
			<TableCell className="max-w-full w-0 text-nowrap text-center">{HFerElementTypeToPrintableName[element.elementType]}</TableCell>
			<TableCell className="max-w-full w-0 text-nowrap text-center">
				<ColorPicker className="mx-auto" value={element.bgColor} onChange={onColorChange} useAlpha />
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
