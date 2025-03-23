import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColorPicker } from "@/components/ui/ColorPicker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	joinNumberAndUnit,
	splitUnits,
	UnitFieldEditor,
	units,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useStoreAsIs } from "@/hooks/useStore";
import { randomAddress } from "@/lib/uniq-address";
import {
	colorValidator,
	coreceEmptyOrTransparentToUndef,
	coreceEmptyToUndef,
	forwardFnDropAsync,
	isNonNullAndNonEmpty,
	prefixUrlWithSiteNameIfNecessary,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { MouseEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Location, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { z } from "zod";
import { insertNodeSpecial } from "../editor-utils";
import { ElementSettingsSidebarStore, useElementSettingsSidebarStore } from "../elements/ElementSettingsSidebar";
import { CustomEditor, ImageElement, RenderElementAttributesProp } from "../types";
import { isAlignType } from "../types.guard";

export type EditableImageProps = {
	attributes: RenderElementAttributesProp;
	element: ImageElement;
	children: unknown;
};

export function insertImage(editor: CustomEditor, url: string, settingsSidebarStore: ElementSettingsSidebarStore | null | undefined) {
	const image: ImageElement = { type: "image", srcUrl: url, children: [{ text: "" }], id: randomAddress() };
	insertNodeSpecial(editor, image, settingsSidebarStore);
}

export default function EditableImage({ attributes, element, children }: EditableImageProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);
	const select = useCallback(
		(ev: MouseEvent) => {
			ev.stopPropagation();
			if (settingsSidebarStore == null) return;
			if (settingsSidebarStore.data?.element?.id !== element.id) {
				settingsSidebarStore.setData({
					name: "Image",
					sidebarContent: <EditableImageSidebarSettings attributes={attributes} element={element} editor={editor} at={path} />,
					path,
					element,
				});
			} else {
				settingsSidebarStore.updateElementData(element);
			}
		},
		[settingsSidebarStore, element, attributes, editor, path],
	);
	return (
		<div {...attributes} className="px-1">
			<div className="h-0 text-transparent outline-0 outline-none absolute w-0" style={{ fontSize: 0 }}>
				{children as any}
			</div>
			<div
				contentEditable={false}
				className={`w-full h-full flex flex-row ${element.rounded ? "rounded-xl" : ""} ${isNonNullAndNonEmpty(element.shadowColor) ? "pb-1" : ""}`}
				style={{
					backgroundColor: coreceEmptyToUndef(element.shadowColor),
					justifyContent: element.align ?? "center",
				}}>
				{/* eslint-disable-next-line @next/next/no-img-element*/}
				<img
					alt=""
					src={element.srcUrl}
					className={`block max-w-full max-h-full ${element.rounded ? "rounded-xl" : ""} ${
						isNonNullAndNonEmpty(element.bgColor) ? "p-1" : ""
					} shadow-none data-[selected=on]:drop-shadow-lg data-[selected=on]:shadow-foreground`}
					style={{
						backgroundColor: coreceEmptyToUndef(element.bgColor),
						borderColor: coreceEmptyToUndef(element.borderColor),
						width: element.width ?? undefined,
					}}
					onClick={select}
					data-selected={settingsSidebarStore?.data?.element?.id === element.id ? "on" : "off"}
				/>
			</div>
		</div>
	);
}

const formSchema = z.object({
	url: z.string().url("Enter a valid URL"),
	width: z.number({ invalid_type_error: "Enter a valid value for width" }).min(0, { message: "width can not be less than 0" }),
	// .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	widthUnit: z.enum(units, { invalid_type_error: "Enter a valid unit for width" }),
	align: z.string().nonempty().refine(isAlignType, "Enter a valid alignment"),
	bgColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	borderColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	shadowColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	rounded: z.boolean(),
});

function EditableImageSidebarSettings({
	element,
	editor,
	at,
}: Omit<EditableImageProps, "children"> & { editor: CustomEditor; at: Location }): React.ReactNode {
	const defaultWidth = splitUnits(element.width);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: prefixUrlWithSiteNameIfNecessary(element.srcUrl),
			width: defaultWidth[0],
			widthUnit: defaultWidth[1],
			align: element.align ?? "left",
			bgColor: element.bgColor ?? undefined,
			borderColor: element.borderColor ?? undefined,
			shadowColor: element.shadowColor ?? undefined,
			rounded: element.rounded ?? false,
		},
	});

	const onRemove = useCallback(() => Transforms.removeNodes(editor, { at }), [editor, at]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		Transforms.setNodes<ImageElement>(
			editor,
			{
				srcUrl: values.url,
				width: joinNumberAndUnit([values.width, values.widthUnit]),
				align: values.align,
				bgColor: coreceEmptyOrTransparentToUndef(values.bgColor),
				borderColor: coreceEmptyOrTransparentToUndef(values.borderColor),
				shadowColor: coreceEmptyOrTransparentToUndef(values.shadowColor),
				rounded: values.rounded,
			},
			{ at },
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={forwardFnDropAsync(form.handleSubmit(onSubmit))} className="pb-4 px-2 flex flex-col items-center">
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>URL of image to display</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com/image.png" {...field} type="url" />
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<UnitFieldEditor form={form} label="Width" valueField="width" unitField="widthUnit" />
				<FormField
					control={form.control}
					name="align"
					render={({ field: { onChange, ...field } }) => (
						<FormItem className="w-full">
							<FormLabel>Alignment</FormLabel>
							<FormControl>
								<Select {...field} onValueChange={onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select alignment" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="left">Left</SelectItem>
										<SelectItem value="center">Center</SelectItem>
										<SelectItem value="right">Right</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rounded"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Rounded borders?</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bgColor"
					render={({ field }) => (
						<FormItem>
							<div className="grid grid-cols-2 place-content-center mb-2 mt-2">
								<div className="h-min self-center justify-self-end">
									<FormLabel className="mr-1">Background Color</FormLabel>
								</div>
								<div>
									<FormControl>
										<ColorPicker {...field} useAlpha />
									</FormControl>
								</div>
							</div>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="borderColor"
					render={({ field }) => (
						<FormItem>
							<div className="grid grid-cols-2 mb-2">
								<div className="h-min self-center justify-self-end">
									<FormLabel className="mr-1">Border Color</FormLabel>
								</div>
								<div>
									<FormControl>
										<ColorPicker {...field} useAlpha />
									</FormControl>
								</div>
							</div>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="shadowColor"
					render={({ field }) => (
						<FormItem>
							<div className="grid grid-cols-2 place-content-center">
								<div className="h-min self-center justify-self-end">
									<FormLabel className="mr-1">Shadow Color</FormLabel>
								</div>
								<div>
									<FormControl>
										<ColorPicker {...field} useAlpha />
									</FormControl>
								</div>
							</div>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<Button className="mt-2 mb-12 mx-auto" type="submit">
					Apply
				</Button>
				<br />
				<Button className="mx-auto" variant="destructive" onClick={onRemove} type="button">
					Remove Image
				</Button>
			</form>
		</Form>
	);
}
