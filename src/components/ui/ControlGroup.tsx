import { Primitive } from "@radix-ui/react-primitive";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

const ControlGroupContext = React.createContext<Pick<ControlGroupProps, "orientation">>({
	orientation: "horizontal",
});

function useControlGroupContext() {
	const context = React.useContext(ControlGroupContext);

	if (!context) {
		throw new Error("useControlGroup must be used within a <ControlGroup />");
	}

	return context;
}

export interface ControlGroupProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
	orientation?: "horizontal" | "vertical";
}

export const ControlGroup = React.forwardRef<React.ComponentRef<typeof Primitive.div>, ControlGroupProps>(
	({ className, orientation = "horizontal", ...props }, ref) => (
		<ControlGroupContext.Provider value={{ orientation }}>
			<Primitive.div
				ref={ref}
				data-orientation={orientation}
				className={cn("flex", orientation === "vertical" && "flex-col", className)}
				{...props}
			/>
		</ControlGroupContext.Provider>
	),
);
ControlGroup.displayName = "ControlGroup";

export const ControlGroupItem = React.forwardRef<React.ComponentRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
	({ className, ...props }, ref) => {
		const { orientation } = useControlGroupContext();

		return (
			<Slot
				ref={ref}
				className={cn(
					"rounded-none focus-within:z-10",
					orientation === "horizontal" && "-me-px h-auto first:rounded-s-full last:-me-0 last:rounded-e-full",
					orientation === "vertical" &&
						"w-auto [margin-block-end:-1px] first:rounded-se-full first:rounded-ss-full last:rounded-ee-full last:rounded-es-full last:[margin-block-end:0]",
					className,
				)}
				{...props}
			/>
		);
	},
);
ControlGroupItem.displayName = "ControlGroupItem";
