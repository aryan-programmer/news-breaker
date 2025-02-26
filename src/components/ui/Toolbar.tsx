import React from "react";
import { Button } from "./Button";
import { Toggle } from "./Toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

export const ToolbarIconButton = React.forwardRef<
	React.ComponentRef<typeof Button>,
	React.ComponentPropsWithoutRef<typeof Button> & { hoverText: string }
>(function ToolbarIconButton(propsOrig, ref) {
	const { hoverText, variant = "ghost", children, ...props } = propsOrig;
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant={variant} {...props} ref={ref}>
					{children}
					<span className="sr-only">{hoverText}</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>{hoverText}</TooltipContent>
		</Tooltip>
	);
});

export const ToolbarIconToggle = React.forwardRef<
	React.ComponentRef<typeof Toggle>,
	React.ComponentPropsWithoutRef<typeof Toggle> & { hoverText: string }
>(function ToolbarIconToggle(propsOrig, ref) {
	const { hoverText, children, ...props } = propsOrig;
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Toggle {...props} ref={ref}>
					{children}
					<span className="sr-only">{hoverText}</span>
				</Toggle>
			</TooltipTrigger>
			<TooltipContent>{hoverText}</TooltipContent>
		</Tooltip>
	);
});
