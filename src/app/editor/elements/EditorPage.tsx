"use client";
import isHotkey from "is-hotkey";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { multiPassRender } from "@/app/pdf/pdf-rendering-utils";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { useCallbackDropAsync } from "@/hooks/useCallbackDropAsync";
import { useStoreAsIs } from "@/hooks/useStore";
import { randomAddress } from "@/lib/uniq-address";
import { DEMO_IMAGE_URL, isNonNullAndNonEmpty } from "@/lib/utils";
import { TableCursor, TableEditor, withTable } from "@/slate-table";
import {
	fa1,
	fa2,
	fa3,
	fa4,
	fa5,
	fa6,
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
	faItalic,
	faListAlt,
	faListOl,
	faListUl,
	faParagraph,
	faPlus,
	faQuoteLeft,
	faTable,
	faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menubar } from "@radix-ui/react-menubar";
import { useNavigationGuard } from "next-navigation-guard";
import {
	CardIcon,
	EyeIcon,
	EyeSlashIcon,
	FlexboxIcon,
	HeaderFooterIcon,
	ImageAddIcon,
	PageBreakIcon,
	PageNumberIcon,
} from "../../../components/ui/SVGIcons";
import { withSimpleCopyPaste } from "../custom-copy-paste";
import { showConfirmDialog } from "../dialogs/ConfirmDialog";
import { DialogProvider, DialogStore, useDialogStore } from "../dialogs/DialogProvider";
import { FilenameInputDialog } from "../dialogs/FilenameInputDialog";
import {
	EditorStore,
	getBlankEditorValue,
	getFullDemoEditorValue,
	pruneTableCellPercentageWidths,
	TableCellPercentageWidthsRecord,
	useEditorStore,
} from "../editor-data-store";
import { isTableCellPercentageWidthsRecord } from "../editor-data-store.guard";
import { insertNodeSpecial, toggleMark, withNormalizedCustomElements, withNormalizedFrontPage, withUniqueIds } from "../editor-utils";
import { insertTableOfContents } from "../renderers/AutoTableOfContents";
import { insertCard } from "../renderers/CardRenderer";
import { insertImage } from "../renderers/EditableImage";
import ElementRenderer from "../renderers/ElementRenderer";
import { insertFlexbox } from "../renderers/FlexboxRenderer";
import { LeafRenderer } from "../renderers/LeafRenderer";
import { insertPageBreak } from "../renderers/PageBreak";
import { insertSectionBreak } from "../renderers/SectionBreak";
import { TextMarkTypes } from "../types";
import { BlockButton } from "./BlockButton";
import { ElementSettingsSidebarProvider, useElementSettingsSidebarStore } from "./ElementSettingsSidebar";
import { MarkButton, MarkColorPicker } from "./MarkButton";
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

export function EditorPageSub({
	editorStore,
	dialogStore,
	initialValue,
	onShowDemoPage,
	onFileReset,
	onUpload,
}: {
	dialogStore: DialogStore;
	editorStore: EditorStore;
	initialValue: Descendant[];
	onShowDemoPage: () => void;
	onFileReset: () => void;
	onUpload: (v: { children: Descendant[]; tableCellPercentageWidths: TableCellPercentageWidthsRecord }) => void;
}) {
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);

	useNavigationGuard({
		enabled: process.env.NODE_ENV === "production",
		confirm() {
			return window.confirm("You have unsaved changes that will be lost.");
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const editor = useMemo(() => {
		const res = withUniqueIds(
			withTable(withNormalizedFrontPage(withNormalizedCustomElements(withHistory(withSimpleCopyPaste(withReact(createEditor()))))), {}),
		);
		return res;
	}, []);

	useEffect(() => {
		editorStore.setChildren(initialValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onEditorValueChange = useCallback(
		(value: Descendant[]) => {
			const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
			if (isAstChange) {
				editorStore.setChildren(value);
			}
		},
		[editor.operations, editorStore],
	);

	const onInsertImage = useCallback(() => insertImage(editor, DEMO_IMAGE_URL, settingsSidebarStore), [editor, settingsSidebarStore]);
	const onInsertPageBreak = useCallback(() => insertPageBreak(editor), [editor]);
	const onInsertTableOfContents = useCallback(() => insertTableOfContents(editor), [editor]);
	const onInsertTable = useCallback(() => TableEditor.insertTable(editor, { rows: 3, cols: 3 }), [editor]);
	const onInsertSectionBreak = useCallback(() => insertSectionBreak(editor), [editor]);
	const onInsertFlexbox = useCallback(() => insertFlexbox(editor, settingsSidebarStore), [editor, settingsSidebarStore]);
	const onAddPageNumber = useCallback(() => toggleMark(editor, "pageNumberOverride"), [editor]);
	const onInsertCard = useCallback(() => insertCard(editor, settingsSidebarStore), [editor, settingsSidebarStore]);
	const onInsertParagraph = useCallback(() => {
		insertNodeSpecial(editor, { id: randomAddress(), type: "paragraph", children: [{ text: "" }] }, settingsSidebarStore);
	}, [editor, settingsSidebarStore]);

	const onFlexboxVisibilitySwitch = useCallback(() => editorStore.setIsFlexboxVisiblityOn(!editorStore.isFlexboxVisiblityOn), [editorStore]);

	const onFileDownload = useCallbackDropAsync(async () => {
		const element = document.createElement("a");
		let fileName = await dialogStore.showDialog<string | null | undefined>({
			title: "Specify a file name",
			description: "Enter a file name for the file to save to the downloads folder.",
			element(resolve, _reject) {
				return {
					content: <FilenameInputDialog resolve={resolve} />,
					closeHandler() {
						resolve(null);
					},
				};
			},
		});
		if (!isNonNullAndNonEmpty(fileName)) {
			return;
		}
		if (!fileName.endsWith(".json")) {
			fileName += ".json";
		}

		const tableCellPercentageWidths = pruneTableCellPercentageWidths(editor.children, editorStore.tableCellPercentageWidths);
		const uriContent =
			"data:application/json;charset=utf-8," +
			encodeURIComponent(
				JSON.stringify({
					children: editor.children,
					tableCellPercentageWidths,
				}),
			);
		element.setAttribute("href", uriContent);
		element.setAttribute("download", fileName);

		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);

		editorStore.overwriteTableCellPercentageWidths(tableCellPercentageWidths);
	}, [dialogStore, editor.children, editorStore]);

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
				const children = jsonData.children as Descendant[];
				if ("tableCellPercentageWidths" in jsonData) {
					const data = jsonData.tableCellPercentageWidths;
					onUpload({
						children,
						tableCellPercentageWidths: isTableCellPercentageWidthsRecord(data) ? data : {},
					});
				} else {
					onUpload({
						children,
						tableCellPercentageWidths: {},
					});
				}
			}
		},
		[onUpload],
	);

	const onFileExportToPDF = useCallbackDropAsync(async () => {
		const fileURL = URL.createObjectURL(await multiPassRender(editor.children, editorStore.tableCellPercentageWidths));
		window.open(fileURL);
	}, [editor.children, editorStore.tableCellPercentageWidths]);

	return (
		<div className="w-full">
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
						{/* <MarkButton hoverText="Small Caps" format="smallCaps">
							<SmallCapsIcon width={20} height={20} />
						</MarkButton> */}
						<MarkColorPicker />
						<BlockButton hoverText="Heading 1" format="heading-1">
							<FontAwesomeIcon icon={fa1} />
						</BlockButton>
						<BlockButton hoverText="Heading 2" format="heading-2">
							<FontAwesomeIcon icon={fa2} />
						</BlockButton>
						<BlockButton hoverText="Heading 3" format="heading-3">
							<FontAwesomeIcon icon={fa3} />
						</BlockButton>
						<BlockButton hoverText="Heading 4" format="heading-4">
							<FontAwesomeIcon icon={fa4} />
						</BlockButton>
						<BlockButton hoverText="Heading 5" format="heading-5">
							<FontAwesomeIcon icon={fa5} />
						</BlockButton>
						<BlockButton hoverText="Heading 6" format="heading-6">
							<FontAwesomeIcon icon={fa6} />
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
									<ImageAddIcon width={20} height={20} />
									Image
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertPageBreak}>
									<PageBreakIcon width={20} height={20} /> Page Break
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertSectionBreak}>
									<HeaderFooterIcon width={20} height={20} /> Section Break
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertTableOfContents}>
									<FontAwesomeIcon icon={faListAlt} transform={{ flipX: true }} /> Table of Contents
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertTable}>
									<FontAwesomeIcon icon={faTable} /> Table
								</DropdownMenuItem>
								<div className="flex flex-row w-full">
									<DropdownMenuItem onSelect={onInsertFlexbox} className="flex-grow">
										<FlexboxIcon width={20} height={20} /> Flexbox
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={onFlexboxVisibilitySwitch}>
										{editorStore.isFlexboxVisiblityOn ? <EyeIcon width={20} height={20} /> : <EyeSlashIcon width={20} height={20} />}
									</DropdownMenuItem>
								</div>
								<DropdownMenuItem onSelect={onInsertCard}>
									<CardIcon width={20} height={20} /> Card
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onAddPageNumber}>
									<PageNumberIcon /> Page Number
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={onInsertParagraph}>
									<FontAwesomeIcon icon={faParagraph} /> Paragraph After
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
							<DropdownMenuItem onSelect={onShowDemoPage} variant="destructive-outline">
								<FontAwesomeIcon icon={faFileCircleXmark} /> Show full demo
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Menubar>
				<Editable
					className="max-w-[735px] mx-auto"
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

async function showOverwriteConfirmDialog(dialogStore: DialogStore | null | undefined) {
	if (dialogStore == null) {
		return false;
	}
	return await showConfirmDialog(dialogStore, {
		title: "You have unsaved changes that will be lost.",
		description: "Are you sure you want to overwrite your current file?",
		yes: "Yes, overwrite",
		no: "No, cancel overwrite and keep the current file",
	});
}

export function EditorPage() {
	const dialogStore = useStoreAsIs(useDialogStore);
	const editorStore = useStoreAsIs(useEditorStore);
	const [key, setKey] = useState(randomAddress());
	const [initialValue, setInitialValue] = useState(null as Descendant[] | null);

	useEffect(() => {
		if (editorStore != null && initialValue == null) {
			setInitialValue(editorStore.children);
		}
	}, [editorStore, initialValue]);

	const onFileReset = useCallbackDropAsync(async () => {
		if ((await showOverwriteConfirmDialog(dialogStore)) !== true) {
			return;
		}
		setInitialValue(getBlankEditorValue());
		setKey(randomAddress());
	}, [dialogStore]);

	const onShowDemoPage = useCallbackDropAsync(async () => {
		if ((await showOverwriteConfirmDialog(dialogStore)) !== true) {
			return;
		}
		setInitialValue(getFullDemoEditorValue());
		setKey(randomAddress());
	}, [dialogStore]);

	const onUpload = useCallbackDropAsync(
		async (v: { children: Descendant[]; tableCellPercentageWidths: TableCellPercentageWidthsRecord }) => {
			if ((await showOverwriteConfirmDialog(dialogStore)) !== true) {
				return;
			}
			setInitialValue(v.children);
			setKey(randomAddress());
			editorStore?.overwriteTableCellPercentageWidths(v.tableCellPercentageWidths);
		},
		[dialogStore, editorStore],
	);

	return editorStore == null || initialValue == null || dialogStore == null ? (
		<></>
	) : (
		<TooltipProvider>
			<ElementSettingsSidebarProvider>
				<DialogProvider>
					<EditorPageSub
						key={key}
						dialogStore={dialogStore}
						editorStore={editorStore}
						initialValue={initialValue}
						onFileReset={onFileReset}
						onShowDemoPage={onShowDemoPage}
						onUpload={onUpload}
					/>
				</DialogProvider>
			</ElementSettingsSidebarProvider>
		</TooltipProvider>
	);
}
