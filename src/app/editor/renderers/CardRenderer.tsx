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
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/IconRadioGroup";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useStoreAsIs } from "@/hooks/useStore";
import { randomAddress } from "@/lib/uniq-address";
import {
	anchorXToJustifyContentClass,
	anchorYToAlignItemsClass,
	colorValidator,
	coreceEmptyOrTransparentToUndef,
	coreceEmptyToUndef,
	forwardFnDropAsync,
	isNonNullAndNonEmpty,
	prefixUrlWithSiteNameIfNecessary,
} from "@/lib/utils";
import { faAlignCenter, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { MouseEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Location, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { z } from "zod";
import { insertNodeSpecial } from "../editor-utils";
import { ElementSettingsSidebarStore, useElementSettingsSidebarStore } from "../elements/ElementSettingsSidebar";
import { CardElement, CustomEditor, RenderElementAttributesProp } from "../types";

const cardImageLayoutPosToFlexDirectionClass = {
	top: "flex-col",
	bottom: "flex-col-reverse",
	left: "flex-row",
	right: "flex-row-reverse",
	back: "",
};

export function insertCard(editor: CustomEditor, settingsSidebarStore: ElementSettingsSidebarStore | null | undefined) {
	const elem: CardElement = {
		id: randomAddress(),
		type: "card",
		borderAroundImage: true,
		bgColor: "#fff",
		shadowColor: "#000",
		borderColor: "#ddd",
		layoutImagePos: "top",
		imageSizeAndPosition: {},
		children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] }],
	};
	insertNodeSpecial(editor, elem, settingsSidebarStore);
}

export type CardRendererProps = {
	attributes: RenderElementAttributesProp;
	element: CardElement;
	children: unknown;
};

export function CardRenderer({ attributes, children, element }: CardRendererProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);
	const select = useCallback(
		(ev: MouseEvent) => {
			ev.stopPropagation();
			if (settingsSidebarStore == null) return;
			if (settingsSidebarStore.data?.element?.id !== element.id) {
				settingsSidebarStore.setData({
					name: "Card",
					sidebarContent: <CardSidebarSettings attributes={attributes} element={element} editor={editor} at={path} />,
					element,
					path,
				});
			} else {
				settingsSidebarStore.updateElementData(element);
			}
		},
		[settingsSidebarStore, element, attributes, editor, path],
	);
	return (
		<div className="w-full h-full p-1 shadow-none">
			<div
				className="w-full h-full p-1 shadow-none data-[selected=on]:border-[3px] data-[selected=on]:border-dotted data-[selected=on]:border-pink-500 data-[selected=on]:drop-shadow-lg data-[selected=on]:shadow-foreground"
				onClick={select}
				data-selected={settingsSidebarStore?.data?.element?.id === element.id ? "on" : undefined}>
				<div
					className={`w-full h-full rounded-xl ${isNonNullAndNonEmpty(element.shadowColor) ? "pb-1" : ""}`}
					style={{ backgroundColor: coreceEmptyToUndef(element.shadowColor) }}>
					<div
						className={`rounded-xl border border-solid relative w-full h-full flex items-stretch ${
							cardImageLayoutPosToFlexDirectionClass[element.layoutImagePos]
						}`}
						style={{
							backgroundColor: coreceEmptyToUndef(element.bgColor),
							borderColor: coreceEmptyToUndef(element.borderColor),
							// boxShadow: isNonNullAndNonEmpty(element.shadowColor)
							// 	? `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, ${element.shadowColor} 4px 4px 0px 0px`
							// 	: undefined,
						}}>
						{isNonNullAndNonEmpty(element.imageUrl) ? (
							<div
								className={`rounded-xl max-w-full max-h-full min-h-0 min-w-0 flex grow shrink ${anchorXToJustifyContentClass(
									element.imageSizeAndPosition?.anchorX,
								)} ${anchorYToAlignItemsClass(element.imageSizeAndPosition?.anchorY)}`}
								style={{
									borderColor: coreceEmptyToUndef(element.borderColor),
								}}>
								{/* eslint-disable-next-line @next/next/no-img-element*/}
								<img
									src={element.imageUrl}
									style={{
										width: element.imageWidth,
									}}
									alt=""
									className={`rounded-xl max-w-full max-h-full ${
										element.imageSizeAndPosition?.stretch === true ? "w-full h-full" : "aspect-auto object-scale-down"
									} ${
										element.layoutImagePos === "back"
											? "absolute bottom-0 top-0 right-0 left-0 "
											: element.borderAroundImage === true && isNonNullAndNonEmpty(element.borderColor)
											? "m-1 border border-solid p-1"
											: ""
									}`}
								/>
							</div>
						) : null}
						<div className="p-2 flex-basis-0 grow z-10" {...attributes}>
							{children as any}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const CardLayoutImagePosOpts = [
	["top", "Top"],
	["bottom", "Bottom"],
	["left", "Left"],
	["right", "Right"],
	["back", "Background"],
] as const;

const formSchema = z.object({
	imageUrl: z.string().url("Enter a valid URL or keep it blank"),
	bgColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	borderColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	shadowColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	borderAroundImage: z.boolean(),
	stretch: z.boolean(),
	anchorX: z.enum(["left", "center", "right"]),
	anchorY: z.enum(["top", "center", "bottom"]),
	layoutImagePos: z.enum(CardLayoutImagePosOpts.map((v) => v[0]) as ["top", "bottom", "left", "right", "back"]),
	imageWidth: z.number({ invalid_type_error: "Enter a valid value for Image Width" }).min(0, { message: "Image Width can not be less than 0" }),
	// .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	imageWidthUnit: z.enum(units, { invalid_type_error: "Enter a valid unit for Image Width" }),
});

export function CardSidebarSettings({
	element,
	editor,
	at,
}: Omit<CardRendererProps, "children"> & { editor: CustomEditor; at: Location }): React.ReactNode {
	const defaultImageWidth = splitUnits(element.imageWidth);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			imageUrl: prefixUrlWithSiteNameIfNecessary(element.imageUrl) ?? "",
			bgColor: element.bgColor ?? undefined,
			borderColor: element.borderColor ?? undefined,
			shadowColor: element.shadowColor ?? undefined,
			borderAroundImage: element.borderAroundImage ?? true,
			stretch: element.imageSizeAndPosition?.stretch ?? false,
			anchorX: element.imageSizeAndPosition?.anchorX ?? "center",
			anchorY: element.imageSizeAndPosition?.anchorY ?? "center",
			layoutImagePos: element.layoutImagePos,
			imageWidth: defaultImageWidth[0],
			imageWidthUnit: defaultImageWidth[1],
		},
	});

	const stretch = form.watch("stretch");
	const layoutImagePos = form.watch("layoutImagePos");

	function onSubmit(values: z.infer<typeof formSchema>) {
		Transforms.setNodes<CardElement>(
			editor,
			{
				imageUrl: coreceEmptyToUndef(values.imageUrl),
				bgColor: coreceEmptyOrTransparentToUndef(values.bgColor),
				borderColor: coreceEmptyOrTransparentToUndef(values.borderColor),
				shadowColor: coreceEmptyOrTransparentToUndef(values.shadowColor),
				borderAroundImage: values.borderAroundImage,
				layoutImagePos: values.layoutImagePos,
				imageSizeAndPosition: values.stretch
					? { stretch: true }
					: {
							stretch: false,
							anchorX: values.anchorX ?? "center",
							anchorY: values.anchorY ?? "center",
					  },
				imageWidth: joinNumberAndUnit([values.imageWidth, values.imageWidthUnit]),
			},
			{ at },
		);
	}
	console.log(form.getFieldState("imageWidth"));
	return (
		<Form {...form}>
			<form onSubmit={forwardFnDropAsync(form.handleSubmit(onSubmit))} className="pb-4 px-2">
				<FormField
					control={form.control}
					name="layoutImagePos"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image Position in Layout</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{CardLayoutImagePosOpts.map(([k, v]) => (
										<SelectItem key={k} value={k}>
											{v}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image URL</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com/image.png" {...field} type="url" />
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<UnitFieldEditor form={form} valueField="imageWidth" unitField="imageWidthUnit" label="Image Width" />

				{layoutImagePos === "back" ? null : (
					<>
						<FormField
							control={form.control}
							name="borderAroundImage"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Show border around image?</FormLabel>
									</div>
								</FormItem>
							)}
						/>
					</>
				)}

				<FormField
					control={form.control}
					name="stretch"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Stretch image</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				{stretch ? null : (
					<>
						<FormField
							control={form.control}
							name="anchorX"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
									<FormControl>
										<ButtonGroup className="w-full mt-3" value={field.value} onValueChange={field.onChange}>
											<ButtonGroupItem value="left" label="Left" icon={<FontAwesomeIcon icon={faAlignLeft} />} />
											<ButtonGroupItem value="center" label="Center" icon={<FontAwesomeIcon icon={faAlignCenter} />} />
											<ButtonGroupItem value="right" label="Right" icon={<FontAwesomeIcon icon={faAlignRight} />} />
										</ButtonGroup>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="anchorY"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
									<FormControl>
										<ButtonGroup className="w-full mt-3" value={field.value} onValueChange={field.onChange}>
											<ButtonGroupItem value="top" label="Top" icon={<FontAwesomeIcon icon={faAlignLeft} transform={{ rotate: 90 }} />} />
											<ButtonGroupItem value="center" label="Center" icon={<FontAwesomeIcon icon={faAlignCenter} transform={{ rotate: 90 }} />} />
											<ButtonGroupItem value="bottom" label="Bottom" icon={<FontAwesomeIcon icon={faAlignRight} transform={{ rotate: 90 }} />} />
										</ButtonGroup>
									</FormControl>
								</FormItem>
							)}
						/>
					</>
				)}
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
				<Button className="mt-2" type="submit">
					Apply
				</Button>
			</form>
		</Form>
	);
}
