"use client";
import isHotkey from "is-hotkey";
import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { randomAddress } from "@/lib/uniq-address";
import { DATA_GIF_URL } from "@/lib/utils";
import { TableCursor, TableEditor, withTable } from "@/slate-table";
import {
	fa1,
	fa2,
	faAlignCenter,
	faAlignJustify,
	faAlignLeft,
	faAlignRight,
	faBold,
	faCode,
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
import { insertTableOfContents } from "./editor/AutoTableOfContents";
import { BlockButton } from "./editor/BlockButton";
import { insertImage } from "./editor/EditableImage";
import ElementRenderer from "./editor/ElementRenderer";
import { ElementSettingsSidebarProvider } from "./editor/ElementSettingsSidebar";
import { LeafRenderer } from "./editor/LeafRenderer";
import { MarkButton } from "./editor/MarkButton";
import { insertPageBreak } from "./editor/PageBreak";
import { PageBreakIcon } from "./editor/SVGIcons";
import { TableDropDownMenu } from "./editor/TableDropDownMenu";
import { withSimpleCopyPaste } from "./editor/custom-copy-paste";
import { toggleMark } from "./editor/editor-utils";
import { TextMarkTypes } from "./editor/types";

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

const HomePage = () => {
	const editor = useMemo(() => withTable(withHistory(withSimpleCopyPaste(withReact(createEditor()))), {}), []);
	const onInsertImage = useCallback(() => insertImage(editor, DATA_GIF_URL), [editor]);
	const onInsertPageBreak = useCallback(() => insertPageBreak(editor), [editor]);
	const onInsertTableOfContents = useCallback(() => insertTableOfContents(editor), [editor]);
	const onInsertTable = useCallback(() => TableEditor.insertTable(editor, { rows: 3, cols: 3 }), [editor]);
	//[2].children[0].children[0].children[0].children[0]
	return (
		<TooltipProvider>
			<ElementSettingsSidebarProvider>
				<div>
					<Slate editor={editor} initialValue={initialValue} onChange={(v) => console.log(v)}>
						<Menubar className="mb-2 sticky top-0 bg-white z-50">
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
									<DropdownMenuItem onSelect={onInsertTableOfContents}>
										<FontAwesomeIcon icon={faListAlt} transform={{ flipX: true }} /> Table of Contents
									</DropdownMenuItem>
									<DropdownMenuItem onSelect={onInsertTable}>
										<FontAwesomeIcon icon={faTable} /> Table
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<TableDropDownMenu />
						</Menubar>
						<Editable
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
				</div>
			</ElementSettingsSidebarProvider>
		</TooltipProvider>
	);
};

const initialValue: Descendant[] = [
	{
		type: "front-page-with-text",
		mainImageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/LHC_quadrupole_magnets.jpg",
		logoImageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png",
		children: [
			{ type: "heading-1", children: [{ text: "Heading 1", italic: true }] },
			{ type: "heading-2", children: [{ text: "Heading 2", code: true }] },
		],
		textSectionBgColor: "#f99",
		id: randomAddress(),
	},
	{ type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 },
	{
		type: "table",
		children: [
			{
				type: "table-head",
				children: [
					{
						type: "table-row",
						children: [
							{
								type: "table-header-cell",
								children: [
									{
										type: "heading-2",
										children: [
											{
												text: "Time",
											},
										],
									},
								],
							},
							{
								type: "table-header-cell",
								children: [
									{
										type: "heading-2",
										children: [
											{
												text: "🎨 Frontend team",
											},
										],
									},
								],
							},
							{
								type: "table-header-cell",
								children: [
									{
										type: "heading-2",
										children: [
											{
												text: "👷 Backend team ",
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				type: "table-body",
				children: [
					{
						type: "table-row",
						children: [
							{
								type: "table-cell",
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "9:00 AM",
												bold: true,
											},
										],
									},
								],
							},
							{
								type: "table-cell",
								colSpan: 2,
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "Opening Keynote 🎉",
											},
										],
									},
								],
							},
						],
					},
					{
						type: "table-row",
						children: [
							{
								type: "table-cell",
								rowSpan: 2,
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "10:30 AM",
												bold: true,
											},
										],
									},
								],
							},
							{
								type: "table-cell",
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "Introduction to 🅰️ngular",
											},
										],
									},
								],
							},
							{
								type: "table-cell",
								rowSpan: 2,
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "Introduction to Gradle and Java 11 ☕",
											},
										],
									},
								],
							},
						],
					},
					{
						type: "table-row",
						children: [
							{
								type: "table-cell",
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "Strictly typed forms in v14",
											},
										],
									},
								],
							},
						],
					},
					{
						type: "table-row",
						children: [
							{
								type: "table-cell",
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "1:00 PM",
												bold: true,
											},
										],
									},
								],
							},
							{
								type: "table-cell",
								colSpan: 2,
								children: [
									{
										type: "paragraph",
										children: [
											{
												text: "Lunch Break",
												underline: true,
											},
											{
												text: " 🍱",
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{ text: "This is editable " },
			{ text: "rich", bold: true },
			{ text: " text, " },
			{ text: "much", italic: true },
			{ text: " better than a " },
			{ text: "<textarea>", code: true },
			{ text: "!" },
		],
	},
	{
		type: "paragraph",
		align: "justify",
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: "bold, ", bold: true },
			{ text: "italic, ", italic: true },
			{ text: "justify it, ", bold: true },
			{ text: "and much more", italic: true, bold: true, underline: true, code: true },
			{
				text: " , or add a semantically rendered block quote in the middle of the page, like this:",
			},
		],
	},
	{
		type: "block-quote",
		children: [{ text: "A wise quote." }],
	},
	{
		type: "bulleted-list",
		children: [
			{ type: "list-item", children: [{ text: "Or, add" }] },
			{ type: "list-item", children: [{ text: "an unordered list of", bold: true }] },
			{ type: "list-item", children: [{ text: "several elements", italic: true, bold: true, underline: true, code: true }] },
		],
	},
	{
		type: "numbered-list",
		children: [
			{ type: "list-item", children: [{ text: "And add" }] },
			{ type: "list-item", children: [{ text: "a ordered list of", bold: true }] },
			{ type: "list-item", children: [{ text: "elements,", italic: true, bold: true, underline: true, code: true }] },
			{ type: "list-item", children: [{ text: "like so" }] },
		],
	},
	{
		type: "image",
		srcUrl: DATA_GIF_URL,
		children: [{ text: "" }],
		id: randomAddress(),
	},
	{
		type: "paragraph",
		align: "center",
		children: [{ text: "Try it out for yourself!" }],
	},
];

export default HomePage;
