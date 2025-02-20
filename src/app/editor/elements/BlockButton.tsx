"use client";
import { ToolbarIconToggle } from "@/components/ui/Toolbar";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../editor-utils";
import { AlignType, CustomElementTypeStr } from "../types";

export function BlockButton({ format, hoverText, children }: { format: AlignType | CustomElementTypeStr; hoverText: string; children: ReactNode }) {
	const editor = useSlate();
	return (
		<ToolbarIconToggle
			pressed={isBlockActive(editor, format)}
			variant="primaryOnSelect"
			rounding="zero"
			onPressedChange={(_pressed: boolean) => {
				toggleBlock(editor, format);
			}}
			hoverText={hoverText}>
			{children}
		</ToolbarIconToggle>
	);
}
