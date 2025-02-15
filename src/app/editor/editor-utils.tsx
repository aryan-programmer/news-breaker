"use client";
import { Editor, Element as SlateElement, Transforms } from "slate";
import { AlignType, CustomEditor, CustomElementTypeStr, TextMarkTypes } from "./types";
import { isAlignType, isListElementTypeStr } from "./types.guard";

export function toggleMark(editor: CustomEditor, format: TextMarkTypes) {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
}
export function isMarkActive(editor: CustomEditor, format: TextMarkTypes) {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
}
export function isBlockActive(editor: CustomEditor, format: AlignType | CustomElementTypeStr) {
	const { selection } = editor;
	if (!selection) return false;
	const blockType = isAlignType(format) ? "align" : "type";

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
		}),
	);

	return !!match;
}
export function toggleBlock(editor: CustomEditor, format: AlignType | CustomElementTypeStr) {
	const isAlignTypeVal = isAlignType(format);
	const isActive = isBlockActive(editor, format);
	const isList = isListElementTypeStr(format);

	Transforms.unwrapNodes(editor, {
		match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && isListElementTypeStr(n.type) && !isAlignTypeVal,
		split: true,
	});
	let newProperties: Partial<SlateElement>;
	if (isAlignTypeVal) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : isList ? "list-item" : format,
		};
		console.log(newProperties);
	}
	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
}
