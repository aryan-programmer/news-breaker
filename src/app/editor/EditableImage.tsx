import React, { useCallback } from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { CustomEditor, ImageElement, RenderElementAttributesProp } from "./types";
import { Transforms, Location } from "slate";
import { useElementSettingsSidebarStore } from "./ElementSettingsSidebar";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { nonAsyncForwardingFn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { randomAddress } from "@/lib/uniq-address";

export type EditableImageProps = {
	attributes: RenderElementAttributesProp;
	element: ImageElement;
	children: unknown;
};

export function insertImage(editor: CustomEditor, url: string) {
	const image: ImageElement = { type: "image", srcUrl: url, children: [{ text: "" }], id: randomAddress() };
	Transforms.insertNodes(editor, image);
	Transforms.insertNodes(editor, {
		type: "paragraph",
		children: [{ text: "" }],
	});
}

export default function EditableImage({ attributes, element, children }: EditableImageProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useElementSettingsSidebarStore()();
	const select = useCallback(() => {
		if (settingsSidebarStore.data?.id !== element.id) {
			console.log("Focused & Selected");
			settingsSidebarStore.setData({
				name: "Image",
				element: <EditableImageSidebarSettings attributes={attributes} element={element} editor={editor} at={path} />,
				id: element.id,
			});
		}
	}, [settingsSidebarStore, element, attributes, editor, path]);
	return (
		<div {...attributes}>
			<div className="h-0 text-transparent outline-0 outline-none absolute">{children as any}</div>
			<div contentEditable={false} className="relative">
				{/* eslint-disable-next-line @next/next/no-img-element*/}
				<img
					alt=""
					src={element.srcUrl}
					className="block max-w-full max-h-60 shadow-none data-[selected=on]:drop-shadow-lg data-[selected=on]:shadow-foreground"
					onClick={select}
					data-selected={settingsSidebarStore.data?.id === element.id ? "on" : "off"}
				/>
			</div>
		</div>
	);
}

const formSchema = z.object({
	url: z.string().url("Enter a valid URL"),
});

function EditableImageSidebarSettings({
	element,
	editor,
	at,
}: Omit<EditableImageProps, "children"> & { editor: CustomEditor; at: Location }): React.ReactNode {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: element.srcUrl,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("Clicked");
		Transforms.setNodes<ImageElement>(editor, { srcUrl: values.url }, { at });
	}
	return (
		<Form {...form}>
			<form onSubmit={nonAsyncForwardingFn(form.handleSubmit(onSubmit))} className="pb-4 px-2">
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL of image to display</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com/image.png" {...field} type="url" />
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
