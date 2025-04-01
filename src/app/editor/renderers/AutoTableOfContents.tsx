import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { randomAddress } from "@/lib/uniq-address";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { useChangeCallbackWithTransformerForNode } from "../editor-utils";
import { AutoTableOfContentsElement, CustomEditor, RenderElementAttributesProp } from "../types";
import { isHeaderLevelNumber } from "../types.guard";

export type AutoTableOfContentsProps = {
	attributes: RenderElementAttributesProp;
	element: AutoTableOfContentsElement;
	children: unknown;
};

export function insertTableOfContents(editor: CustomEditor) {
	const pageBreak: AutoTableOfContentsElement = { type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 };
	Transforms.insertNodes(editor, pageBreak);
	Transforms.insertNodes(editor, {
		id: randomAddress(),
		type: "paragraph",
		children: [{ text: "" }],
	});
}

function coreceHeaderLevel(v: string) {
	const iv = +v;
	return isHeaderLevelNumber(iv) ? iv : 3;
}

export function AutoTableOfContents({ attributes, children, element }: AutoTableOfContentsProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const onLevelChange = useChangeCallbackWithTransformerForNode(editor, path, "includeHeaderLevelUpto", coreceHeaderLevel, element);
	return (
		<div contentEditable={false} {...attributes}>
			<h1 className="py-2 mb-2 text-5xl font-extrabold leading-none w-100 text-center bg-black text-white">Table of Contents</h1>
			<div className="flex w-full items-center justify-center space-x-2 border-b-2 border-black">
				<span>
					Include Headers with level upto:
					<span className="h-0 text-transparent outline-0 outline-none absolute w-0" style={{ fontSize: 0 }}>
						{children as any}
					</span>
				</span>
				<Select value={element.includeHeaderLevelUpto.toString()} onValueChange={onLevelChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select heading level" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Heading 1</SelectItem>
						<SelectItem value="2">Heading 2</SelectItem>
						<SelectItem value="3">Heading 3</SelectItem>
						<SelectItem value="4">Heading 4</SelectItem>
						<SelectItem value="5">Heading 5</SelectItem>
						<SelectItem value="6">Heading 6</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
