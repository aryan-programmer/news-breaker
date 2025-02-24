"use client";
import isHotkey from "is-hotkey";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { PDFDocument } from "@/app/pdf/PDFDocument";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { useCallbackDropAsync } from "@/hooks/useCallbackDropAsync";
import { useStoreAsIs } from "@/hooks/useStore";
import { getAddress, randomAddress } from "@/lib/uniq-address";
import { DEMO_IMAGE_URL } from "@/lib/utils";
import { TableCursor, TableEditor, withTable } from "@/slate-table";
import {
	fa1,
	fa2,
	fa3,
	faAlignCenter,
	faAlignJustify,
	faAlignLeft,
	faAlignRight,
	faBold,
	faCode,
	faDownload,
	faFile,
	faFileCircleXmark,
	faFilePdf,
	faFileUpload,
	faImage,
	faItalic,
	faListAlt,
	faListOl,
	faListUl,
	faPlus,
	faQuoteLeft,
	faTable,
	faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menubar } from "@radix-ui/react-menubar";
import { PDFViewer } from "@react-pdf/renderer";
import { useNavigationGuard } from "next-navigation-guard";
import { useRouter } from "next/navigation";
import { HeaderFooterIcon, PageBreakIcon, PageNumberIcon } from "../../../components/ui/SVGIcons";
import { withSimpleCopyPaste } from "../custom-copy-paste";
import { EditorStore, pruneTableCellPercentageWidths, useEditorStore } from "../editor-data-store";
import { isTableCellPercentageWidthsRecord } from "../editor-data-store.guard";
import { resetNodes, toggleMark, withNormalizedFrontPage, withNormalizedParagraphs } from "../editor-utils";
import { insertTableOfContents } from "../renderers/AutoTableOfContents";
import { insertImage } from "../renderers/EditableImage";
import ElementRenderer from "../renderers/ElementRenderer";
import { LeafRenderer } from "../renderers/LeafRenderer";
import { insertPageBreak } from "../renderers/PageBreak";
import { insertSectionBreak } from "../renderers/SectionBreak";
import { TextMarkTypes } from "../types";
import { BlockButton } from "./BlockButton";
import { ElementSettingsSidebarProvider } from "./ElementSettingsSidebar";
import { MarkButton } from "./MarkButton";
import { TableDropDownMenu } from "./TableDropDownMenu";

const FORMATTING_HOTKEYS: { [key: string]: TextMarkTypes } = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

const NAVIGATION_HOTKEYS = {
	ARROW_UP: isHotkey("up"),
	ARROW_DOWN: isHotkey("down"),
	ARROW_LEFT: isHotkey("left"),
	ARROW_RIGHT: isHotkey("right"),
	TAB: isHotkey("tab"),
	SHIFT_TAB: isHotkey("shift+tab"),
};

export function EditorPageSub({ editorStore }: { editorStore: EditorStore }) {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);

	useNavigationGuard({
		enabled: process.env.NODE_ENV === "production",
		confirm() {
			return window.confirm("You have unsaved changes that will be lost.");
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const editor = useMemo(
		() => withTable(withNormalizedFrontPage(withNormalizedParagraphs(withHistory(withSimpleCopyPaste(withReact(createEditor()))))), {}),
		[],
	);

	const initialValue = useMemo(() => editorStore.children, [editorStore]);

	const onEditorValueChange = useCallback(
		(value: Descendant[]) => {
			const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
			if (isAstChange) {
				editorStore.setChildren(value);
			}
		},
		[editor.operations, editorStore],
	);

	const onInsertImage = useCallback(() => insertImage(editor, DEMO_IMAGE_URL), [editor]);
	const onInsertPageBreak = useCallback(() => insertPageBreak(editor), [editor]);
	const onInsertTableOfContents = useCallback(() => insertTableOfContents(editor), [editor]);
	const onInsertTable = useCallback(() => TableEditor.insertTable(editor, { rows: 3, cols: 3 }), [editor]);
	const onInsertSectionBreak = useCallback(() => insertSectionBreak(editor), [editor]);
	const onAddPageNumber = useCallback(() => toggleMark(editor, "pageNumberOverride"), [editor]);

	const onFileDownload = useCallback(() => {
		const element = document.createElement("a");
		const tableCellPercentageWidths = pruneTableCellPercentageWidths(editor.children, editorStore.tableCellPercentageWidths);
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(
					JSON.stringify({
						children: editor.children,
						tableCellPercentageWidths,
					}),
				),
		);
		element.setAttribute("download", `File-${randomAddress()}.json`);

		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);

		editorStore.overwriteTableCellPercentageWidths(tableCellPercentageWidths);
	}, [editor.children, editorStore]);

	const onFileUploadButtonClick = useCallback(() => {
		const curr = fileInputRef.current;
		if (curr == null) return;
		curr.click();
	}, []);

	const onFileUpload = useCallbackDropAsync(
		async (ev: ChangeEvent<HTMLInputElement>) => {
			const files = ev.target.files;
			if (files == null || files.length === 0) return;
			const file = files[0];
			const jsonData = JSON.parse(await file.text()) as unknown;
			if (jsonData == null || typeof jsonData !== "object") return;
			if ("children" in jsonData) {
				const data = jsonData.children as Descendant[];
				resetNodes(editor, { nodes: data });
				editorStore.setChildren(data);
				if ("tableCellPercentageWidths" in jsonData) {
					const tableCellPercentageWidths = jsonData.tableCellPercentageWidths;
					if (!isTableCellPercentageWidthsRecord(tableCellPercentageWidths)) editorStore.overwriteTableCellPercentageWidths({});
					else editorStore.overwriteTableCellPercentageWidths(pruneTableCellPercentageWidths(data, tableCellPercentageWidths));
				}
			}
		},
		[editor, editorStore],
	);

	const onFileExportToPDF = useCallback(() => {}, []);

	const onFileReset = useCallback(() => {
		// const value = get_demo_editor_value();
		// editorStore.setChildren(value);
		// resetNodes(editor, { nodes: value });
		router.refresh();
	}, [router]);

	const tableCellPercentageWidths = editorStore.tableCellPercentageWidths;
	console.log({ tableCellPercentageWidths, addr: getAddress(tableCellPercentageWidths) });

	return (
		<div className="max-w-[735px] mx-auto">
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Share</Button>
				</DialogTrigger>
				<DialogContent className="max-w-screen h-screen max-h-[calc(100dvh)] overflow-auto !rounded-none grid grid-rows-[auto_1fr]">
					<DialogHeader className="bg-white">
						<DialogTitle>Previewing PDF</DialogTitle>
					</DialogHeader>
					<div className="">
						<PDFViewer className="h-full">
							<PDFDocument elements={editor.children} tableCellPercentageWidths={editorStore.tableCellPercentageWidths} />
						</PDFViewer>
					</div>
				</DialogContent>
			</Dialog>
			<Slate editor={editor} initialValue={initialValue} onChange={onEditorValueChange}>
				<Menubar className="mb-2 sticky top-0 bg-white z-50 flex flex-row justify-between w-full">
					<div className="">
						<MarkButton hoverText="Bold" format="bold">
							<FontAwesomeIcon icon={faBold} />
						</MarkButton>
						<MarkButton hoverText="Italic" format="italic">
							<FontAwesomeIcon icon={faItalic} />
						</MarkButton>
						<MarkButton hoverText="Underline" format="underline">
							<FontAwesomeIcon icon={faUnderline} />
						</MarkButton>
						<MarkButton hoverText="Code" format="code">
							<FontAwesomeIcon icon={faCode} />
						</MarkButton>
						<BlockButton hoverText="Heading 1" format="heading-1">
							<FontAwesomeIcon icon={fa1} />
						</BlockButton>
						<BlockButton hoverText="Heading 2" format="heading-2">
							<FontAwesomeIcon icon={fa2} />
						</BlockButton>
						<BlockButton hoverText="Heading 3" format="heading-3">
							<FontAwesomeIcon icon={fa3} />
						</BlockButton>
						<BlockButton hoverText="Blockquote" format="block-quote">
							<FontAwesomeIcon icon={faQuoteLeft} />
						</BlockButton>
						<BlockButton hoverText="Numbered List" format="numbered-list">
							<FontAwesomeIcon icon={faListOl} />
						</BlockButton>
						<BlockButton hoverText="Bulleted List" format="bulleted-list">
							<FontAwesomeIcon icon={faListUl} />
						</BlockButton>
						<BlockButton hoverText="Left" format="left">
							<FontAwesomeIcon icon={faAlignLeft} />
						</BlockButton>
						<BlockButton hoverText="Center" format="center">
							<FontAwesomeIcon icon={faAlignCenter} />
						</BlockButton>
						<BlockButton hoverText="Right" format="right">
							<FontAwesomeIcon icon={faAlignRight} />
						</BlockButton>
						<BlockButton hoverText="Justify" format="justify">
							<FontAwesomeIcon icon={faAlignJustify} />
						</BlockButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" rounding="zero">
									<FontAwesomeIcon icon={faPlus} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuItem onSelect={onInsertImage}>
									<FontAwesomeIcon icon={faImage} />
									Image
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertPageBreak}>
									<PageBreakIcon width={20} height={20} /> Page Break
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertSectionBreak}>
									<HeaderFooterIcon width={20} height={20} /> Section Break (with Header & Footer)
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertTableOfContents}>
									<FontAwesomeIcon icon={faListAlt} transform={{ flipX: true }} /> Table of Contents
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertTable}>
									<FontAwesomeIcon icon={faTable} /> Table
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onAddPageNumber}>
									<PageNumberIcon /> Page Number
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<TableDropDownMenu />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" rounding="zero" className="ml-auto">
								<FontAwesomeIcon icon={faFile} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuItem onSelect={onFileDownload}>
								<FontAwesomeIcon icon={faDownload} />
								Download
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={onFileUploadButtonClick}>
								<FontAwesomeIcon icon={faFileUpload} />
								Upload
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={onFileExportToPDF}>
								<FontAwesomeIcon icon={faFilePdf} /> Export to PDF
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={onFileReset} variant="destructive-outline">
								<FontAwesomeIcon icon={faFileCircleXmark} /> New File
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Menubar>
				<Editable
					className="w-full"
					renderElement={ElementRenderer}
					renderLeaf={LeafRenderer}
					placeholder="Enter some rich text…"
					spellCheck
					autoFocus
					onDragStart={() => {
						// mark onDragStart as handled if the selection is in a table
						if (TableCursor.isInTable(editor)) {
							return true;
						}
						return false;
					}}
					onKeyDown={(event) => {
						for (const hotkey in FORMATTING_HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = FORMATTING_HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
						if (TableCursor.isInTable(editor)) {
							switch (true) {
								case NAVIGATION_HOTKEYS.ARROW_DOWN(event) && TableCursor.isOnEdge(editor, "bottom"):
									event.preventDefault();
									return TableCursor.downward(editor);
								case NAVIGATION_HOTKEYS.ARROW_UP(event) && TableCursor.isOnEdge(editor, "top"):
									event.preventDefault();
									return TableCursor.upward(editor);
								case NAVIGATION_HOTKEYS.ARROW_RIGHT(event) && TableCursor.isOnEdge(editor, "end"):
									event.preventDefault();
									return TableCursor.forward(editor);
								case NAVIGATION_HOTKEYS.ARROW_LEFT(event) && TableCursor.isOnEdge(editor, "start"):
									event.preventDefault();
									return TableCursor.backward(editor);
								case NAVIGATION_HOTKEYS.TAB(event):
									if (TableCursor.isInLastCell(editor)) {
										TableEditor.insertRow(editor);
									}
									event.preventDefault();
									return TableCursor.forward(editor, { mode: "all" });
								case NAVIGATION_HOTKEYS.SHIFT_TAB(event):
									event.preventDefault();
									return TableCursor.backward(editor, { mode: "all" });
								case true:
								default:
									break;
							}
						}
					}}
				/>
			</Slate>
			<input type="file" className="w-0 h-0 hidden" ref={fileInputRef} onChange={onFileUpload} />
		</div>
	);
}

export function EditorPage() {
	const editorStore = useStoreAsIs(useEditorStore);
	return editorStore == null ? (
		<></>
	) : (
		<TooltipProvider>
			<ElementSettingsSidebarProvider>
				<EditorPageSub editorStore={editorStore} />{" "}
			</ElementSettingsSidebarProvider>
		</TooltipProvider>
	);
}
