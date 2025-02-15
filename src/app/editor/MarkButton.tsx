"use client";
import { MaterialIcon } from "@/components/ui/material-icon";
import { ToolbarIconToggle } from "@/components/ui/toolbar";
import React from "react";
import { useSlate } from "slate-react";
import { TextMarkTypes } from "./types";
import { isMarkActive, toggleMark } from "./editor-utils";

export function MarkButton({ format, hoverText, icon }: { format: TextMarkTypes; hoverText: string; icon: string }) {
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
			<MaterialIcon>{icon}</MaterialIcon>
		</ToolbarIconToggle>
	);
}
