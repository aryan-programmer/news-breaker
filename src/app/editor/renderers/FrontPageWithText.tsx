import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/IconRadioGroup";
import { Input } from "@/components/ui/Input";
import { useStoreAsIs } from "@/hooks/useStore";
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
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Location, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { z } from "zod";
import { useElementSettingsSidebarStore } from "../elements/ElementSettingsSidebar";
import { CustomEditor, FrontPageWithTextElement, RenderElementAttributesProp } from "../types";

export type FrontPageWithTextProps = {
	attributes: RenderElementAttributesProp;
	element: FrontPageWithTextElement;
	children: unknown;
};

export function FrontPageWithText({ attributes, children, element }: FrontPageWithTextProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);
	const select = useCallback(() => {
		if (settingsSidebarStore == null) return;
		if (settingsSidebarStore.data?.element?.id !== element.id) {
			settingsSidebarStore.setData({
				name: "Front Page",
				sidebarContent: <FrontPageWithTextSidebarSettings attributes={attributes} element={element} editor={editor} at={path} />,
				element,
				path,
			});
		} else {
			settingsSidebarStore.updateElementData(element);
		}
	}, [settingsSidebarStore, element, attributes, editor, path]);
	return (
		<div className="aspect-a4 max-w-xl mx-auto h-auto flex items-start content-start relative" onClick={select}>
			<div
				className="absolute top-0 left-0 w-full h-full border-indigo-400 border-2 flex flex-col items-stretch justify-stretch  p-1"
				style={element.textSectionBgColor == null || element.textSectionBgColor === "" ? {} : { backgroundColor: element.textSectionBgColor }}>
				<div className="p-1 w-full z-10" {...attributes}>
					{children as any}
				</div>
				{isNonNullAndNonEmpty(element.mainImageUrl) ? (
					<div
						className={`max-w-full max-h-full min-h-0 min-w-0 flex grow ${anchorXToJustifyContentClass(
							element.mainImageSizeAndPosition?.anchorX,
						)} ${anchorYToAlignItemsClass(element.mainImageSizeAndPosition?.anchorY)}
						${element.useMainImageAsBg === true ? "absolute bottom-0 top-0 right-0 left-0" : ""}`}>
						{/* eslint-disable-next-line @next/next/no-img-element*/}
						<img
							src={element.mainImageUrl}
							alt=""
							className={`max-w-full max-h-full ${
								element.mainImageSizeAndPosition?.stretch === true ? "w-full h-full" : "aspect-auto object-scale-down"
							}`}
						/>
					</div>
				) : null}
				{isNonNullAndNonEmpty(element.logoImageUrl) ? (
					/* eslint-disable-next-line @next/next/no-img-element*/
					<img src={element.logoImageUrl} alt="" className="aspect-auto max-h-14 mb-1 mr-1 absolute bottom-0 right-0" />
				) : null}
			</div>
		</div>
	);
}

const formSchema = z.object({
	mainImageUrl: z.string().nonempty().url("Enter a valid URL"),
	logoImageUrl: z.string().url("Enter a valid URL or keep it blank"),
	bgColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
	useMainImageAsBg: z.boolean(),
	stretch: z.boolean(),
	anchorX: z.enum(["left", "center", "right"]),
	anchorY: z.enum(["top", "center", "bottom"]),
});

export function FrontPageWithTextSidebarSettings({
	element,
	editor,
	at,
}: Omit<FrontPageWithTextProps, "children"> & { editor: CustomEditor; at: Location }): React.ReactNode {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mainImageUrl: prefixUrlWithSiteNameIfNecessary(element.mainImageUrl) ?? "",
			logoImageUrl: prefixUrlWithSiteNameIfNecessary(element.logoImageUrl) ?? "",
			bgColor: element.textSectionBgColor ?? "",
			useMainImageAsBg: element.useMainImageAsBg ?? false,
			stretch: element.mainImageSizeAndPosition?.stretch ?? false,
			anchorX: element.mainImageSizeAndPosition?.anchorX ?? "center",
			anchorY: element.mainImageSizeAndPosition?.anchorY ?? "center",
		},
	});

	const stretch = form.watch("stretch");

	function onSubmit(values: z.infer<typeof formSchema>) {
		Transforms.setNodes<FrontPageWithTextElement>(
			editor,
			{
				mainImageUrl: values.mainImageUrl,
				logoImageUrl: coreceEmptyToUndef(values.logoImageUrl),
				textSectionBgColor: coreceEmptyOrTransparentToUndef(values.bgColor),
				useMainImageAsBg: values.useMainImageAsBg,
				mainImageSizeAndPosition: values.stretch
					? { stretch: true }
					: {
							stretch: false,
							anchorX: values.anchorX ?? "center",
							anchorY: values.anchorY ?? "center",
					  },
			},
			{ at },
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={forwardFnDropAsync(form.handleSubmit(onSubmit))} className="pb-4 px-2">
				<FormField
					control={form.control}
					name="mainImageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Main Image</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com/image.png" {...field} type="url" />
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="useMainImageAsBg"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Use the main image as the background</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="stretch"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-1">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Stretch main image</FormLabel>
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
					name="logoImageUrl"
					render={({ field }) => (
						<FormItem className="mt-1">
							<FormLabel>Logo Image</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com/image.png" {...field} type="url" />
							</FormControl>
							<FormMessage className="w-100" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bgColor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Background Color</FormLabel>
							<FormControl>
								<ColorPicker {...field} useAlpha />
							</FormControl>
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
