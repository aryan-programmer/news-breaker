import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";

/** @see {isAlignType} ts-auto-guard:type-guard */
export type AlignType = "left" | "center" | "right" | "justify";

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

export type CustomElement = Paragraph | BlockQuote | ListItemElement | Heading1Element | Heading2Element | BulletedListElement | NumberedListElement;
export type CustomText = { text: string; bold?: true; italic?: true; underline?: true; code?: true };
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TextMarkTypes = keyof Omit<CustomText, "text">;

/** @see {isCustomElementTypeStr} ts-auto-guard:type-guard */
export type CustomElementTypeStr = CustomElement["type"];

/** @see {isListElementTypeStr} ts-auto-guard:type-guard */
export type ListElementTypeStr = (NumberedListElement | BulletedListElement)["type"];

declare module "slate" {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
