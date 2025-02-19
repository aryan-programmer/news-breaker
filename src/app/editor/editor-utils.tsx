"use client";
import { Descendant, Editor, Element, Node, Element as SlateElement, Transforms } from "slate";
import { AlignType, CustomEditor, CustomElementTypeStr, TextMarkTypes } from "./types";
import { isAlignType, isElementNameThatOfElementWhoseTypeCannotBeChanged, isListElementTypeStr } from "./types.guard";

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
	return isAlignType(format)
		? isBlockMatch(editor, (n) => "align" in n && n.align === format)
		: isBlockMatch(editor, (n) => "type" in n && n.type === format);
}

export function isBlockMatch(editor: CustomEditor, matcher: (n: Descendant) => boolean) {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && matcher(n),
		}),
	);

	return !!match;
}

export function toggleBlock(editor: CustomEditor, format: AlignType | CustomElementTypeStr) {
	// const selectedNode = editor.selection && Editor.node(editor, editor.selection.anchor.path);

	const isAlignTypeVal = isAlignType(format);
	const isActive = isBlockActive(editor, format);
	const isList = isListElementTypeStr(format);

	let newProperties: Partial<SlateElement>;
	Editor.withoutNormalizing(editor, () => {
		Transforms.unwrapNodes(editor, {
			match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && isListElementTypeStr(n.type) && !isAlignTypeVal,
			split: true,
		});
		// console.log(editor.selection, { isActive, format });
		//let at: Path | undefined;
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
			const currSelection = editor.selection?.anchor.path;
			if (currSelection != null) {
				let curr: Node = editor;
				let next: Descendant | undefined = undefined;
				let i = 0;
				while (i <= currSelection.length && "type" in (next = curr.children[currSelection[i]])) {
					curr = next;
					i++;
				}
				i++;
				console.log(curr);
				if ("type" in curr && isElementNameThatOfElementWhoseTypeCannotBeChanged(curr.type)) return;
			}
		}
		// console.log(newProperties);

		Transforms.setNodes<SlateElement>(editor, newProperties);

		if (!isActive && isList) {
			const block = { type: format, children: [] };
			Transforms.wrapNodes(editor, block);
		}
	});
}

export function withNormalizedParagraphs(editor: CustomEditor) {
	const { normalizeNode } = editor;

	editor.normalizeNode = (entry) => {
		const [node, path] = entry;

		// If the element is a paragraph, ensure its children are valid.
		if (Element.isElement(node) && node.type === "paragraph") {
			for (const [child, childPath] of Node.children(editor, path)) {
				if (Element.isElement(child) && !editor.isInline(child)) {
					Transforms.unwrapNodes(editor, { at: childPath });
					return;
				}
			}
		}

		// Fall back to the original `normalizeNode` to enforce other constraints.
		normalizeNode(entry);
	};

	return editor;
}
