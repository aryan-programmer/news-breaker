"use client";
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

	if (leaf.pageNumberOverride) {
		children = <span className="font-mono bg-red-600">{children}</span>;
	}

	return <span {...attributes}>{children}</span>;
}
