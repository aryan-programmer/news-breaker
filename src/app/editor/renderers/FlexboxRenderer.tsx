import { ControlGroup, ControlGroupItem } from "@/components/ui/ControlGroup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useStoreAsIs } from "@/hooks/useStore";
import { randomAddress } from "@/lib/uniq-address";
import { forwardFnDropAsync } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { MouseEvent, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Location, Node, Path, Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { z } from "zod";
import { useEditorStore } from "../editor-data-store";
import { ElementSettingsSidebarStore, useElementSettingsSidebarStore } from "../elements/ElementSettingsSidebar";
import {
	CustomEditor,
	FlexboxAlignContent,
	FlexboxAlignItems,
	FlexboxAlignSelf,
	FlexboxElement,
	FlexboxFlexDirection,
	FlexboxFlexWrap,
	FlexboxJustifyContent,
	RenderElementAttributesProp,
} from "../types";
import {
	isFlexboxAlignContent,
	isFlexboxAlignItems,
	isFlexboxAlignSelf,
	isFlexboxFlexDirection,
	isFlexboxFlexWrap,
	isFlexboxJustifyContent,
} from "../types.guard";

export function insertFlexbox(editor: CustomEditor, settingsSidebarStore: ElementSettingsSidebarStore | null | undefined) {
	const elem: FlexboxElement = {
		id: randomAddress(),
		type: "flexbox",
		children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] }],
	};
	const selectionData = settingsSidebarStore?.data;
	console.log(selectionData);
	if (selectionData != null && selectionData.element.type === "flexbox") {
		Transforms.insertNodes(editor, elem, { at: Path.next(selectionData.path) });
	} else {
		Transforms.insertNodes(editor, [
			elem,
			{
				id: randomAddress(),
				type: "paragraph",
				children: [{ text: "" }],
			},
		]);
	}
}

export type FlexboxRendererProps = {
	attributes: RenderElementAttributesProp;
	element: FlexboxElement;
	children: unknown;
};

export function FlexboxRenderer({ attributes, element, children }: FlexboxRendererProps) {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);
	const settingsSidebarStore = useStoreAsIs(useElementSettingsSidebarStore);
	const enableSelfProps = useMemo(() => {
		const v = Node.parent(editor, path);
		return "type" in v && v.type === "flexbox";
	}, [editor, path]);
	const select = useCallback(
		(ev: MouseEvent) => {
			ev.stopPropagation();
			if (settingsSidebarStore == null) return;
			if (settingsSidebarStore.data?.element?.id !== element.id) {
				settingsSidebarStore.setData({
					name: "Flexbox",
					sidebarContent: (
						<FlexboxSidebarSettings attributes={attributes} element={element} editor={editor} at={path} enableSelfProps={enableSelfProps} />
					),
					element,
					path,
				});
			} else {
				settingsSidebarStore.updateElementData(element);
			}
		},
		[settingsSidebarStore, element, attributes, editor, path, enableSelfProps],
	);
	const editorStore = useEditorStore();
	const style: React.CSSProperties = useMemo(
		() => ({
			alignContent: element.alignContent,
			alignItems: element.alignItems,
			flexDirection: element.flexDirection,
			flexWrap: element.flexWrap,
			justifyContent: element.justifyContent,
			width: element.width,
			height: element.height,
			...(enableSelfProps
				? {
						alignSelf: element.alignSelf,
						flexGrow: element.flexGrow,
						flexShrink: element.flexShrink,
						flexBasis: element.flexBasis,
				  }
				: {}),
			...(editorStore.isFlexboxVisiblityOn
				? {
						minHeight: "100px",
						padding: "10px",
						margin: "5px",
						backgroundColor: "#afa",
						border: "3px dashed #44f",
				  }
				: {
						padding: "unset",
						margin: "0px",
				  }),
			...(settingsSidebarStore?.data?.element?.id === element.id
				? editorStore.isFlexboxVisiblityOn
					? {
							border: "3px solid #f4f",
					  }
					: {
							outline: "1px solid #f4f",
					  }
				: {}),
		}),
		[
			editorStore.isFlexboxVisiblityOn,
			element.alignContent,
			element.alignItems,
			element.alignSelf,
			element.flexBasis,
			element.flexDirection,
			element.flexGrow,
			element.flexShrink,
			element.flexWrap,
			element.height,
			element.id,
			element.justifyContent,
			element.width,
			enableSelfProps,
			settingsSidebarStore?.data?.element?.id,
		],
	);
	return (
		<div
			style={style}
			onClick={select}
			className="flex shadow-none data-[selected=on]:drop-shadow-lg data-[selected=on]:shadow-foreground"
			data-selected={settingsSidebarStore?.data?.element?.id === element.id ? "on" : undefined}
			{...attributes}>
			{children as any}
		</div>
	);
}

const FlexboxAlignContentOptions: [FlexboxAlignContent | "undef", string][] = [
	["undef", "Default"],
	["flex-start", "Start"],
	["flex-end", "End"],
	["center", "Center"],
	["stretch", "Stretch"],
	["space-between", "Space Between"],
	["space-around", "Space Around"],
	["space-evenly", "Space Evenly"],
];
const FlexboxAlignItemsOptions: [FlexboxAlignItems | "undef", string][] = [
	["undef", "Default"],
	["flex-start", "Start"],
	["flex-end", "End"],
	["center", "Center"],
	["stretch", "Stretch"],
	["baseline", "Baseline"],
];
const FlexboxAlignSelfOptions: [FlexboxAlignSelf | "undef", string][] = [
	["undef", "Default"],
	["auto", "Auto"],
	["flex-start", "Start"],
	["flex-end", "End"],
	["center", "Center"],
	["stretch", "Stretch"],
	["baseline", "Baseline"],
];
const FlexboxFlexDirectionOptions: [FlexboxFlexDirection | "undef", string][] = [
	["undef", "Default"],
	["row", "Row"],
	["row-reverse", "Row Reverse"],
	["column", "Column"],
	["column-reverse", "Column Reverse"],
];
const FlexboxFlexWrapOptions: [FlexboxFlexWrap | "undef", string][] = [
	["undef", "Default"],
	["nowrap", "No wrap"],
	["wrap", "Wrap"],
	["wrap-reverse", "Wrap Reverse"],
];
const FlexboxJustifyContentOptions: [FlexboxJustifyContent | "undef", string][] = [
	["undef", "Default"],
	["flex-start", "Start"],
	["flex-end", "End"],
	["center", "Center"],
	["space-between", "Space Between"],
	["space-around", "Space Around"],
	["space-evenly", "Space Evenly"],
];

const units = ["px", "%", "-", "unset"] as const satisfies string[];
type Unit = "px" | "%" | "-" | "unset";

const FormSchema = z.object({
	alignContent: z.enum(FlexboxAlignContentOptions.map((x) => x[0]) as [string, ...string[]], { invalid_type_error: "Enter a valid AlignContent" }),
	alignItems: z.enum(FlexboxAlignItemsOptions.map((x) => x[0]) as [string, ...string[]], { invalid_type_error: "Enter a valid AlignItems" }),
	alignSelf: z.enum(FlexboxAlignSelfOptions.map((x) => x[0]) as [string, ...string[]], { invalid_type_error: "Enter a valid AlignSelf" }),
	flexDirection: z.enum(FlexboxFlexDirectionOptions.map((x) => x[0]) as [string, ...string[]], { invalid_type_error: "Enter a valid FlexDirection" }),
	flexWrap: z.enum(FlexboxFlexWrapOptions.map((x) => x[0]) as [string, ...string[]], { invalid_type_error: "Enter a valid FlexWrap" }),
	justifyContent: z.enum(FlexboxJustifyContentOptions.map((x) => x[0]) as [string, ...string[]], {
		invalid_type_error: "Enter a valid JustifyContent",
	}),
	flexGrow: z
		.number({ invalid_type_error: "Enter a valid value for flexGrow" })
		.min(0, { message: "flexGrow can not be less than 0" })
		.refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	flexShrink: z
		.number({ invalid_type_error: "Enter a valid value for flexShrink" })
		.min(0, { message: "flexShrink can not be less than 0" })
		.refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	flexBasis: z
		.number({ invalid_type_error: "Enter a valid value for flexBasis" })
		.min(0, { message: "flexBasis can not be less than 0" })
		.refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	flexBasisUnit: z.enum(units, { invalid_type_error: "Enter a valid unit for flexBasis" }),
	width: z
		.number({ invalid_type_error: "Enter a valid value for width" })
		.min(0, { message: "width can not be less than 0" })
		.refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	widthUnit: z.enum(units, { invalid_type_error: "Enter a valid unit for width" }),
	height: z
		.number({ invalid_type_error: "Enter a valid value for height" })
		.min(0, { message: "height can not be less than 0" })
		.refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
	heightUnit: z.enum(units, { invalid_type_error: "Enter a valid unit for height" }),
});

function splitUnits(v: string | number | undefined): [number, Unit] {
	if (v === undefined) return [0, "unset"];
	if (typeof v === "number") return [v, "-"];
	const match = v.match(/^(\d+(?:\.\d+)?)\s?([a-zA-Z\%]*)?$/);
	if (match == null) return [0, "unset"];
	if (match[2] != null && units.includes(match[2])) {
		return [+match[1], match[2] as Unit];
	} else {
		return [+match[1], "-"];
	}
}
function joinNumberAndUnit([v, unit]: [number, Unit]): string | number | undefined {
	if (unit === "unset") return undefined;
	if (unit === "-") return v;
	return v + unit;
}

export function FlexboxSidebarSettings({
	element,
	editor,
	at,
	enableSelfProps,
}: Omit<FlexboxRendererProps, "children"> & { editor: CustomEditor; at: Location; enableSelfProps: boolean }): React.ReactNode {
	const defaultFlexBasis = splitUnits(element.flexBasis);
	const defaultWidth = splitUnits(element.width);
	const defaultHeight = splitUnits(element.height);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			alignContent: element.alignContent ?? "undef",
			alignItems: element.alignItems ?? "undef",
			alignSelf: element.alignSelf ?? "undef",
			flexDirection: element.flexDirection ?? "undef",
			flexWrap: element.flexWrap ?? "undef",
			justifyContent: element.justifyContent ?? "undef",
			flexGrow: element.flexGrow ?? 0,
			flexShrink: element.flexShrink ?? 1,
			flexBasis: defaultFlexBasis[0],
			flexBasisUnit: defaultFlexBasis[1],
			width: defaultWidth[0],
			widthUnit: defaultWidth[1],
			height: defaultHeight[0],
			heightUnit: defaultHeight[1],
		},
	});

	const {
		alignContent,
		alignItems,
		alignSelf,
		flexDirection,
		flexWrap,
		justifyContent,
		flexBasisUnit,
		widthUnit,
		heightUnit,
		width,
		height,
		flexGrow,
		flexShrink,
		flexBasis,
	} = form.watch();

	useEffect(() => {
		Transforms.setNodes<FlexboxElement>(
			editor,
			{
				alignContent: isFlexboxAlignContent(alignContent) ? alignContent : undefined,
				alignItems: isFlexboxAlignItems(alignItems) ? alignItems : undefined,
				flexDirection: isFlexboxFlexDirection(flexDirection) ? flexDirection : undefined,
				flexWrap: isFlexboxFlexWrap(flexWrap) ? flexWrap : undefined,
				justifyContent: isFlexboxJustifyContent(justifyContent) ? justifyContent : undefined,
				width: joinNumberAndUnit([width, widthUnit]),
				height: joinNumberAndUnit([height, heightUnit]),
				...(enableSelfProps
					? {
							alignSelf: isFlexboxAlignSelf(alignSelf) ? alignSelf : undefined,
							flexGrow: flexGrow,
							flexBasis: joinNumberAndUnit([flexBasis, flexBasisUnit]),
							flexShrink: flexShrink,
					  }
					: {
							alignSelf: undefined,
							flexGrow: undefined,
							flexBasis: undefined,
							flexShrink: undefined,
					  }),
			},
			{ at },
		);
	}, [
		alignContent,
		alignItems,
		alignSelf,
		at,
		editor,
		enableSelfProps,
		flexBasis,
		flexBasisUnit,
		flexDirection,
		flexGrow,
		flexShrink,
		flexWrap,
		height,
		heightUnit,
		justifyContent,
		width,
		widthUnit,
	]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		Transforms.setNodes<FlexboxElement>(
			editor,
			{
				alignContent: isFlexboxAlignContent(data.alignContent) ? data.alignContent : undefined,
				alignItems: isFlexboxAlignItems(data.alignItems) ? data.alignItems : undefined,
				flexDirection: isFlexboxFlexDirection(data.flexDirection) ? data.flexDirection : undefined,
				flexWrap: isFlexboxFlexWrap(data.flexWrap) ? data.flexWrap : undefined,
				justifyContent: isFlexboxJustifyContent(data.justifyContent) ? data.justifyContent : undefined,
				width: joinNumberAndUnit([data.width, data.widthUnit]),
				height: joinNumberAndUnit([data.height, data.heightUnit]),
				...(enableSelfProps
					? {
							alignSelf: isFlexboxAlignSelf(data.alignSelf) ? data.alignSelf : undefined,
							flexGrow: data.flexGrow,
							flexBasis: joinNumberAndUnit([data.flexBasis, data.flexBasisUnit]),
							flexShrink: data.flexShrink,
					  }
					: {
							alignSelf: undefined,
							flexGrow: undefined,
							flexBasis: undefined,
							flexShrink: undefined,
					  }),
			},
			{ at },
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={forwardFnDropAsync(form.handleSubmit(onSubmit))} className="pb-4 px-2 space-y-1">
				<FormField
					control={form.control}
					name="flexDirection"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flex Direction</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{FlexboxFlexDirectionOptions.map(([k, v]) => (
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
					name="alignItems"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Align Items</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{FlexboxAlignItemsOptions.map(([k, v]) => (
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
					name="justifyContent"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Justify Content</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{FlexboxJustifyContentOptions.map(([k, v]) => (
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
					name="flexWrap"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flex Wrap</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{FlexboxFlexWrapOptions.map(([k, v]) => (
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
					name="width"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Width</FormLabel>
							<ControlGroup>
								<ControlGroupItem>
									<Input placeholder="Width" {...field} disabled={widthUnit === "unset"} />
								</ControlGroupItem>
								<FormField
									control={form.control}
									name="widthUnit"
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

				<FormField
					control={form.control}
					name="height"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Height</FormLabel>
							<ControlGroup>
								<ControlGroupItem>
									<Input placeholder="Height" {...field} disabled={heightUnit === "unset"} />
								</ControlGroupItem>
								<FormField
									control={form.control}
									name="heightUnit"
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

				<FormField
					control={form.control}
					name="alignContent"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Align Content</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{FlexboxAlignContentOptions.map(([k, v]) => (
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

				{enableSelfProps ? (
					<>
						<FormField
							control={form.control}
							name="alignSelf"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Align Self</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select..." />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{FlexboxAlignSelfOptions.map(([k, v]) => (
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
							name="flexBasis"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Flex Basis</FormLabel>
									<ControlGroup>
										<ControlGroupItem>
											<Input placeholder="Flex Basis" {...field} disabled={flexBasisUnit === "unset"} />
										</ControlGroupItem>
										<FormField
											control={form.control}
											name="flexBasisUnit"
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
						<FormField
							control={form.control}
							name="flexGrow"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Flex Grow</FormLabel>
									<FormControl>
										<Input placeholder="Flex Grow" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="flexShrink"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Flex Shrink</FormLabel>
									<FormControl>
										<Input placeholder="Flex Shrink" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				) : null}
			</form>
		</Form>
	);
}
