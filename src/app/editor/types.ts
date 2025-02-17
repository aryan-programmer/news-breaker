import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderElementProps } from "slate-react";

/** @see {isAlignType} ts-auto-guard:type-guard */
export type AlignType = "left" | "center" | "right" | "justify";

export type FrontPageWithTextElement = {
	type: "front-page-with-text";
	children: Descendant[];
	mainImageUrl: string;
	logoImageUrl?: string | null | undefined;
	textSectionBgColor?: string | null | undefined;
	id: string;
};
export type AutoTableOfContentsElement = {
	type: "auto-toc";
	children: [CustomText];
	id: string;
	includeHeaderLevelUpto: 1 | 2 | 3;
};
export type PageBreakElement = {
	type: "page-break";
	children: [CustomText];
	id: string;
};
export type DivElement = {
	type: "div";
	align?: AlignType;
	children: Descendant[];
};
export type Paragraph = {
	type: "paragraph";
	align?: AlignType;
	children: CustomText[];
};
export type BlockQuote = {
	type: "block-quote";
	children: CustomText[];
};
export type ListItemElement = {
	type: "list-item";
	children: CustomText[];
};
export type Heading1Element = {
	type: "heading-1";
	children: CustomText[];
};
export type Heading2Element = {
	type: "heading-2";
	children: CustomText[];
};
export type NumberedListElement = {
	type: "numbered-list";
	children: ListItemElement[];
};
export type BulletedListElement = {
	type: "bulleted-list";
	children: ListItemElement[];
};
export type ImageElement = {
	type: "image";
	srcUrl: string;
	children: [CustomText];
	id: string;
};
export type TableCellElement = {
	type: "table-cell";
	children: Descendant[];
	rowSpan?: number;
	colSpan?: number;
};
export type TableHeaderCellElement = {
	type: "table-header-cell";
	children: Descendant[];
	rowSpan?: number;
	colSpan?: number;
};
export type TableRowElement = {
	type: "table-row";
	children: (TableCellElement | TableHeaderCellElement)[];
};
export type TableElement = {
	type: "table";
	children: (TableHeadSectionElement | TableBodySectionElement | TableFootSectionElement)[];
};
export type TableBodySectionElement = { type: "table-body"; children: TableRowElement[] };
export type TableFootSectionElement = { type: "table-footer"; children: TableRowElement[] };
export type TableHeadSectionElement = { type: "table-head"; children: TableRowElement[] };

export type CustomElement =
	| Paragraph
	| BlockQuote
	| ListItemElement
	| Heading1Element
	| Heading2Element
	| BulletedListElement
	| NumberedListElement
	| ImageElement
	| FrontPageWithTextElement
	| AutoTableOfContentsElement
	| PageBreakElement
	| TableCellElement
	| TableHeaderCellElement
	| TableRowElement
	| TableElement
	| TableBodySectionElement
	| TableFootSectionElement
	| TableHeadSectionElement
	| DivElement;
export type CustomText = { text: string; bold?: true; italic?: true; underline?: true; code?: true };
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TextMarkTypes = keyof Omit<CustomText, "text">;

/** @see {isCustomElementTypeStr} ts-auto-guard:type-guard */
export type CustomElementTypeStr = CustomElement["type"];

/** @see {isListElementTypeStr} ts-auto-guard:type-guard */
export type ListElementTypeStr = (NumberedListElement | BulletedListElement)["type"];

export type RenderElementAttributesProp = RenderElementProps["attributes"];

declare module "slate" {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
