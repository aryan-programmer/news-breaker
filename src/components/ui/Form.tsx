"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext, UseFormReturn } from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import { ControlGroup, ControlGroupItem } from "./ControlGroup";
import { Input } from "./Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

const Form = FormProvider;

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
}

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={className} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

const FormItemCustom = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { name: string }>(
	({ className, name, ...props }, ref) => {
		const id = React.useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<FormFieldContext.Provider value={{ name }}>
					<div ref={ref} className={cn("space-y-2", className)} {...props} />
				</FormFieldContext.Provider>
			</FormItemContext.Provider>
		);
	},
);
FormItemCustom.displayName = "FormItemCustom";

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
	({ className, ...props }, ref) => {
		const { error, formItemId } = useFormField();

		return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
	},
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return <p ref={ref} id={formDescriptionId} className={cn("text-[0.8rem] text-muted-foreground", className)} {...props} />;
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p ref={ref} id={formMessageId} className={cn("text-[0.8rem] font-medium text-destructive", className)} {...props}>
			{body}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

export const units = ["px", "%", "-", "unset"] as const satisfies string[];
export type Unit = "px" | "%" | "-" | "unset";

export function splitUnits(v: string | number | undefined | null): [number, Unit] {
	if (v == null) return [0, "unset"];
	if (typeof v === "number") return [v, "-"];
	const match = v.match(/^(\d+(?:\.\d+)?)\s?([a-zA-Z\%]*)?$/);
	if (match == null) return [0, "unset"];
	if (match[2] != null && units.includes(match[2])) {
		return [+match[1], match[2] as Unit];
	} else {
		return [+match[1], "-"];
	}
}
export function joinNumberAndUnit([v, unit]: [number, Unit]): string | number | undefined {
	if (unit === "unset") return undefined;
	if (unit === "-") return v;
	return v + unit;
}

export function UnitFieldEditor<
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined,
	TValueFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TUnitFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	form,
	valueField,
	unitField,
	label,
}: {
	form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
	label: string;
	valueField: TValueFieldName;
	unitField: TUnitFieldName;
}) {
	const unit = form.watch(unitField);
	return (
		<FormField
			control={form.control}
			name={valueField}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<ControlGroup>
						<ControlGroupItem>
							<Input
								placeholder={label}
								{...field}
								onChange={(e) => field.onChange(parseInt(e.target.value))}
								disabled={unit === "unset"}
								type="number"
							/>
						</ControlGroupItem>
						<FormField
							control={form.control}
							name={unitField}
							render={({ field }) => (
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<ControlGroupItem>
										<FormControl>
											<SelectTrigger className="h-auto -me-0 rounded-e-full w-min">
												<SelectValue placeholder="Select..." />
											</SelectTrigger>
										</FormControl>
									</ControlGroupItem>
									<SelectContent>
										{units.map((k) => (
											<SelectItem key={k} value={k}>
												{k}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</ControlGroup>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export { Form, FormControl, FormDescription, FormField, FormItem, FormItemCustom, FormLabel, FormMessage, useFormField };
