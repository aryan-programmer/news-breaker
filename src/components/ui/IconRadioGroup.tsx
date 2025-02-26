"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CheckCircle } from "lucide-react";
import * as React from "react";

const ButtonGroup = React.forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn("flex gap-5", className)} {...props} ref={ref} />;
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
				"border data-[state=checked]:bg-background text-center h-[125px] w-[125px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}>
			<RadioGroupPrimitive.RadioGroupIndicator className="relative">
				<div className="relative">
					<div className="absolute -ml-2 -mt-[30px] ">
						<CheckCircle className="text-primary" />
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
