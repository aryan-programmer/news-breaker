import { Separator } from "@/components/ui/separator";
import { randomAddress } from "@/lib/uniq-address";
import { Transforms } from "slate";
import { CustomEditor, PageBreakElement, RenderElementAttributesProp } from "./types";

export type PageBreakProps = {
	attributes: RenderElementAttributesProp;
	element: PageBreakElement;
	children: unknown;
};

export function insertPageBreak(editor: CustomEditor) {
	const pageBreak: PageBreakElement = { type: "page-break", children: [{ text: "" }], id: randomAddress() };
	Transforms.insertNodes(editor, pageBreak);
	Transforms.insertNodes(editor, {
		type: "paragraph",
		children: [{ text: "" }],
	});
}

export function PageBreak({ attributes, children }: PageBreakProps) {
	return (
		<div contentEditable={false} {...attributes}>
			<Separator />
			<h1 className="my-2 text-xl font-extrabold leading-none w-100 text-center">Page Break{children as any}</h1>
			<Separator />
		</div>
	);
}
