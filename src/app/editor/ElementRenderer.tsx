import { TableBody, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { RenderElementProps } from "slate-react";
import { AutoTableOfContents } from "./AutoTableOfContents";
import EditableImage from "./EditableImage";
import { FrontPageWithText } from "./FrontPageWithText";
import { PageBreak } from "./PageBreak";
import { TableCellElementRenderer, TableElementRenderer, TableHeaderCellElementRenderer } from "./TableElements";

export default function ElementRenderer(props: RenderElementProps) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { attributes, children, element } = props;
	const style = { textAlign: "align" in element ? element.align : undefined };
	if ("type" in element) {
		switch (element.type) {
			case "block-quote":
				return (
					<blockquote style={style} {...attributes}>
						{children}
					</blockquote>
				);
			case "bulleted-list":
				return (
					<ul className="max-w-md space-y-1 list-disc list-inside" style={style} {...attributes}>
						{children}
					</ul>
				);
			case "heading-1":
				return (
					<h1 className="mb-4 text-5xl font-extrabold leading-none" style={style} {...attributes}>
						{children}
					</h1>
				);
			case "heading-2":
				return (
					<h2 className="mb-3 text-4xl font-extrabold leading-none" style={style} {...attributes}>
						{children}
					</h2>
				);
			case "list-item":
				return (
					<li style={style} {...attributes}>
						{children}
					</li>
				);
			case "numbered-list":
				return (
					<ol className="max-w-md space-y-1 list-decimal list-inside" style={style} {...attributes}>
						{children}
					</ol>
				);
			case "paragraph":
				return (
					<p style={style} {...attributes}>
						{children}
					</p>
				);
			case "image":
				return (
					<EditableImage element={element} attributes={attributes}>
						{children}
					</EditableImage>
				);
			case "front-page-with-text":
				return (
					<FrontPageWithText element={element} attributes={attributes}>
						{children}
					</FrontPageWithText>
				);
			case "auto-toc":
				return (
					<AutoTableOfContents element={element} attributes={attributes}>
						{children}
					</AutoTableOfContents>
				);
			case "page-break":
				return (
					<PageBreak element={element} attributes={attributes}>
						{children}
					</PageBreak>
				);
			case "table-cell":
				return (
					<TableCellElementRenderer element={element} attributes={attributes}>
						{children}
					</TableCellElementRenderer>
				);
			case "table-header-cell":
				return (
					<TableHeaderCellElementRenderer element={element} attributes={attributes}>
						{children}
					</TableHeaderCellElementRenderer>
				);
			case "table-row":
				return (
					<TableRow style={style} {...attributes}>
						{children}
					</TableRow>
				);
			case "table":
				return (
					<TableElementRenderer element={element} attributes={attributes}>
						{children}
					</TableElementRenderer>
				);
			case "table-body":
				return (
					<TableBody style={style} {...attributes}>
						{children}
					</TableBody>
				);
			case "table-footer":
				return (
					<TableFooter style={style} {...attributes}>
						{children}
					</TableFooter>
				);
			case "table-head":
				return (
					<TableHeader style={style} {...attributes}>
						{children}
					</TableHeader>
				);
			case "div":
				return (
					<div style={style} {...attributes}>
						{children}
					</div>
				);
		}
	} else {
		return (
			<p style={style} {...attributes}>
				{children}
			</p>
		);
	}
}
