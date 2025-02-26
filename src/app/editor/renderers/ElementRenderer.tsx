import { TableBody, TableFooter, TableHeader, TableRow } from "@/components/ui/Table";
import { RenderElementProps } from "slate-react";
import { AutoTableOfContents } from "./AutoTableOfContents";
import { CardRenderer } from "./CardRenderer";
import EditableImage from "./EditableImage";
import { FlexboxRenderer } from "./FlexboxRenderer";
import { FrontPageWithText } from "./FrontPageWithText";
import { PageBreak } from "./PageBreak";
import { SectionBreak, SectionBreakHeaderFooterCellRenderer, SectionBreakHeaderFooterEditorElementRenderer } from "./SectionBreak";
import { TableCellElementCommonRenderer, TableElementRenderer } from "./TableElements";

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
					<ul className="space-y-1 list-disc list-inside" style={style} {...attributes}>
						{children}
					</ul>
				);
			case "heading-1":
				return (
					<h1 className="mb-4 mt-4 text-5xl font-serif font-extrabold leading-none" style={style} {...attributes}>
						{children}
					</h1>
				);
			case "heading-2":
				return (
					<h2 className="mb-3 mt-3 text-4xl font-serif font-bold leading-none" style={style} {...attributes}>
						{children}
					</h2>
				);
			case "heading-3":
				return (
					<h3 className="mb-2 mt-2 text-3xl font-serif leading-none" style={style} {...attributes}>
						{children}
					</h3>
				);
			case "list-item":
				return (
					<li style={style} {...attributes}>
						{children}
					</li>
				);
			case "numbered-list":
				return (
					<ol className="space-y-1 list-decimal list-inside" style={style} {...attributes}>
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
			case "table-header-cell":
				return (
					<TableCellElementCommonRenderer element={element} attributes={attributes}>
						{children}
					</TableCellElementCommonRenderer>
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
			case "table-cell-content":
				return (
					<div style={style} {...attributes}>
						{children}
					</div>
				);
			case "section-break":
				return (
					<SectionBreak element={element} attributes={attributes}>
						{children}
					</SectionBreak>
				);
			case "section-break-header-footer-editor-element":
				return (
					<SectionBreakHeaderFooterEditorElementRenderer element={element} attributes={attributes}>
						{children}
					</SectionBreakHeaderFooterEditorElementRenderer>
				);
			case "section-break-header-footer-cell":
				return (
					<SectionBreakHeaderFooterCellRenderer element={element} attributes={attributes}>
						{children}
					</SectionBreakHeaderFooterCellRenderer>
				);
			case "flexbox":
				return (
					<FlexboxRenderer element={element} attributes={attributes}>
						{children}
					</FlexboxRenderer>
				);
			case "card":
				return (
					<CardRenderer element={element} attributes={attributes}>
						{children}
					</CardRenderer>
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
