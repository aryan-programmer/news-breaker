import { Button } from "@/components/ui/Button";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useStoreAsIs } from "@/hooks/useStore";
import { colorValidator, forwardFnDropAsync } from "@/lib/utils";
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
				className="absolute top-0 left-0 w-full h-full border-indigo-400 border-2 flex flex-col items-stretch justify-stretch"
				style={element.textSectionBgColor == null || element.textSectionBgColor === "" ? {} : { backgroundColor: element.textSectionBgColor }}>
				<div className="p-1 w-100">{children as any}</div>
				<div className="max-w-full max-h-full min-h-0 min-w-0 flex grow items-center justify-center">
					{/* eslint-disable-next-line @next/next/no-img-element*/}
					<img src={element.mainImageUrl} alt="" className="max-w-full max-h-full aspect-auto object-scale-down" />
				</div>
				{element.logoImageUrl == null || element.logoImageUrl === "" ? null : (
					/* eslint-disable-next-line @next/next/no-img-element*/
					<img src={element.logoImageUrl} alt="" className="aspect-auto max-h-14 mb-1 mr-1 absolute bottom-0 right-0" />
				)}
			</div>
		</div>
	);
}

const formSchema = z.object({
	mainImageUrl: z.string().nonempty().url("Enter a valid URL"),
	logoImageUrl: z.string().url("Enter a valid URL or keep it blank"),
	bgColor: z.string().refine(colorValidator, "Enter a valid color or keep it blank"),
});

export function FrontPageWithTextSidebarSettings({
	element,
	editor,
	at,
}: Omit<FrontPageWithTextProps, "children"> & { editor: CustomEditor; at: Location }): React.ReactNode {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mainImageUrl: element.mainImageUrl,
			logoImageUrl: element.logoImageUrl ?? "",
			bgColor: element.textSectionBgColor ?? "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		Transforms.setNodes<FrontPageWithTextElement>(
			editor,
			{
				mainImageUrl: values.mainImageUrl,
				logoImageUrl: values.logoImageUrl,
				textSectionBgColor: values.bgColor,
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
					name="logoImageUrl"
					render={({ field }) => (
						<FormItem>
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
								<ColorPicker {...field} />
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
