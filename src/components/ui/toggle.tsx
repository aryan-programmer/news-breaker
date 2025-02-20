"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { Primitive } from "@radix-ui/react-primitive";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "./Button";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 text-foreground text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				primaryOnSelect:
					"bg-transparent data-[toggle-state=on]:bg-primary data-[toggle-state=on]:text-primary-foreground data-[toggle-state=on]:shadow data-[toggle-state=on]:hover:bg-primary/90",
				outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
			rounding: {
				md: "rounded-md",
				full: "rounded-full",
				zero: "rounded-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounding: "md",
		},
	},
);

const NAME = "Toggle";

type ToggleElement = React.ComponentRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface ToggleProps extends PrimitiveButtonProps, VariantProps<typeof toggleVariants> {
	/**
	 * The controlled state of the toggle.
	 */
	pressed?: boolean;
	/**
	 * The state of the toggle when initially rendered. Use `defaultPressed`
	 * if you do not need to control the state of the toggle.
	 * @defaultValue false
	 */
	defaultPressed?: boolean;
	/**
	 * The callback that fires when the state of the toggle changes.
	 */
	onPressedChange?(this: void, pressed: boolean): void;
}

const Toggle = React.forwardRef<ToggleElement, React.PropsWithoutRef<ToggleProps>>((props, ref) => {
	const { pressed: pressedProp, defaultPressed = false, onPressedChange, className, variant, rounding, size, ...buttonProps } = props;

	const [pressed = false, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed,
	});
	return (
		<Button
			type="button"
			aria-pressed={pressed}
			data-toggle-state={pressed ? "on" : "off"}
			data-disabled={props.disabled ? "" : undefined}
			{...buttonProps}
			ref={ref}
			variant="blank"
			rounding="zero"
			className={cn(toggleVariants({ variant, size, rounding, className }))}
			onClick={composeEventHandlers(props.onClick, () => {
				if (!props.disabled) {
					setPressed(!pressed);
				}
			})}
		/>
	);
});

Toggle.displayName = NAME;

export { Toggle, toggleVariants };
