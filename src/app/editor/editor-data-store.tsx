"use client";
import { randomAddress } from "@/lib/uniq-address";
import { DEMO_IMAGE_URL } from "@/lib/utils";
import _ from "lodash";
import { Descendant } from "slate";
import { create } from "zustand";
import { recursiveTraverse } from "./editor-utils";
import { generateDefaultSectionBreakElement } from "./renderers/SectionBreak";

export function get_demo_editor_value(): Descendant[] {
	return [
		{
			type: "front-page-with-text",
			mainImageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/View_inside_detector_at_the_CMS_cavern_LHC_CERN.jpg", //"https://upload.wikimedia.org/wikipedia/commons/0/06/LHC_quadrupole_magnets.jpg",
			logoImageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/2244px-Wikipedia-logo-v2.svg.png",
			children: [
				{ id: randomAddress(), type: "heading-1", children: [{ text: "Heading 1 lorem ipsum dolor sit amet", italic: true, color: "#fff" }] },
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Heading 2", code: true }] },
			],
			textSectionBgColor: "#f99",
			id: randomAddress(),
			useMainImageAsBg: true,
			mainImageSizeAndPosition: {
				anchorY: "top",
				anchorX: "left",
			},
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
		{ type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 },
		generateDefaultSectionBreakElement("lower", false),
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
				{ text: "and much more ", italic: true, bold: true, underline: true, code: true },
				{ text: "like, ", color: "#f33" },
				{ text: "turn ", color: "#3d3" },
				{ text: "it ", color: "#33f" },
				{ text: "very ", color: "#3dd" },
				{ text: "color", color: "#f3f" },
				{ text: "ful", color: "#dd3" },
				{
					text: ", or add a semantically rendered block quote in the middle of the page, like this:",
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
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "several elements",
							italic: true,
							bold: true,
							underline: true,
							code: true,
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "numbered-list",
			children: [
				{ id: randomAddress(), type: "list-item", children: [{ text: "And add" }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "a ordered list of", bold: true }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "elements,", italic: true, bold: true, underline: true, code: true }] },
				{
					id: randomAddress(),
					type: "list-item",
					align: "justify",
					children: [
						{
							text: "like so: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis eget lectus nec sagittis. Donec et venenatis nisi. Proin tempor feugiat diam ac suscipit. Cras fringilla justo quis elementum imperdiet. Proin aliquet purus purus, quis ultrices urna elementum sed. Mauris gravida id purus at congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula purus, vestibulum eget dui vel, bibendum posuere leo. Ut posuere nunc eget turpis convallis pretium. Vestibulum mollis tempor est at posuere. Vestibulum iaculis sapien ac tincidunt consectetur. Aliquam ornare ante id enim ultrices vehicula. Quisque gravida eros ut rhoncus lacinia. ",
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "page-break",
			children: [{ text: "" }],
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
		{
			id: randomAddress(),
			type: "flexbox",
			alignItems: "center",
			children: [
				{
					id: randomAddress(),
					type: "flexbox",
					flexBasis: 0,
					flexGrow: 1,
					children: [
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "The Standard Model: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis eget lectus nec sagittis. Donec et venenatis nisi. Proin tempor feugiat diam ac suscipit. Cras fringilla justo quis elementum imperdiet. Proin aliquet purus purus, quis ultrices urna elementum sed. Mauris gravida id purus at congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula purus, vestibulum eget dui vel, bibendum posuere leo. Ut posuere nunc eget turpis convallis pretium. Vestibulum mollis tempor est at posuere. Vestibulum iaculis sapien ac tincidunt consectetur. Aliquam ornare ante id enim ultrices vehicula. Quisque gravida eros ut rhoncus lacinia.",
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "flexbox",
					alignSelf: "center",
					alignItems: "center",
					flexDirection: "row",
					flexBasis: 0,
					flexGrow: 2,
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl: DEMO_IMAGE_URL,
							borderAroundImage: true,
							bgColor: "#fff",
							shadowColor: "#000",
							borderColor: "#ddd",
							layoutImagePos: "top",
							imageSizeAndPosition: {},
							children: [
								{ id: randomAddress(), type: "heading-3", children: [{ text: "The Standard Model" }] },
								{
									id: randomAddress(),
									type: "paragraph",
									children: [
										{
											text: "The Standard Model of particle physics is the theory describing three of the four known fundamental forces in the universe and classifying all known elementary particles.",
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "page-break",
			children: [{ text: "" }],
		},
		{
			id: randomAddress(),
			type: "card",
			imageUrl: DEMO_IMAGE_URL,
			borderAroundImage: false,
			bgColor: "#ffa",
			shadowColor: "#aaf",
			borderColor: "#000",
			layoutImagePos: "right",
			imageSizeAndPosition: {},
			children: [
				{ id: randomAddress(), type: "heading-3", children: [{ text: "The Standard Model" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "Interactions in the Standard Model",
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "card",
			imageUrl: DEMO_IMAGE_URL,
			borderAroundImage: true,
			bgColor: "#fff",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "left",
			imageSizeAndPosition: {},
			children: [
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "It was developed in stages throughout the latter half of the 20th century.",
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "page-break",
			children: [{ text: "" }],
		},
		{
			id: randomAddress(),
			type: "flexbox",
			justifyContent: "center",
			alignItems: "stretch",
			flexDirection: "row",
			children: [
				{
					id: randomAddress(),
					type: "flexbox",
					alignSelf: "center",
					alignItems: "center",
					flexDirection: "row",
					flexBasis: 0,
					flexGrow: 1,
					flexShrink: 1,
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/LHC_quadrupole_magnets.jpg",
							borderAroundImage: false,
							bgColor: "#faf",
							shadowColor: "#afa",
							borderColor: "#ddd",
							layoutImagePos: "top",
							imageSizeAndPosition: {},
							children: [
								{ id: randomAddress(), type: "heading-3", children: [{ text: "Interactions in the Standard Model" }] },
								{
									id: randomAddress(),
									type: "paragraph",
									children: [
										{
											text: "All Feynman diagrams in the model are built from combinations of these vertices. q is any quark, g is a gluon, X is any charged particle, γ is a photon, f is any fermion, m is any particle with mass (with the possible exception of the neutrinos), mB is any boson with mass.",
										},
									],
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "flexbox",
					alignSelf: "center",
					alignItems: "center",
					flexDirection: "row",
					flexBasis: 0,
					flexGrow: 1,
					flexShrink: 1,
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl: DEMO_IMAGE_URL,
							borderAroundImage: true,
							bgColor: "#00000000",
							shadowColor: "#00000000",
							borderColor: "#00000000",
							layoutImagePos: "bottom",
							imageSizeAndPosition: {},
							children: [
								{ id: randomAddress(), type: "heading-3", children: [{ text: "The Standard Model" }] },
								{
									id: randomAddress(),
									type: "paragraph",
									children: [
										{
											text: "It was developed in stages throughout the latter half of the 20th century, through the work of many scientists worldwide, with the current formulation being finalized in the mid-1970s upon experimental confirmation of the existence of quarks. ",
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "flexbox",
			justifyContent: "center",
			alignItems: "stretch",
			flexDirection: "row",
			children: [
				{
					id: randomAddress(),
					type: "flexbox",
					alignItems: "stretch",
					alignSelf: "stretch",
					height: "100%",
					flexDirection: "row",
					flexBasis: 0,
					flexGrow: 1,
					flexShrink: 1,
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/LHC_quadrupole_magnets.jpg",
							borderAroundImage: true,
							bgColor: "#aff",
							shadowColor: "#faa",
							borderColor: "#000",
							layoutImagePos: "back",
							imageSizeAndPosition: { stretch: true },
							children: [
								{
									id: randomAddress(),
									type: "paragraph",
									children: [
										{
											text: "In diagrams with multiple particle labels separated by '/', one particle label is chosen. In diagrams with particle labels separated by '|', the labels must be chosen in the same order. For example, in the four boson electroweak case the valid diagrams are WWWW, WWZZ, WWγγ, WWZγ. The conjugate of each listed vertex (reversing the direction of arrows) is also allowed.",
											color: "#fff",
										},
									],
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "flexbox",
					alignItems: "stretch",
					alignSelf: "stretch",
					flexDirection: "row",
					flexBasis: 0,
					flexGrow: 1,
					flexShrink: 1,
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl:
								"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Weinberg_angle_%28relation_between_coupling_constants%29.svg/2560px-Weinberg_angle_%28relation_between_coupling_constants%29.svg.png",
							borderAroundImage: false,
							bgColor: "#00000000",
							shadowColor: "#00000000",
							borderColor: "#000",
							layoutImagePos: "back",
							imageSizeAndPosition: {},
							children: [
								{
									id: randomAddress(),
									type: "paragraph",
									children: [
										{
											text: "Weinberg's weak mixing angle θW, and relation between coupling constants g, g′, and e.",
										},
									],
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
			align: "center",
			children: [{ text: "Try it out for yourself!" }],
		},
		generateDefaultSectionBreakElement("upper-roman", true),
		{ id: randomAddress(), type: "heading-1", children: [{ text: "What is Lorem Ipsum?" }] },
		{
			id: randomAddress(),
			type: "card",
			borderAroundImage: false,
			bgColor: "#ffa",
			shadowColor: "#aaf",
			borderColor: "#000",
			layoutImagePos: "right",
			imageSizeAndPosition: {},
			children: [
				{
					id: randomAddress(),
					type: "paragraph",
					align: "justify",
					children: [
						{
							text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Why do we use it?" }] },
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				},
			],
		},
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Where does it come from?" }] },
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
				},
			],
		},
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Where can I get some?" }] },
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
				},
			],
		},
		{ id: randomAddress(), type: "heading-3", children: [{ text: "See below: 5 paragraphs, 484 words, 3345 bytes of Lorem Ipsum" }] },
		{
			id: randomAddress(),
			type: "paragraph",
			align: "left",
			children: [
				{
					text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis eget lectus nec sagittis. Donec et venenatis nisi. Proin tempor feugiat diam ac suscipit. Cras fringilla justo quis elementum imperdiet. Proin aliquet purus purus, quis ultrices urna elementum sed. Mauris gravida id purus at congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula purus, vestibulum eget dui vel, bibendum posuere leo. Ut posuere nunc eget turpis convallis pretium. Vestibulum mollis tempor est at posuere. Vestibulum iaculis sapien ac tincidunt consectetur. Aliquam ornare ante id enim ultrices vehicula. Quisque gravida eros ut rhoncus lacinia. ",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "center",
			children: [
				{
					text: "Aliquam velit leo, venenatis ut magna sed, mattis tempus nisi. Suspendisse feugiat nulla at ligula consequat feugiat. Sed in vestibulum lacus, ut tincidunt sem. Aliquam libero quam, volutpat sed justo et, ultrices eleifend ipsum. Morbi vitae pharetra mauris. Maecenas ullamcorper, sem at condimentum accumsan, velit lectus efficitur tortor, pretium eleifend justo tellus non ipsum. Morbi lacinia ex non lectus consectetur, sit amet pulvinar tellus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo, sem vel aliquam pellentesque, est risus mattis nunc, sit amet aliquam nisl eros quis purus. In venenatis eget felis non consectetur. Duis vehicula finibus nisl in malesuada. Quisque nec aliquet nisl. Nam non augue id tortor dignissim malesuada. Integer sed maximus augue. ",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "right",
			children: [
				{
					text: "Suspendisse sit amet ante egestas, molestie nisl in, lobortis odio. Donec vitae fringilla eros. Suspendisse lorem massa, gravida eget augue a, ultrices rhoncus lacus. Suspendisse potenti. In vehicula, ante id venenatis egestas, nisi lorem auctor turpis, quis lobortis diam augue id purus. Praesent mauris dolor, egestas vitae ex nec, mollis fermentum felis. Nulla rhoncus sed lorem ac euismod. Nunc mattis gravida ante, quis volutpat nulla. Duis eu ullamcorper tortor, eu vestibulum nisi. Aliquam non eleifend arcu. Pellentesque tincidunt, nisi non tristique porttitor, justo ante imperdiet risus, ut posuere ipsum purus nec lectus. Quisque erat justo, tristique eget tortor et, semper tristique sapien. ",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: "Pellentesque laoreet, mi a dignissim pretium, felis tellus rhoncus massa, condimentum laoreet dolor sem nec odio. Donec finibus interdum nunc, eu vehicula leo rhoncus fringilla. Nullam vel elit consequat, suscipit ex eget, pretium felis. In condimentum enim et justo molestie mattis. Proin porta eros quis elit malesuada, vitae hendrerit mauris volutpat. Suspendisse ultricies bibendum iaculis. Vivamus pharetra pharetra justo, in malesuada mi efficitur sit amet. Nullam ut quam at nisi volutpat gravida. Sed euismod sapien quis finibus blandit. In non erat ante. Cras sollicitudin pulvinar laoreet. ",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			align: "justify",
			children: [
				{
					text: "Morbi pretium diam sed sapien iaculis suscipit. Nunc dictum justo eu risus euismod posuere. Nunc volutpat malesuada porttitor. Sed blandit odio nunc, cursus gravida risus malesuada at. Pellentesque tristique dui magna, quis condimentum nisl maximus vel. Maecenas dictum sem sed iaculis elementum. Duis blandit, nulla non pharetra laoreet, elit erat mollis leo, pulvinar tincidunt metus mi et neque. In hac habitasse platea dictumst. Nullam malesuada nisi eu quam vestibulum tincidunt. Sed lectus ligula, viverra eget neque eu, imperdiet interdum est. Mauris interdum sollicitudin volutpat. ",
				},
			],
		},
	];
}

/** @see {isTableCellPercentageWidthsRecord} ts-auto-guard:type-guard */
export type TableCellPercentageWidthsRecord = Readonly<Record<string, string>>;

export function pruneTableCellPercentageWidths(nodesTree: Descendant[], data: TableCellPercentageWidthsRecord): TableCellPercentageWidthsRecord {
	const ids = recursiveTraverse(nodesTree);
	return _.pickBy(data, (_, key) => ids.has(key));
}

export type EditorStore = {
	tableCellPercentageWidths: TableCellPercentageWidthsRecord;
	setTableCellPercentageWidth(tableCellId: string, value: string): void;
	overwriteTableCellPercentageWidths(tableCellPercentageWidths: TableCellPercentageWidthsRecord): void;
	children: Descendant[];
	setChildren(data: Descendant[]): void;
	isFlexboxVisiblityOn: boolean;
	setIsFlexboxVisiblityOn(isFlexboxVisiblityOn: boolean): void;
};

export const useEditorStore = create<EditorStore>()(
	// persist<EditorStore>(
	(set, get) => ({
		isFlexboxVisiblityOn: true,
		children: get_demo_editor_value(),
		tableCellPercentageWidths: {},
		setChildren(value: Descendant[]) {
			set({ children: value });
		},
		setTableCellPercentageWidth(tableCellId: string, value: string) {
			if (get().tableCellPercentageWidths[tableCellId] !== value) {
				set({ tableCellPercentageWidths: { ...get().tableCellPercentageWidths, [tableCellId]: value } });
			}
		},
		overwriteTableCellPercentageWidths(tableCellPercentageWidths: TableCellPercentageWidthsRecord) {
			set({ tableCellPercentageWidths });
		},
		setIsFlexboxVisiblityOn(isFlexboxVisiblityOn) {
			set({ isFlexboxVisiblityOn });
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
