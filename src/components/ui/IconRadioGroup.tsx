"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckCircle } from "lucide-react";
import * as React from "react";

const ButtonGroup = React.forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn("flex gap-2", className)} {...props} ref={ref} />;
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Item>,
	{
		icon: React.ReactNode;
		label: string;
	} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, icon, label, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"bg-transparent basis-0 flex-grow flex-shrink border text-center rounded-md hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow data-[state=checked]:hover:bg-primary/90",
				className,
			)}
			{...props}>
			<RadioGroupPrimitive.RadioGroupIndicator className="relative">
				<div className="relative">
					<div className="absolute -ml-[5px] -mt-[5px] ">
						<CheckCircle className="text-white mix-blend-difference" width={15} height={15} />
					</div>
				</div>
			</RadioGroupPrimitive.RadioGroupIndicator>

			<div className="flex flex-col justify-center">
				<div className="self-center">{icon}</div>
				<div className="text-sm pt-2">{label}</div>
			</div>
		</RadioGroupPrimitive.Item>
	);
});
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGroup, ButtonGroupItem };
