/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import { AlignType, CustomElementTypeStr, ListElementTypeStr, PageNumberFormatType, TypeNamesOfElementsWhoseTypesCannotBeChanged } from "./types";

export function isAlignType(obj: unknown): obj is AlignType {
	const typedObj = obj as AlignType;
	return typedObj === "left" || typedObj === "center" || typedObj === "right" || typedObj === "justify";
}

export function isPageNumberFormatType(obj: unknown): obj is PageNumberFormatType {
	const typedObj = obj as PageNumberFormatType;
	return typedObj === "numeric" || typedObj === "lower" || typedObj === "upper" || typedObj === "lower-roman" || typedObj === "upper-roman";
}

export function isElementNameThatOfElementWhoseTypeCannotBeChanged(obj: unknown): obj is TypeNamesOfElementsWhoseTypesCannotBeChanged {
	const typedObj = obj as TypeNamesOfElementsWhoseTypesCannotBeChanged;
	return (
		typedObj === "image" ||
		typedObj === "front-page-with-text" ||
		typedObj === "auto-toc" ||
		typedObj === "page-break" ||
		typedObj === "table-cell" ||
		typedObj === "table-header-cell" ||
		typedObj === "table-row" ||
		typedObj === "table" ||
		typedObj === "table-body" ||
		typedObj === "table-footer" ||
		typedObj === "table-head" ||
		typedObj === "section-break" ||
		typedObj === "section-break-header-footer-editor-element" ||
		typedObj === "section-break-header-footer-cell"
	);
}

export function isCustomElementTypeStr(obj: unknown): obj is CustomElementTypeStr {
	const typedObj = obj as CustomElementTypeStr;
	return (
		typedObj === "image" ||
		typedObj === "front-page-with-text" ||
		typedObj === "auto-toc" ||
		typedObj === "page-break" ||
		typedObj === "table-cell" ||
		typedObj === "table-header-cell" ||
		typedObj === "table-row" ||
		typedObj === "table" ||
		typedObj === "table-body" ||
		typedObj === "table-footer" ||
		typedObj === "table-head" ||
		typedObj === "section-break" ||
		typedObj === "section-break-header-footer-editor-element" ||
		typedObj === "section-break-header-footer-cell" ||
		typedObj === "paragraph" ||
		typedObj === "block-quote" ||
		typedObj === "list-item" ||
		typedObj === "heading-1" ||
		typedObj === "heading-2" ||
		typedObj === "bulleted-list" ||
		typedObj === "numbered-list" ||
		typedObj === "div"
	);
}

export function isListElementTypeStr(obj: unknown): obj is ListElementTypeStr {
	const typedObj = obj as ListElementTypeStr;
	return typedObj === "bulleted-list" || typedObj === "numbered-list";
}
