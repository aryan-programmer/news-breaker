import { CustomEditor } from "./types";
import * as Slate from "slate";

function clipboardEncode(data) {
	return window.btoa(encodeURIComponent(JSON.stringify(data)));
}
function clipboardDecode(str: string) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return JSON.parse(decodeURIComponent(window.atob(str)));
}

export function withSimpleCopyPaste(editor: CustomEditor) {
	editor.setFragmentData = (data) => {
		if (!editor.selection || Slate.Range.isCollapsed(editor.selection)) return;

		const { anchor, focus } = editor.selection;

		let commonPath = Slate.Path.common(anchor.path, focus.path);
		let commonNode = Slate.Node.get(editor, commonPath);

		if (Slate.Text.isText(commonNode)) {
			// Node.fragment() demands an Element root
			commonPath = commonPath.slice(0, commonPath.length - 1);
			commonNode = Slate.Node.get(editor, commonPath);
		}

		data.setData(
			"application/x-slate-nodes",
			clipboardEncode(
				Slate.Node.fragment(commonNode, {
					anchor: { ...anchor, path: anchor.path.slice(commonPath.length) },
					focus: { ...focus, path: focus.path.slice(commonPath.length) },
				}),
			),
		);
	};

	editor.insertData = (data) => {
		const encoded = data.getData("application/x-slate-nodes");
		if (encoded !== "") {
			// We avoid insertFragment - it's really hairy
			Slate.Transforms.insertNodes(editor, clipboardDecode(encoded) as Slate.Node[]);
		}
	};

	return editor;
}
