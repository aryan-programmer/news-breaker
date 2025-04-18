import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderElementProps } from "slate-react";

/** @see {isAlignType} ts-auto-guard:type-guard */
export type AlignType = "left" | "center" | "right" | "justify";

export type AlignTypeNoJustify = "left" | "center" | "right";

export type SectionBreakHeaderFooterEditorElementType = "odd-header" | "odd-footer" | "even-header" | "even-footer";

/** @see {isPageNumberFormatType} ts-auto-guard:type-guard */
export type PageNumberFormatType = "numeric" | "lower" | "upper" | "lower-roman" | "upper-roman";

export type CommonElement = {
	id: string;
	align?: AlignType;
};

export type ImageSizeAndPositionType = {
	stretch?: boolean;
	anchorX?: "left" | "center" | "right";
	anchorY?: "top" | "center" | "bottom";
};

export type FrontPageWithTextElement = CommonElement & {
	type: "front-page-with-text";
	children: Descendant[];
	mainImageUrl?: string | null | undefined;
	logoImageUrl?: string | null | undefined;
	textSectionBgColor?: string | null | undefined;
	useMainImageAsBg?: boolean;
	mainImageSizeAndPosition?: ImageSizeAndPositionType;
};

type HeaderLevelsParseInt<T extends `heading-${number}`> = T extends any
	? T extends `heading-${infer Digit extends number}`
		? Digit
		: never
	: never;

/** @see {isHeaderLevelNumber} ts-auto-guard:type-guard */
export type HeaderLevels = HeaderLevelsParseInt<HeadingNElement["type"]>;

export type AutoTableOfContentsElement = CommonElement & {
	type: "auto-toc";
	children: [CustomText];
	includeHeaderLevelUpto: HeaderLevels;
};
export type PageBreakElement = CommonElement & {
	type: "page-break";
	children: [CustomText];
};
export type TableCellContentElement = CommonElement & {
	type: "table-cell-content";
	children: Descendant[];
};
export type ParagraphElement = CommonElement & {
	type: "paragraph";
	children: CustomText[];
};
export type BlockQuoteElement = CommonElement & {
	type: "block-quote";
	children: CustomText[];
};
export type ListItemElement = CommonElement & {
	type: "list-item";
	children: CustomText[];
};
export type Heading1Element = CommonElement & {
	type: "heading-1";
	children: CustomText[];
};
export type Heading2Element = CommonElement & {
	type: "heading-2";
	children: CustomText[];
};
export type Heading3Element = CommonElement & {
	type: "heading-3";
	children: CustomText[];
};
export type Heading4Element = CommonElement & {
	type: "heading-4";
	children: CustomText[];
};
export type Heading5Element = CommonElement & {
	type: "heading-5";
	children: CustomText[];
};
export type Heading6Element = CommonElement & {
	type: "heading-6";
	children: CustomText[];
};
export type NumberedListElement = CommonElement & {
	type: "numbered-list";
	children: ListItemElement[];
};
export type BulletedListElement = CommonElement & {
	type: "bulleted-list";
	children: ListItemElement[];
};
export type ImageElement = CommonElement & {
	type: "image";
	width?: string | number;
	srcUrl: string;
	children: [CustomText];
	bgColor?: string | null | undefined;
	borderColor?: string | null | undefined;
	shadowColor?: string | null | undefined;
	rounded?: boolean;
};
export type TableCellElement = CommonElement & {
	type: "table-cell";
	children: Descendant[];
	//rowSpan?: never;
	colSpan?: number;
};
export type TableHeaderCellElement = CommonElement & {
	type: "table-header-cell";
	children: Descendant[];
	//rowSpan?: never;
	colSpan?: number;
};
export type TableRowElement = CommonElement & {
	type: "table-row";
	children: (TableCellElement | TableHeaderCellElement)[];
};
export type TableElement = CommonElement & {
	type: "table";
	children: (TableHeadSectionElement | TableBodySectionElement | TableFootSectionElement)[];
	border: boolean;
};
export type TableBodySectionElement = CommonElement & { type: "table-body"; children: TableRowElement[] };
export type TableFootSectionElement = CommonElement & { type: "table-footer"; children: TableRowElement[] };
export type TableHeadSectionElement = CommonElement & { type: "table-head"; children: TableRowElement[] };

export type SectionBreakHeaderFooterCellGeneric<T extends AlignTypeNoJustify> = CommonElement & {
	type: "section-break-header-footer-cell";
	elementType: T;
	children: CustomText[];
};
export type SectionBreakHeaderFooterCell = SectionBreakHeaderFooterCellGeneric<AlignTypeNoJustify>;

export type SectionBreakHeaderFooterEditorElementGeneric<T extends SectionBreakHeaderFooterEditorElementType> = CommonElement & {
	type: "section-break-header-footer-editor-element";
	elementType: T;
	children: [
		SectionBreakHeaderFooterCellGeneric<"left">,
		SectionBreakHeaderFooterCellGeneric<"center">,
		SectionBreakHeaderFooterCellGeneric<"right">,
	];
	bgColor: string;
};
export type SectionBreakHeaderFooterEditorElement = SectionBreakHeaderFooterEditorElementGeneric<SectionBreakHeaderFooterEditorElementType>;
export type SectionBreakElement = CommonElement & {
	type: "section-break";
	pageNumberFormat: PageNumberFormatType;
	resetPageNumbering: boolean;
	oddPageBackgroundColor?: string;
	evenPageBackgroundColor?: string;
	oddPageImageUrl?: string;
	evenPageImageUrl?: string;
	children: [
		SectionBreakHeaderFooterEditorElementGeneric<"odd-header">,
		SectionBreakHeaderFooterEditorElementGeneric<"odd-footer">,
		SectionBreakHeaderFooterEditorElementGeneric<"even-header">,
		SectionBreakHeaderFooterEditorElementGeneric<"even-footer">,
	];
};

export type CardLayoutImagePos = "top" | "bottom" | "left" | "right" | "back";

export type CardElement = CommonElement & {
	type: "card";
	children: Descendant[];
	imageUrl?: string | null | undefined;
	bgColor?: string | null | undefined;
	borderColor?: string | null | undefined;
	shadowColor?: string | null | undefined;
	borderAroundImage?: boolean;
	imageWidth?: number | string;
	layoutImagePos: CardLayoutImagePos;
	imageSizeAndPosition?: ImageSizeAndPositionType;
};

/** @see {isFlexboxAlignContent} ts-auto-guard:type-guard */ export type FlexboxAlignContent =
	| "flex-start"
	| "flex-end"
	| "center"
	| "stretch"
	| "space-between"
	| "space-around"
	| "space-evenly";
/** @see {isFlexboxAlignItems} ts-auto-guard:type-guard */ export type FlexboxAlignItems =
	| "flex-start"
	| "flex-end"
	| "center"
	| "stretch"
	| "baseline";
/** @see {isFlexboxAlignSelf} ts-auto-guard:type-guard */ export type FlexboxAlignSelf =
	| "auto"
	| "flex-start"
	| "flex-end"
	| "center"
	| "baseline"
	| "stretch";
///** @see {isFlexboxFlexDirection} ts-auto-guard:type-guard */ export type FlexboxFlexDirection = "row" | "row-reverse"; // | "column" | "column-reverse";
/** @see {isFlexboxFlexWrap} ts-auto-guard:type-guard */ export type FlexboxFlexWrap = "nowrap" | "wrap" | "wrap-reverse";
/** @see {isFlexboxJustifyContent} ts-auto-guard:type-guard */ export type FlexboxJustifyContent =
	| "flex-start"
	| "flex-end"
	| "center"
	| "space-around"
	| "space-between"
	| "space-evenly";

export type FlexboxElement = CommonElement & {
	type: "flexbox";
	children: Descendant[];
	alignContent?: FlexboxAlignContent;
	alignItems?: FlexboxAlignItems;
	alignSelf?: FlexboxAlignSelf;
	//flexDirection?: FlexboxFlexDirection;
	flexWrap?: FlexboxFlexWrap;
	flexGrow?: number;
	flexShrink?: number;
	flexBasis?: number | string;
	width?: number | string;
	height?: number | string;
	justifyContent?: FlexboxJustifyContent;
	fixChildrenWidthRatios?: number[] | null | undefined;
};

export type HeadingNElement = Heading1Element | Heading2Element | Heading3Element | Heading4Element | Heading5Element | Heading6Element;

export type CustomElement =
	| ParagraphElement
	| BlockQuoteElement
	| ListItemElement
	| HeadingNElement
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
	| TableCellContentElement
	| SectionBreakElement
	| SectionBreakHeaderFooterEditorElement
	| SectionBreakHeaderFooterCell
	| FlexboxElement
	| CardElement;

/** @see {isHeadingTypeName} ts-auto-guard:type-guard */
export type HeadingNElementTypeName = HeadingNElement["type"];

type GetTextChildrenOnlyTypes<T extends { type: string }> = T extends {
	children: infer T2;
}
	? T2 extends CustomText[]
		? T
		: never
	: never;

/** @see {isElementNameThatOfTextChildrenOnlyElement} ts-auto-guard:type-guard */
export type TextChildrenOnlyElementNames = GetTextChildrenOnlyTypes<CustomElement>["type"];

export type ElementsWhoseTypesCannotBeChanged =
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
	| SectionBreakElement
	| SectionBreakHeaderFooterEditorElement
	| SectionBreakHeaderFooterCell;

/** @see {isElementNameThatOfElementWhoseTypeCannotBeChanged} ts-auto-guard:type-guard */
export type TypeNamesOfElementsWhoseTypesCannotBeChanged = ElementsWhoseTypesCannotBeChanged["type"];

// const PAGE_NUMBER_SPECIAL = "___PAGE_NUMBER_SPECIAL___";

export type CustomText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
	code?: true;
	//smallCaps?: true;
	pageNumberOverride?: true;
	color?: string;
};

export type CustomEditor = BaseEditor &
	ReactEditor &
	HistoryEditor & {
		shouldInsertAfter: boolean;
	};

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
