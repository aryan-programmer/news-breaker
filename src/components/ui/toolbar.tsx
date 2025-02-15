import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Button } from "./button";
import { Toggle } from "./toggle";

export const ToolbarIconButton = React.forwardRef<
	React.ComponentRef<typeof Button>,
	React.ComponentPropsWithoutRef<typeof Button> & { hoverText: string }
>(function ToolbarIconButton(propsOrig, ref) {
	const { hoverText, variant = "ghost", children, ...props } = propsOrig;
	//return <Menu {...props} ref={ref} className={`${className} relative pt-0.5 px-3 pb-3 mt-0 -mx-3 mb-3 border-b-slate-300 border-b-2`} />;
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
	//return <Menu {...props} ref={ref} className={`${className} relative pt-0.5 px-3 pb-3 mt-0 -mx-3 mb-3 border-b-slate-300 border-b-2`} />;
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
