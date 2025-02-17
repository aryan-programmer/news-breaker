"use client";
import { ToolbarIconToggle } from "@/components/ui/toolbar";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "./editor-utils";
import { TextMarkTypes } from "./types";

export function MarkButton({ format, hoverText, children }: { format: TextMarkTypes; hoverText: string; children: ReactNode }) {
	const editor = useSlate();
	return (
		<ToolbarIconToggle
			pressed={isMarkActive(editor, format)}
			variant="primaryOnSelect"
			rounding="zero"
			hoverText={hoverText}
			onPressedChange={(_pressed: boolean) => {
				toggleMark(editor, format);
			}}>
			{children}
		</ToolbarIconToggle>
	);
}
