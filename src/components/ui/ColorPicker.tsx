"use client";

import type { ButtonProps } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn, isNonNullAndNonEmpty } from "@/lib/utils";
import { css } from "@emotion/css";
import { forwardRef, useMemo, useState } from "react";
import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	useAlpha?: boolean;
}

const styles = css`
	& .react-colorful__last-control {
		border-radius: 0;
	}
`;

const ColorPicker = forwardRef<HTMLInputElement, Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps>(
	({ disabled, value, onChange, onBlur, name, className, useAlpha, ...props }, forwardedRef) => {
		const [open, setOpen] = useState(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
		const parsedValue = useMemo(() => (isNonNullAndNonEmpty(value) ? value : useAlpha === true ? "#FFFFFFFF" : "#FFFFFF"), [value]);

		const PickerComponent = useAlpha === true ? HexAlphaColorPicker : HexColorPicker;

		return (
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
					<Button
						{...props}
						className={cn("block", className)}
						name={name}
						onClick={() => {
							setOpen(true);
						}}
						size="icon"
						style={{
							backgroundColor: parsedValue,
						}}
						variant="outline">
						<div className="p-[10px]" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<PickerComponent className={`!w-full !rounded-t-md ${styles}`} color={parsedValue} onChange={onChange} />
					<Input
						className="!rounded-t-none !rounded-b-md"
						maxLength={7}
						onChange={(e) => {
							onChange(e?.currentTarget?.value);
						}}
						ref={forwardedRef}
						value={parsedValue}
					/>
				</PopoverContent>
			</Popover>
		);
	},
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
