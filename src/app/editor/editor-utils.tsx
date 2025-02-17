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

	let newProperties: Partial<SlateElement>;
	Transforms.unwrapNodes(editor, {
		match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && isListElementTypeStr(n.type) && !isAlignTypeVal,
		split: true,
	});
	// console.log(editor.selection, { isActive, format });
	// let at: Path | undefined;
	if (isAlignTypeVal) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else if (isList) {
		newProperties = {
			type: isActive ? "paragraph" : "list-item",
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : format,
		};
		// const currSelection = editor.selection?.anchor.path;
		// if (currSelection != null) {
		// 	const lookingFor: CustomElementTypeStr = isActive ? format : "paragraph";
		// 	let curr = editor.children;
		// 	let next: Descendant;
		// 	let i = 0;
		// 	while (i <= currSelection.length && "type" in (next = curr[currSelection[i]])) {
		// 		if (next.type === lookingFor) {
		// 			break;
		// 		}
		// 		curr = next.children;
		// 		i++;
		// 	}
		// 	i++;
		// 	if (i !== currSelection.length) {
		// 		at = currSelection.slice(0, i);
		// 	}
		// 	console.log({ at, i, curr, next, currSelection });
		// }
	}
	// console.log(newProperties);
	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
}
