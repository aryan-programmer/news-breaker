import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useStoreAsIs } from "@/hooks/useStore";
import { randomAddress } from "@/lib/uniq-address";
import { forwardFnDropAsync } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Location, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { z } from "zod";
import { useElementSettingsSidebarStore } from "../elements/ElementSettingsSidebar";
import { CustomEditor, ImageElement, RenderElementAttributesProp } from "../types";

export type EditableImageProps = {
	attributes: RenderElementAttributesProp;
	element: ImageElement;
	children: unknown;
};

export function insertImage(editor: CustomEditor, url: string) {
	const image: ImageElement = { type: "image", srcUrl: url, children: [{ text: "" }], id: randomAddress() };
	Transforms.insertNodes(editor, image);
	Transforms.insertNodes(editor, {
		id: randomAddress(),
		type: "paragraph",
		children: [{ text: "" }],
	});
}

export default function EditableImage({ attributes, element, children }: EditableImageProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);
	const select = useCallback(() => {
		if (settingsSidebarStore == null) return;
		if (settingsSidebarStore.data?.id !== element.id) {
			settingsSidebarStore.setData({
				name: "Image",
				element: <EditableImageSidebarSettings attributes={attributes} element={element} editor={editor} at={path} />,
				id: element.id,
			});
		}
	}, [settingsSidebarStore, element, attributes, editor, path]);
	return (
		<div {...attributes}>
			<div className="h-0 text-transparent outline-0 outline-none absolute w-0" style={{ fontSize: 0 }}>
				{children as any}
			</div>
			<div contentEditable={false} className="w-full">
				{/* eslint-disable-next-line @next/next/no-img-element*/}
				<img
					alt=""
					src={element.srcUrl}
					className="block max-w-full max-h-none shadow-none data-[selected=on]:drop-shadow-lg data-[selected=on]:shadow-foreground"
					onClick={select}
					data-selected={settingsSidebarStore?.data?.id === element.id ? "on" : "off"}
				/>
			</div>
		</div>
	);
}

const formSchema = z.object({
	url: z.string().url("Enter a valid URL"),
	//align: z.string().nonempty().refine(isAlignType, "Enter a valid alignment"),
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
			//align: element.align ?? "left",
		},
	});

	const onRemove = useCallback(() => Transforms.removeNodes(editor, { at }), [editor, at]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		Transforms.setNodes<ImageElement>(
			editor,
			{
				srcUrl: values.url,
				//align: values.align
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
				{/* <FormField
					control={form.control}
					name="align"
					render={({ field: { onChange, ...field } }) => (
						<FormItem>
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
				/> */}
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
