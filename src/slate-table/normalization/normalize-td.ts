import { randomAddress } from "@/lib/uniq-address";
import { Editor, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes the given `td` (and `th`) node by wrapping every inline
 * and text node inside a `content` node.
 */
export function normalizeTd<T extends Editor>(editor: T, { blocks: { content, td, th } }: WithTableOptions): T {
	const { normalizeNode } = editor;

	editor.normalizeNode = (entry, options) => {
		const [node, path] = entry;
		if (isElement(node) && [th, td].includes(node.type)) {
			for (const [child, childPath] of Node.children(editor, path)) {
				if (isElement(child) && content === child.type) {
					continue;
				}

				return Transforms.wrapNodes(
					editor,
					{
						id: randomAddress(),
						type: content,
						children: [child],
					},
					{ at: childPath },
				);
			}
		}

		normalizeNode(entry, options);
	};

	return editor;
}
