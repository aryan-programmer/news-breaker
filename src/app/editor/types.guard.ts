/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import { AlignType, CustomElementTypeStr, ListElementTypeStr } from "./types";

export function isAlignType(obj: unknown): obj is AlignType {
    const typedObj = obj as AlignType
    return (
        (typedObj === "left" ||
            typedObj === "center" ||
            typedObj === "right" ||
            typedObj === "justify")
    )
}

export function isCustomElementTypeStr(obj: unknown): obj is CustomElementTypeStr {
    const typedObj = obj as CustomElementTypeStr
    return (
        (typedObj === "paragraph" ||
            typedObj === "block-quote" ||
            typedObj === "list-item" ||
            typedObj === "heading-1" ||
            typedObj === "heading-2" ||
            typedObj === "bulleted-list" ||
            typedObj === "numbered-list")
    )
}

export function isListElementTypeStr(obj: unknown): obj is ListElementTypeStr {
    const typedObj = obj as ListElementTypeStr
    return (
        (typedObj === "bulleted-list" ||
            typedObj === "numbered-list")
    )
}
