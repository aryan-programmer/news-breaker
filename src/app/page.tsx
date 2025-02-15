"use client";
import React, { useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

import { TextMarkTypes } from "./editor/types";
import { Menubar } from "@radix-ui/react-menubar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ElementRenderer from "./editor/ElementRenderer";
import { LeafRenderer } from "./editor/LeafRenderer";
import { MarkButton } from "./editor/MarkButton";
import { toggleMark } from "./editor/editor-utils";
import { BlockButton } from "./editor/BlockButton";

const HOTKEYS: { [key: string]: TextMarkTypes } = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

const HomePage = () => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	return (
		<TooltipProvider>
			<Slate editor={editor} initialValue={initialValue} onChange={(v) => console.log(v)}>
				<Menubar className="mb-2 sticky top-0 bg-white z-50">
					<MarkButton hoverText="Bold" format="bold" icon="format_bold" />
					<MarkButton hoverText="Italic" format="italic" icon="format_italic" />
					<MarkButton hoverText="Underline" format="underline" icon="format_underlined" />
					<MarkButton hoverText="Code" format="code" icon="code" />
					<BlockButton hoverText="Heading 1" format="heading-1" icon="looks_one" />
					<BlockButton hoverText="Heading 2" format="heading-2" icon="looks_two" />
					<BlockButton hoverText="Blockquote" format="block-quote" icon="format_quote" />
					<BlockButton hoverText="Numbered List" format="numbered-list" icon="format_list_numbered" />
					<BlockButton hoverText="Bulleted List" format="bulleted-list" icon="format_list_bulleted" />
					<BlockButton hoverText="Left" format="left" icon="format_align_left" />
					<BlockButton hoverText="Center" format="center" icon="format_align_center" />
					<BlockButton hoverText="Right" format="right" icon="format_align_right" />
					<BlockButton hoverText="Justify" format="justify" icon="format_align_justify" />
				</Menubar>
				<Editable
					renderElement={ElementRenderer}
					renderLeaf={LeafRenderer}
					placeholder="Enter some rich text…"
					spellCheck
					autoFocus
					onKeyDown={(event) => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}}
				/>
			</Slate>
		</TooltipProvider>
	);
};

const initialValue: Descendant[] = [
	{ type: "heading-1", children: [{ text: "Heading 1", italic: true }] },
	{ type: "heading-2", children: [{ text: "Heading 2", code: true }] },
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
		type: "paragraph",
		align: "center",
		children: [{ text: "Try it out for yourself!" }],
	},
];

export default HomePage;
