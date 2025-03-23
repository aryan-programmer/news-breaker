/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import { AlignType, PageNumberFormatType, HeaderLevels, FlexboxAlignContent, FlexboxAlignItems, FlexboxAlignSelf, FlexboxFlexWrap, FlexboxJustifyContent, HeadingNElementTypeName, TextChildrenOnlyElementNames, TypeNamesOfElementsWhoseTypesCannotBeChanged, CustomElementTypeStr, ListElementTypeStr } from "./types";

export function isAlignType(obj: unknown): obj is AlignType {
    const typedObj = obj as AlignType
    return (
        (typedObj === "left" ||
            typedObj === "center" ||
            typedObj === "right" ||
            typedObj === "justify")
    )
}

export function isPageNumberFormatType(obj: unknown): obj is PageNumberFormatType {
    const typedObj = obj as PageNumberFormatType
    return (
        (typedObj === "numeric" ||
            typedObj === "lower" ||
            typedObj === "upper" ||
            typedObj === "lower-roman" ||
            typedObj === "upper-roman")
    )
}

export function isHeaderLevelNumber(obj: unknown): obj is HeaderLevels {
    const typedObj = obj as HeaderLevels
    return (
        (typedObj === 1 ||
            typedObj === 2 ||
            typedObj === 3 ||
            typedObj === 4 ||
            typedObj === 5 ||
            typedObj === 6)
    )
}

export function isFlexboxAlignContent(obj: unknown): obj is FlexboxAlignContent {
    const typedObj = obj as FlexboxAlignContent
    return (
        (typedObj === "center" ||
            typedObj === "flex-start" ||
            typedObj === "flex-end" ||
            typedObj === "stretch" ||
            typedObj === "space-between" ||
            typedObj === "space-around" ||
            typedObj === "space-evenly")
    )
}

export function isFlexboxAlignItems(obj: unknown): obj is FlexboxAlignItems {
    const typedObj = obj as FlexboxAlignItems
    return (
        (typedObj === "center" ||
            typedObj === "flex-start" ||
            typedObj === "flex-end" ||
            typedObj === "stretch" ||
            typedObj === "baseline")
    )
}

export function isFlexboxAlignSelf(obj: unknown): obj is FlexboxAlignSelf {
    const typedObj = obj as FlexboxAlignSelf
    return (
        (typedObj === "center" ||
            typedObj === "flex-start" ||
            typedObj === "flex-end" ||
            typedObj === "stretch" ||
            typedObj === "baseline" ||
            typedObj === "auto")
    )
}

export function isFlexboxFlexWrap(obj: unknown): obj is FlexboxFlexWrap {
    const typedObj = obj as FlexboxFlexWrap
    return (
        (typedObj === "nowrap" ||
            typedObj === "wrap" ||
            typedObj === "wrap-reverse")
    )
}

export function isFlexboxJustifyContent(obj: unknown): obj is FlexboxJustifyContent {
    const typedObj = obj as FlexboxJustifyContent
    return (
        (typedObj === "center" ||
            typedObj === "flex-start" ||
            typedObj === "flex-end" ||
            typedObj === "space-between" ||
            typedObj === "space-around" ||
            typedObj === "space-evenly")
    )
}

export function isHeadingTypeName(obj: unknown): obj is HeadingNElementTypeName {
    const typedObj = obj as HeadingNElementTypeName
    return (
        (typedObj === "heading-1" ||
            typedObj === "heading-2" ||
            typedObj === "heading-3" ||
            typedObj === "heading-4" ||
            typedObj === "heading-5" ||
            typedObj === "heading-6")
    )
}

export function isElementNameThatOfTextChildrenOnlyElement(obj: unknown): obj is TextChildrenOnlyElementNames {
    const typedObj = obj as TextChildrenOnlyElementNames
    return (
        (typedObj === "heading-1" ||
            typedObj === "heading-2" ||
            typedObj === "heading-3" ||
            typedObj === "heading-4" ||
            typedObj === "heading-5" ||
            typedObj === "heading-6" ||
            typedObj === "paragraph" ||
            typedObj === "block-quote" ||
            typedObj === "list-item" ||
            typedObj === "image" ||
            typedObj === "auto-toc" ||
            typedObj === "page-break" ||
            typedObj === "section-break-header-footer-cell")
    )
}

export function isElementNameThatOfElementWhoseTypeCannotBeChanged(obj: unknown): obj is TypeNamesOfElementsWhoseTypesCannotBeChanged {
    const typedObj = obj as TypeNamesOfElementsWhoseTypesCannotBeChanged
    return (
        (typedObj === "image" ||
            typedObj === "auto-toc" ||
            typedObj === "page-break" ||
            typedObj === "section-break-header-footer-cell" ||
            typedObj === "front-page-with-text" ||
            typedObj === "table-cell" ||
            typedObj === "table-header-cell" ||
            typedObj === "table-row" ||
            typedObj === "table" ||
            typedObj === "table-body" ||
            typedObj === "table-footer" ||
            typedObj === "table-head" ||
            typedObj === "section-break" ||
            typedObj === "section-break-header-footer-editor-element")
    )
}

export function isCustomElementTypeStr(obj: unknown): obj is CustomElementTypeStr {
    const typedObj = obj as CustomElementTypeStr
    return (
        (typedObj === "heading-1" ||
            typedObj === "heading-2" ||
            typedObj === "heading-3" ||
            typedObj === "heading-4" ||
            typedObj === "heading-5" ||
            typedObj === "heading-6" ||
            typedObj === "paragraph" ||
            typedObj === "block-quote" ||
            typedObj === "list-item" ||
            typedObj === "image" ||
            typedObj === "auto-toc" ||
            typedObj === "page-break" ||
            typedObj === "section-break-header-footer-cell" ||
            typedObj === "front-page-with-text" ||
            typedObj === "table-cell" ||
            typedObj === "table-header-cell" ||
            typedObj === "table-row" ||
            typedObj === "table" ||
            typedObj === "table-body" ||
            typedObj === "table-footer" ||
            typedObj === "table-head" ||
            typedObj === "section-break" ||
            typedObj === "section-break-header-footer-editor-element" ||
            typedObj === "bulleted-list" ||
            typedObj === "numbered-list" ||
            typedObj === "table-cell-content" ||
            typedObj === "flexbox" ||
            typedObj === "card")
    )
}

export function isListElementTypeStr(obj: unknown): obj is ListElementTypeStr {
    const typedObj = obj as ListElementTypeStr
    return (
        (typedObj === "bulleted-list" ||
            typedObj === "numbered-list")
    )
}
