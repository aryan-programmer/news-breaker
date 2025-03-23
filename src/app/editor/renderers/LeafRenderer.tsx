"use client";
import { isNonNullAndNonEmpty } from "@/lib/utils";
import { RenderLeafProps } from "slate-react";

export function LeafRenderer({ attributes, children, leaf }: RenderLeafProps) {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	// if (leaf.smallCaps) {
	// 	children = <span style={{ fontVariant: "small-caps" }}>{children}</span>;
	// }

	if (isNonNullAndNonEmpty(leaf.color)) {
		children = <span style={{ color: leaf.color }}>{children}</span>;
	}

	if (leaf.pageNumberOverride) {
		children = <span className="font-mono bg-red-600">{children}</span>;
	}

	return <span {...attributes}>{children}</span>;
}
