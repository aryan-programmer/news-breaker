"use client";
import { MaterialIcon } from "@/components/ui/material-icon";
import { ToolbarIconToggle } from "@/components/ui/toolbar";
import React from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "./editor-utils";
import { AlignType, CustomElementTypeStr } from "./types";

export function BlockButton({ format, hoverText, icon }: { format: AlignType | CustomElementTypeStr; hoverText: string; icon: string }) {
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
			<MaterialIcon>{icon}</MaterialIcon>
		</ToolbarIconToggle>
	);
}
