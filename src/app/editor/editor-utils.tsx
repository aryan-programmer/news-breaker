"use client";
import { getAddress, randomAddress } from "@/lib/uniq-address";
import { DEMO_IMAGE_URL } from "@/lib/utils";
import { useCallback } from "react";
import { Descendant, Editor, Element, Location, Node, Path, Element as SlateElement, Transforms } from "slate";
import { EditorNormalizeOptions } from "slate/dist/interfaces/editor";
import { ElementSettingsSidebarStore } from "./elements/ElementSettingsSidebar";
import {
	AlignType,
	AlignTypeNoJustify,
	CustomEditor,
	CustomElementTypeStr,
	FrontPageWithTextElement,
	ParagraphElement,
	SectionBreakHeaderFooterCell,
	SectionBreakHeaderFooterEditorElement,
	SectionBreakHeaderFooterEditorElementType,
	TextMarkTypes,
} from "./types";
import {
	isAlignType,
	isElementNameThatOfElementWhoseTypeCannotBeChanged,
	isElementNameThatOfTextChildrenOnlyElement,
	isListElementTypeStr,
} from "./types.guard";

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

export function setColorMark(editor: CustomEditor, color: string) {
	console.log({ color });
	if (color === "#000" || color === "#000000") {
		Editor.removeMark(editor, "color");
	} else {
		Editor.addMark(editor, "color", color);
	}
}

export function getColorMark(editor: CustomEditor) {
	const marks = Editor.marks(editor);
	return marks?.color ?? "#000";
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
			} as Partial<SlateElement>;
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
				if ("type" in curr && isElementNameThatOfElementWhoseTypeCannotBeChanged(curr.type)) return;
			}
		}

		Transforms.setNodes<SlateElement>(editor, newProperties);

		if (!isActive && isList) {
			const block = { id: randomAddress(), type: format, children: [] };
			Transforms.wrapNodes(editor, block);
		}
	});
}

export function recursiveTraverse(nodesTree: Descendant[], fn?: (element: Descendant) => void): Set<string> {
	const ids = new Set<string>();
	const q = [...nodesTree];
	while (q.length > 0) {
		const last = q.pop();
		if (last == null) continue;
		const id = "id" in last ? last.id : getAddress(last);
		if (ids.has(id)) continue;
		fn?.(last);
		ids.add(id);
		if ("children" in last) {
			q.push(...last.children);
		}
	}
	return ids;
}

export function withNormalizedCustomElements(editor: CustomEditor) {
	const { normalizeNode } = editor;

	editor.normalizeNode = (entry) => {
		const [node, path] = entry;

		if (Element.isElement(node)) {
			if (isElementNameThatOfTextChildrenOnlyElement(node.type)) {
				for (const [child, childPath] of Node.children(editor, path)) {
					if (Element.isElement(child) && !editor.isInline(child)) {
						Transforms.unwrapNodes(editor, { at: childPath });
						return;
					}
				}
			}
			if (node.type === "section-break" || node.type === "page-break" || node.type === "auto-toc") {
				if (path.length > 1) {
					Transforms.moveNodes(editor, { at: path, to: [path[0]] });
					return;
				}
			}
			if (node.type === "section-break-header-footer-cell") {
				const parent = Node.parent(editor, path);
				if (!(Element.isElement(parent) && "type" in parent && parent.type === "section-break-header-footer-editor-element")) {
					Transforms.setNodes<ParagraphElement>(editor, { type: "paragraph" }, { at: path });
					return;
				}
			}
			if (node.type === "section-break-header-footer-editor-element") {
				const parent = Node.parent(editor, path);
				if (!(Element.isElement(parent) && "type" in parent && parent.type === "section-break")) {
					Transforms.setNodes<ParagraphElement>(editor, { type: "paragraph" }, { at: path });
					return;
				}
				const children = [...Node.children(editor, path)];
				if (children.length < 3) {
					Transforms.insertNodes<SectionBreakHeaderFooterCell>(
						editor,
						{
							id: randomAddress(),
							type: "section-break-header-footer-cell",
							elementType: "center",
							children: [{ text: "" }],
						},
						{ at: Path.next(children[children.length - 1][1]) },
					);
					return;
				}
				if (children.length > 3) {
					Transforms.removeNodes<SectionBreakHeaderFooterCell>(editor, { at: children[children.length - 1][1] });
					return;
				}
				let i = 0;
				const elementTypeArr: AlignTypeNoJustify[] = ["left", "center", "right"];
				for (const [child, childPath] of children) {
					if (!Element.isElement(child)) {
						continue;
					}
					if (!("type" in child && child.type === "section-break-header-footer-cell")) {
						Transforms.setNodes<SectionBreakHeaderFooterCell>(editor, { type: "section-break-header-footer-cell" }, { at: childPath });
						return;
					}
					const elementType = elementTypeArr[i];
					if (child.elementType !== elementType) {
						Transforms.setNodes<SectionBreakHeaderFooterCell>(editor, { elementType }, { at: childPath });
						return;
					}
					i++;
				}
			}
			if (node.type === "section-break") {
				const children = [...Node.children(editor, path)];
				if (children.length < 4) {
					Transforms.insertNodes<SectionBreakHeaderFooterEditorElement>(
						editor,
						{
							id: randomAddress(),
							type: "section-break-header-footer-editor-element",
							elementType: "even-footer",
							children: [
								{
									id: randomAddress(),
									type: "section-break-header-footer-cell",
									elementType: "left",
									children: [{ text: "" }],
								},
								{
									id: randomAddress(),
									type: "section-break-header-footer-cell",
									elementType: "center",
									children: [{ text: "" }],
								},
								{
									id: randomAddress(),
									type: "section-break-header-footer-cell",
									elementType: "right",
									children: [{ text: "" }],
								},
							],
							bgColor: "#aaf",
						},
						{ at: Path.next(children[children.length - 1][1]) },
					);
					return;
				}
				if (children.length > 4) {
					Transforms.removeNodes<SectionBreakHeaderFooterEditorElement>(editor, { at: children[children.length - 1][1] });
					return;
				}
				let i = 0;
				const elementTypeArr: SectionBreakHeaderFooterEditorElementType[] = ["odd-header", "odd-footer", "even-header", "even-footer"];
				for (const [child, childPath] of children) {
					if (!Element.isElement(child)) {
						continue;
					}
					if (!("type" in child && child.type === "section-break-header-footer-editor-element")) {
						Transforms.setNodes<SectionBreakHeaderFooterEditorElement>(
							editor,
							{ type: "section-break-header-footer-editor-element" },
							{ at: childPath },
						);
						return;
					}
					const elementType = elementTypeArr[i];
					if (child.elementType !== elementType) {
						Transforms.setNodes<SectionBreakHeaderFooterEditorElement>(editor, { elementType }, { at: childPath });
						return;
					}
					i++;
				}
			}
		}

		// Fall back to the original `normalizeNode` to enforce other constraints.
		normalizeNode(entry);
	};

	return editor;
}

export function withNormalizedFrontPage(editor: CustomEditor) {
	const { normalize } = editor;

	editor.normalize = (options?: EditorNormalizeOptions) => {
		const initialNode = editor.children[0];

		if (!(Element.isElement(initialNode) && initialNode.type === "front-page-with-text")) {
			Transforms.insertNodes<FrontPageWithTextElement>(
				editor,
				{
					id: randomAddress(),
					type: "front-page-with-text",
					children: [{ text: "" }],
					mainImageUrl: DEMO_IMAGE_URL,
				},
				{ at: [1] },
			);
			return;
		}
		const nextNode = editor.children[1];
		if (!(nextNode != null && Element.isElement(nextNode) && nextNode.type === "paragraph")) {
			Transforms.insertNodes<ParagraphElement>(
				editor,
				{
					id: randomAddress(),
					type: "paragraph",
					children: [{ text: "" }],
				},
				{ at: [1] },
			);
			return;
		}

		// Fall back to the original `normalize` to enforce other constraints.
		normalize(options);
	};

	return editor;
}

export function insertNodeSpecial<T extends Node>(editor: Editor, nodes: T, settingsSidebarStore: ElementSettingsSidebarStore | null | undefined) {
	const selectionData = settingsSidebarStore?.data;
	console.log(selectionData);
	if (selectionData != null && (selectionData.element.type === "card" || selectionData.element.type === "flexbox")) {
		Transforms.insertNodes(editor, nodes, { at: Path.next(selectionData.path) });
	} else {
		Transforms.insertNodes(editor, [
			nodes,
			{
				id: randomAddress(),
				type: "paragraph",
				children: [{ text: "" }],
			},
		]);
	}
}

export function useChangeCallbackForNode<T extends Node, TKey extends keyof T>(editor: CustomEditor, path: Location, key: TKey, _unusedElem: T) {
	return useCallback(
		(v: T[TKey]) => {
			Transforms.setNodes<T>(editor, { [key]: v } as unknown as Partial<T>, { at: path });
		},
		[editor, key, path],
	);
}

export function useChangeCallbackWithTransformerForNode<T extends Node, TInput, TKey extends keyof T>(
	editor: CustomEditor,
	path: Location,
	key: TKey,
	fn: (v: TInput) => T[TKey],
	_unusedElem: T,
) {
	return useCallback(
		(v: TInput) => {
			Transforms.setNodes<T>(editor, { [key]: fn(v) } as unknown as Partial<T>, { at: path });
		},
		[editor, fn, key, path],
	);
}

export function withUniqueIds(editor: CustomEditor) {
	const { normalize } = editor;

	editor.normalize = (options?: EditorNormalizeOptions) => {
		const map: { [key: string]: true } = {};
		for (const [elem, path] of Node.elements(editor, {})) {
			if ("type" in elem && Element.isElement(elem)) {
				if (elem.id == null) {
					Transforms.setNodes(editor, { id: randomAddress() }, { at: path });
					return;
				}
				if (elem.id in map) {
					console.log("Duplicate found: ", elem.id, path);
					Transforms.setNodes(editor, { id: randomAddress() }, { at: path });
					return;
				}
				map[elem.id] = true;
			}
		}
		// Fall back to the original `normalize` to enforce other constraints.
		normalize(options);
	};

	return editor;
}
