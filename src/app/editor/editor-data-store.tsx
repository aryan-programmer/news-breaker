"use client";
import { getAddress, randomAddress } from "@/lib/uniq-address";
import { DEMO_IMAGE_URL } from "@/lib/utils";
import _ from "lodash";
import { Descendant } from "slate";
import { create } from "zustand";
import { generateDefaultSectionBreakElement } from "./renderers/SectionBreak";

export function get_demo_editor_value(): Descendant[] {
	return [
		{
			type: "front-page-with-text",
			mainImageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/LHC_quadrupole_magnets.jpg",
			logoImageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png",
			children: [
				{ id: randomAddress(), type: "heading-1", children: [{ text: "Heading 1", italic: true }] },
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Heading 2", code: true }] },
			],
			textSectionBgColor: "#f99",
			id: randomAddress(),
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
		{ type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 },
		generateDefaultSectionBreakElement(),
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Actual content starts here", underline: true }] },
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Heading 2 " }, { text: "again", italic: true }] },
		{ id: randomAddress(), type: "heading-3", children: [{ text: "Heading 3" }] },
		{
			id: randomAddress(),
			type: "table",
			children: [
				{
					id: randomAddress(),
					type: "table-head",
					children: [
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [{ id: randomAddress(), type: "heading-3", children: [{ text: "Time" }] }],
								},
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [{ id: randomAddress(), type: "heading-3", children: [{ text: "🎨 Frontend team" }] }],
								},
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [{ id: randomAddress(), type: "table-cell-content", children: [{ text: "Data row" }] }],
								},
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [{ id: randomAddress(), type: "heading-3", children: [{ text: "👷 Backend team " }] }],
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "table-body",
					children: [
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "9:00 AM", bold: true }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									colSpan: 3,
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Opening Keynote 🎉" }] }],
										},
									],
								},
							],
						},
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "10:30 AM", bold: true }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Introduction to 🅰️ngular" }] }],
										},
									],
									colSpan: 2,
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Introduction to Gradle and Java 11 ☕" }] }],
								},
							],
						},
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "10:30 AM", bold: true }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Strictly typed forms in v14" }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Advanced Gradle and Java 11 ☕" }] }],
										},
									],
									colSpan: 2,
								},
							],
						},
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "1:00 PM", bold: true }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									colSpan: 3,
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Lunch Break", underline: true }, { text: " 🍱" }] }],
										},
									],
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "table-footer",
					children: [
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Time" }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Frontend team" }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "table-cell-content", children: [{ text: "New Cell" }] }],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Backend team" }] }],
								},
							],
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{ text: "This is editable " },
				{ text: "rich", bold: true },
				{ text: " text, " },
				{ text: "much", italic: true },
				{ text: " better than a " },
				{ text: "<textarea>", code: true },
				{ text: "!" },
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: "Since it's rich text, you can do things like turn a selection of text ",
				},
				{ text: "bold, ", bold: true },
				{ text: "italic, ", italic: true },
				{ text: "justify it, ", bold: true },
				{ text: "and much more", italic: true, bold: true, underline: true, code: true },
				{
					text: " , or add a semantically rendered block quote in the middle of the page, like this:",
				},
			],
		},
		{
			id: randomAddress(),
			type: "block-quote",
			children: [{ text: "A wise quote." }],
		},
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{ id: randomAddress(), type: "list-item", children: [{ text: "Or, add" }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "an unordered list of", bold: true }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "several elements", italic: true, bold: true, underline: true, code: true }] },
			],
		},
		{
			id: randomAddress(),
			type: "numbered-list",
			children: [
				{ id: randomAddress(), type: "list-item", children: [{ text: "And add" }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "a ordered list of", bold: true }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "elements,", italic: true, bold: true, underline: true, code: true }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "like so" }] },
			],
		},
		{
			type: "image",
			srcUrl: DEMO_IMAGE_URL,
			children: [{ text: "" }],
			id: randomAddress(),
			align: "center",
		},
		{
			id: randomAddress(),
			type: "page-break",
			children: [{ text: "" }],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "center",
			children: [{ text: "Try it out for yourself!" }],
		},
	];
}

/** @see {isTableCellPercentageWidthsRecord} ts-auto-guard:type-guard */
export type TableCellPercentageWidthsRecord = Readonly<Record<string, string>>;

export function pruneTableCellPercentageWidths(nodesTree: Descendant[], data: TableCellPercentageWidthsRecord): TableCellPercentageWidthsRecord {
	const ids = new Set<string>();
	const q = [...nodesTree];
	while (q.length > 0) {
		const last = q.pop();
		if (last == null) continue;
		const id = "id" in last ? last.id : getAddress(last);
		if (ids.has(id)) continue;
		ids.add(id);
		if ("children" in last) {
			q.push(...last.children);
		}
	}
	return _.pickBy(data, (_, key) => ids.has(key));
}

export type EditorStore = {
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
	setTableCellPercentageWidth(tableCellId: string, value: string): void;
	overwriteTableCellPercentageWidths(tableCellPercentageWidths: TableCellPercentageWidthsRecord): void;
	children: Descendant[];
	setChildren(data: Descendant[]): void;
};

export const useEditorStore = create<EditorStore>()(
	// persist<EditorStore>(
	(set, get) => ({
		children: get_demo_editor_value(),
		tableCellPercentageWidths: {},
		setChildren(value: Descendant[]) {
			// console.log("setChildren");
			set({ children: value });
		},
		setTableCellPercentageWidth(tableCellId: string, value: string) {
			// console.log("setTableCellPercentageWidth");
			if (get().tableCellPercentageWidths[tableCellId] !== value) {
				set({ tableCellPercentageWidths: { ...get().tableCellPercentageWidths, [tableCellId]: value } });
			}
		},
		overwriteTableCellPercentageWidths(tableCellPercentageWidths: TableCellPercentageWidthsRecord) {
			set({ tableCellPercentageWidths });
		},
	}),
	// 	{
	// 		name: "editor-data-store",
	// 		storage: createJSONStorage(() => localStorage),
	// 		merge(persistedState, currentState) {
	// 			console.log(persistedState);
	// 			if (persistedState == null || typeof persistedState !== "object" || !("children" in persistedState)) return currentState;
	// 			const newState = persistedState as { children: Descendant[] };
	// 			// const newValue = _.mergeWith(currentState.children, newState.value, (objValue: any, srcValue: any): any => {
	// 			// 	if (_.isArray(objValue)) {
	// 			// 		return srcValue;
	// 			// 	}
	// 			// });
	// 			return { ...currentState, children: newState.children };
	// 		},
	// 		onRehydrateStorage: (state) => {
	// 			console.log("hydration starts");

	// 			// optional
	// 			return (state, error) => {
	// 				if (error) {
	// 					console.log("an error happened during hydration", error);
	// 				} else {
	// 					console.log("hydration finished");
	// 				}
	// 			};
	// 		},
	// 	},
	// ),
);
