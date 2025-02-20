import { TableCellElement, TableHeaderCellElement } from "@/app/editor/types";
import { randomAddress } from "@/lib/uniq-address";
import { Editor, Node, Transforms } from "slate";
import { WithTableOptions } from "../options";
import { isElement } from "../utils";

/**
 * Normalizes the `thead`, `tbody` and `tfoot` nodes by wrapping each of its
 * child nodes within a `tr` element.
 */
export function normalizeSections<T extends Editor>(editor: T, { blocks: { thead, tbody, tfoot, tr } }: WithTableOptions): T {
	const { normalizeNode } = editor;

	editor.normalizeNode = (entry, options) => {
		const [node, path] = entry;
		if (isElement(node) && [thead, tbody, tfoot].includes(node.type)) {
			for (const [child, childPath] of Node.children(editor, path)) {
				if (!isElement(child) || child.type !== tr) {
					return Transforms.wrapNodes(
						editor,
						{
							id: randomAddress(),
							type: tr,
							children: [child as TableCellElement | TableHeaderCellElement],
						},
						{ at: childPath },
					);
				}
			}
		}

		normalizeNode(entry, options);
	};

	return editor;
}
