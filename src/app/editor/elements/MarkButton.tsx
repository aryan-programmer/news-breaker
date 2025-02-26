"use client";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { ToolbarIconToggle } from "@/components/ui/Toolbar";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import { getColorMark, isMarkActive, setColorMark, toggleMark } from "../editor-utils";
import { TextMarkTypes } from "../types";

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

export function MarkColorPicker() {
	const editor = useSlate();
	return <ColorPicker className="inline-flex mx-1" onChange={(v: string) => setColorMark(editor, v)} value={getColorMark(editor)} />;
}
