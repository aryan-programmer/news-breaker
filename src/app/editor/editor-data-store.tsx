"use client";
import { randomAddress } from "@/lib/uniq-address";
import _ from "lodash";
import { Descendant } from "slate";
import { create } from "zustand";
import { recursiveTraverse } from "./editor-utils";
import { generateSpecificSectionBreakElement } from "./renderers/SectionBreak";

export function getFullDemoEditorValue(): Descendant[] {
	return [
		{
			type: "front-page-with-text",
			mainImageUrl: "/Images/LDCE_Main.jpg",
			logoImageUrl: "/Images/LDCE_EC_Logo.png",
			children: [
				{ id: randomAddress(), type: "heading-1", align: "center", children: [{ text: "TemPermanent", code: true /*, smallCaps: true*/ }] },
				{
					id: randomAddress(),
					type: "heading-5",
					children: [{ text: "A Once-only Newsletter by L. D. College of Engineering", bold: true }],
					align: "right",
				},
				{ id: randomAddress(), type: "heading-6", children: [{ text: "1st April 2025: Amazing Breakthrough Day Edition" }] },
				{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
				{
					id: randomAddress(),
					type: "heading-5",
					children: [
						{ text: "TemPermanent", code: true /*, smallCaps: true*/ },
						{
							text: " is an LDCE pseudo-e-Newsletter, providing insights into the advancements and achievements aligned with the institute's Vision and Mission.",
						},
					],
					align: "center",
				},
				{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
				{
					id: randomAddress(),
					type: "heading-4",
					children: [
						{ text: "Investing in Future Learning: ", bold: true /*, smallCaps: true*/, color: "#f44" },
						{ text: "Generous Contribution to Smart Classrooms" /*, smallCaps: true*/, color: "#f44" },
					],
				},
				{
					id: randomAddress(),
					type: "heading-4",
					children: [
						{ text: "Triumph at Robofest 3.0: ", bold: true /*, smallCaps: true*/, color: "#0f0" },
						{ text: "Runner-up in Two-wheeled Self-balancing Robot Category" /*, smallCaps: true*/, color: "#0f0" },
					],
				},
				{
					id: randomAddress(),
					type: "heading-4",
					children: [
						{ text: "Advancing Education with Atal: ", bold: true /*, smallCaps: true*/, color: "#44f" },
						{ text: "FDP for Faculty Enhancement Garners Success" /*, smallCaps: true*/, color: "#44f" },
					],
				},
			],
			id: randomAddress(),
			useMainImageAsBg: true,
			mainImageSizeAndPosition: {
				anchorY: "bottom",
				anchorX: "left",
			},
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
		generateSpecificSectionBreakElement("lower-roman", true, {
			top: [[{ text: "" }], [{ text: "TemPermanent", code: true }], [{ text: "" }]],
			bottomNotPage: [{ text: "1st April 2025" }],
			bottomCenter: [{ text: "LDCE" }],
		}),
		{ type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 },
		generateSpecificSectionBreakElement("upper-roman", true, {
			top: [[{ text: "" }], [{ text: "TemPermanent", code: true }], [{ text: "" }]],
			bottomNotPage: [{ text: "1st April 2025" }],
			bottomCenter: [{ text: "LDCE" }],
		}),
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Editorial Staff", underline: true }] },
		{ id: randomAddress(), type: "heading-5", children: [{ text: "Editors in Chief" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{ id: randomAddress(), type: "list-item", children: [{ text: "Mr. Aryan H Chudasama" }] },
				{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. Vijay Chavda" }] },
			],
		},
		{ id: randomAddress(), type: "heading-5", children: [{ text: "Members" }] },
		{
			id: randomAddress(),
			type: "flexbox",
			fixChildrenWidthRatios: [1, 1],
			children: [
				{
					id: randomAddress(),
					type: "bulleted-list",
					children: [
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. Hetal Joshiyara" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. Gaurav Sutaria" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. S. Ramanujan" }] },
					],
				},
				{
					id: randomAddress(),
					type: "bulleted-list",
					children: [
						{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. H L Desai" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. D R Gohel" }] },
					],
				},
			],
		},
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Advisory Board", underline: true }] },
		{ id: randomAddress(), type: "heading-5", children: [{ text: "Members" }] },
		{
			id: randomAddress(),
			type: "flexbox",
			fixChildrenWidthRatios: [1, 1],
			children: [
				{
					id: randomAddress(),
					type: "bulleted-list",
					children: [
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. Gopal Tank" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. Rajendrakumar Jani" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. Manish Thakker" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. Hiteishi Diwanji" }] },
					],
				},
				{
					id: randomAddress(),
					type: "bulleted-list",
					children: [
						{ id: randomAddress(), type: "list-item", children: [{ text: "Dr. Chandulal Vithalani" }] },
						{ id: randomAddress(), type: "list-item", children: [{ text: "Prof. Gaurang Ban" }] },
					],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Vision and Mission", underline: true }] },
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Vision" }] },
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{
					text: "To contribute for sustainable development of nation through achieving excellence in technical education and research while facilitating transformation of students into responsible citizens and competent professionals.",
				},
			],
		},
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Mission" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Upgrade learning resources and pedagogical skills for effective teaching-learning process." }],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Foster research culture and strengthen networking with institutions, industries , research organization and alumni" }],
				},
				{ id: randomAddress(), type: "list-item", children: [{ text: "Encourage students for professional ethics and social responsibility" }] },
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "To impart affordable and quality education in order to meet the needs of industries and achieve excellence in teaching-learning process.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "To create a conducive research ambience that drives innovation and nurtures research-oriented scholars and outstanding professionals.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "To collaborate with other academic & research institutes as well as industries in order to strengthen education and multidisciplinary research.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "To promote equitable and harmonious growth of students, academicians, staff, society and industries, thereby becoming a center of excellence in technical education.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "To practice and encourage high standards of professional ethics, transparency and accountability." }],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Principal's Message", underline: true }] },
		{
			id: randomAddress(),
			type: "flexbox",
			flexWrap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			fixChildrenWidthRatios: [3, 4, 3],
			children: [
				{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/Principal.jpeg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "top",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Dr. Nilay N. Bhuptani,\nPrincipal" }] }],
				},
				{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
			],
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "Dear Students, Faculty and Stakeholders," }] },
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{
					text: "It is my pleasure to greet you on Amazing Breakthrough Day. I congratulate Electronics and Communication Engineering Department for releasing 5th edition of newsletter and wish you continued success.",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{
					text: "I am happy to know that during last six month, E.C. Engineering Department has done significant work for development of computing infrastructure, placement, expert talk and faculty training. Ministry of Electronics and Information Technology (MeitY) has provided Synopsis tool for UG, PG and PhD students. I would like to emphasize the effective utilization of the resources available in the department. This advanced tool is now integral to our VLSI Design, Testing, and Verification courses for our undergraduate, postgraduate and PhD students. It not only enriches the learning experience but also aligns with the latest industry standards, ensuring that our students are well-prepared for the challenges of the semiconductor field. These resources are pivotal in enhancing practical skills and fostering innovation among our students. By integrating these tools into our curriculum, we are bridging the gap between theoretical knowledge and real-world application. I encourage all students to actively participate in workshops, seminars, and training sessions designed to equip you with the necessary skills for the upcoming opportunities in this rapidly evolving sector.",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{
					text: "As we continue to strive for academic excellence, I suggest our students to find the right balance between regular curriculum studies and student club activities. While extracurricular involvement is essential for holistic development, it is equally important to maintain a strong academic foundation. Striking this balance will help you make the most of your time at the department.",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			children: [
				{
					text: "Lastly, I would like to extend congratulations to our students who have successfully secured placements. Your achievements are a testament to your hard work, dedication, and the quality of education imparted by our faculty. We are immensely proud of you and wish you continued success in your future endeavors.",
				},
			],
		},
		{
			id: randomAddress(),
			type: "paragraph",
			children: [{ text: "Let us continue to work together towards academic excellence and professional growth." }],
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "Happy Amazing Breakthrough Day" }] },
		{ id: randomAddress(), type: "paragraph", children: [{ text: "Dr. Nilay N. Bhuptani,\nPrincipal" }] },
		{ id: randomAddress(), type: "paragraph", children: [{ text: "\n\n\n\n\n\n\n" }] },
		{ id: randomAddress(), type: "block-quote", children: [{ text: "When there is a will, there is a way." }] },
		{ id: randomAddress(), type: "paragraph", align: "right", children: [{ text: " - Common English Proverb" }] },
		{ id: randomAddress(), type: "paragraph", children: [{ text: "Corollary:" }] },
		{ id: randomAddress(), type: "block-quote", children: [{ text: "When there is a will to fail, obstacles will be found." }] },
		{ id: randomAddress(), type: "paragraph", align: "right", children: [{ text: " - John McCarthy" }] },
		generateSpecificSectionBreakElement("numeric", true, {
			top: [[{ text: "" }], [{ text: "TemPermanent", code: true }], [{ text: "" }]],
			bottomNotPage: [{ text: "1st April 2025" }],
			bottomCenter: [{ text: "LDCE" }],
		}),
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Major Events", underline: true }] },
		{
			id: randomAddress(),
			type: "flexbox",
			fixChildrenWidthRatios: [1, 1],
			children: [
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/RepublicDay2025.jpg",
					borderAroundImage: true,
					bgColor: "#fff",
					shadowColor: "#000",
					borderColor: "#ddd",
					layoutImagePos: "top",
					// imageWidth: "50%",
					imageSizeAndPosition: {},
					children: [
						{ id: randomAddress(), type: "heading-2", children: [{ text: "Republic Day Celebration 2025" }] },
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "We were honored to have Shri Govind Nadkarni (Civil, ’72), an esteemed alumnus of L.D. College of Engineering, as the Guest of Honour for our Republic Day celebration on 26th January 2025 at Civil Lawn, LDCE.",
								},
							],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "Throughout his career, Shri Nadkarni earned numerous prestigious accolades, including Engineer of the Year from TSPE and the National Distinguished Services Award from NCEES. He also made history as the first Indian American appointed to the Texas Board of Professional Engineers, serving as its Chairman.",
								},
							],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "His commitment to education and community is reflected in the establishment of the Govind & Bhakti Nadkarni Charitable Trust, which funds engineering scholarships. Shri Nadkarni’s inspiring address at our event highlighted the core values of democracy, unity, and progress",
								},
							],
						},
						{ id: randomAddress(), type: "paragraph", children: [{ text: "We are deeply grateful for his presence and insights." }] },
					],
				},
				{
					id: randomAddress(),
					type: "card",
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "top",
					// imageWidth: "50%",
					imageSizeAndPosition: {},
					children: [
						{ id: randomAddress(), type: "heading-2", children: [{ text: "3rd Global Alumni Convention 4th Jan 2025" }] },
						{ id: randomAddress(), type: "paragraph", children: [{ text: "LAA hosted its 3rd Global Alumni Convention on January 4, 2025." }] },
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "The event witnessed enthusiastic participation from alumni residing both within India and abroad, fostering a spirit of camaraderie and intellectual exchange.",
								},
							],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [{ text: "Honurable Minister Shri Rushikesh Patel interacted with students and addressed the gathering." }],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "Dignitaries included Smt. Sunaina Tomar (ACS), Shri Banchhanidhi Pani (Commissioner), Shri B.N. Navalawala, Dr. Nilay Bhuptani (Principal), Shri Abhishek Jain (Film Producer), Shri Rahul Shukla (Mech. 1970), Anand Patel (President, LAA).",
								},
							],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [{ text: "The event featured departmental presentations and inspiring alumni stories." }],
						},
						{ id: randomAddress(), type: "paragraph", children: [{ text: "Shri B.N. Navalawala was presented with prestigious LD Ratna Award." }] },
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "The event culminated in a delightful gala dinner, providing a perfect opportunity for attendees to network, reminisce, and strengthen the bonds of the LDCE alumni community.",
								},
							],
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "heading-3", children: [{ text: "Global Alumni Convention: Images" }] },
		{
			id: randomAddress(),
			type: "flexbox",
			flexWrap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			fixChildrenWidthRatios: [1, 1, 1],
			children: [
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/GAC_2025_1.jpg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "top",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Caption 1" }] }],
				},
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/GAC_2025_2.jpg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "top",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Caption 2" }] }],
				},
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/GAC_2025_3.jpg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "top",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Caption 3" }] }],
				},
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/GAC_2025_4.jpg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "bottom",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Caption 4" }] }],
				},
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/GAC_2025_5.jpg",
					borderAroundImage: true,
					bgColor: "#ffa",
					shadowColor: "#aaf",
					borderColor: "#000",
					layoutImagePos: "bottom",
					imageSizeAndPosition: {},
					children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Caption 5" }] }],
				},
			],
		},
		{
			id: randomAddress(),
			type: "card",
			imageUrl: "/Images/Impulse2025.jpg",
			borderAroundImage: false,
			bgColor: "#faf",
			shadowColor: "#afa",
			borderColor: "#ddd",
			layoutImagePos: "left",
			imageSizeAndPosition: {},
			children: [
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Impulse 2025" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "Impulse-2025, the Sports Festival of LDCE, was organized by the Elite Sports Club from February 19th to March 9th, 2025. Over 3500 students from various UG and PG courses participated, demonstrating their physical fitness and team spirit across multiple sports. The Environment, IC, and EC departments secured the first, second, and third positions for the best branch, respectively. See the sports section for more details",
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Department Activities", underline: true }] },
		{
			id: randomAddress(),
			type: "card",
			bgColor: "#fff",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "top",
			children: [
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Inauguration of Cyber Force Club and Expert Session" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "The Information Technology Department inaugurated The Cyber Force Club and hosted an expert session by Mr. Jigar Raval from PRL at room no 3002, Annexe building on February 20, 2024. Around 110 students participated in the event.",
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "card",
			bgColor: "#fff",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "top",
			children: [
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Silicon Gujarat: Powering Indian’s Semiconductor Revolution" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "Department of Science and Technology, Government of Gujarat organized a 3-days Gujarat Semiconnect Conference 2025 on the theme “Silicon Gujarat: Powering Indian’s Semiconductor Revolution” from 5 to 7 March, 2025 at Mahatama Mandir, Gandhinagar along with IESA Vision Summit-2025 and ISPEC Packaging Ecosystem Conference – 2025. Leading manufactures, research organizations and academia across the world displayed various semiconductor technologies, novel semiconductor IC products and electronics integrated products during the conference. Many students from the EC department attended.",
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "card",
			bgColor: "#fff",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "top",
			children: [
				{ id: randomAddress(), type: "heading-2", children: [{ text: "Training Program on Data Analytics & Applications" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "The Computer Department hosted a CTE, Gandhinagar approved Two-Week Short-Term Training Program on Data Analytics & Applications from February 19 to March 01, 2024, coordinated by Prof. Chirag S. Thaker, Dr Dhara Buch, and Prof. Payal Prajapati. The program featured speakers such as Prof. Jyoti Pareek, Shri Jaimin Desai, Dr Chirag S. Thaker, Dr Hetal Joshiara, Prof. Maitrik Shah, Dr Nikunj Domadia, and Dr Rajyalakshmi Jaiswal. Topics included NEP Implementation, Big Data Analytics with Hadoop, Deep Learning, Privacy in Data Processing, and Introduction & Challenges of Data Analytics.",
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Industry Institute Interaction", underline: true }] },
		{
			id: randomAddress(),
			type: "card",
			bgColor: "#fff",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "top",
			children: [
				{ id: randomAddress(), type: "heading-2", children: [{ text: "eInfochips Visit by EC Department" }] },
				{
					id: randomAddress(),
					type: "paragraph",
					children: [
						{
							text: "The EC Department organized an industrial visit to eInfochips, Ognaj on the days of 14th Febuary and 7th March 2025. The majority of the students of the EC department attended the industrial visit and learned about the inner working of a high-tech VLSI company.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "flexbox",
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: "center",
					fixChildrenWidthRatios: [1, 1],
					children: [
						{
							id: randomAddress(),
							type: "card",
							imageUrl: "/Images/eicVisit_14-2-25.jpg",
							borderAroundImage: true,
							bgColor: "#ffa",
							borderColor: "#000",
							layoutImagePos: "top",
							imageSizeAndPosition: {},
							children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "14 Febuary 2025" }] }],
						},
						{
							id: randomAddress(),
							type: "card",
							imageUrl: "/Images/eicVisit_7-3-25.jpg",
							borderAroundImage: true,
							bgColor: "#ffa",
							borderColor: "#000",
							layoutImagePos: "top",
							imageSizeAndPosition: {},
							children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "7 March 2025" }] }],
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Paper Publications", underline: true }] },
		{
			id: randomAddress(),
			border: true,
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "heading-5", children: [{ text: "Name of the Faculty" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "heading-5",
													children: [
														{
															text: "Title of the paper",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-header-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "heading-5",
													children: [{ text: "Name of Journal/Conference" }],
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
					type: "table-body",
					children: [
						{
							id: randomAddress(),
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Prof. M A Shaikh & Prof. V R Patel" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{ text: "Optimizing CI engine ethanol fuel induction techniques using the AHP-PROMETHEE II hybrid decision model" },
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Current World Environment" }] }],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Dr.Vandana Patel & Dr.Ankit Shah" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "Design and implementation of low power FPGA-based optimal multiband filter with Spline function for denoising ECG signals",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Computer Methods in Biomechanics and Biomedical Engineering, DOI: 10.1080/10255842.2023.2285721" }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Prof. Z. R. Chhaya" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "numbered-list",
													children: [
														{
															id: randomAddress(),
															type: "list-item",
															children: [{ text: "Design perspectives of the structural modes for ground liquid storage steel tanks" }],
														},
														{
															id: randomAddress(),
															type: "list-item",
															children: [{ text: "Generalized single degree of freedom analysis for buckling of steel tanks" }],
														},
														{
															id: randomAddress(),
															type: "list-item",
															children: [{ text: "Comparative study and review of IS 803:1976 with API 650 and NZSEE guidelines" }],
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Structural Engineering Convention 2023 at VNIT Nagpur, 7-9 December 2023" }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Dr.Manish V. Shah & Prof.S.R.Singh" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "Development of State of Art Test Setup to measure Thermal Conductivity of Soils Infused with Treated and Un-treated Natural",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Microorganisms Journal of Environmental Quality Management (Wiley)" }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Dr.Manish V. Shah" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "1. A systematic review on composition, effect and remediation methods of petroleum hydrocarbon contaminated waste drilling mud",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{ id: randomAddress(), type: "paragraph", children: [{ text: "1. Journal of Advances in Bioresearch (Special Issue-1)" }] },
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Dr.Manish V. Shah" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "2. Evaluation of natural foliation effect on deformation characteristic and shear strength parameters of Chamoli (Uttarakhand) rock using a Triaxial system",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "2. Proceedings of the ISRM 15th International Congress on Rock Mechanics and Rock Engineering & 72nd Geomechanics Colloquium – Challenges in Rock Mechanics and Rock Engineering, Schubert, W. & Kluckner, A. (eds), Salzburg, Austria",
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
							type: "table-row",
							children: [
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Prof.A.G.Hansora" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "Flexibility Matrix and Stiffness Matrix of 3D Curved Beam with Varying Curvature and Varying Cross-Sectional Area using Finite Displacement Transfer Method",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Journal of Computational Applied Mechanics (Scopus and Web of Science Indexed)," }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [{ id: randomAddress(), type: "paragraph", children: [{ text: "Prof.Poonam I. Modi" }] }],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{ text: "Development of novel un-fired masonry unit manufactured using silica-rich sandstone mining and cutting waste" },
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Journal of building Engineering (Elsevier) (Scopus, Science Citation Expanded Indexed)" }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Manish V. Mehta, Mrunalkumar D. Chaudhari, Rakesh Chaudhari, Sakshum Khanna and Jaykumar Vora" }],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "Comprehensive Investigation of Hastelloy C-22 Powder Weld Overlay on SA 240 Type 316L Using Laser Beam Welding for Enhanced Performance",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Journal of Manufacturing and Materials Processing, Volume 7, Issue 6, 207, November 2023." }],
												},
											],
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
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [
														{
															text: "Dr. Pankaj Prajapati, Dr. Anilkumar J. Kshatriya,. Mr. Dhavalkumar N. Patel, Ms. Sima K. Gonsai, Mr. Hardik B. Tank, Ms. Kinjal R. Sheth",
														},
													],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{
													id: randomAddress(),
													type: "paragraph",
													children: [{ text: "Comparative analysis of meta heuristics algorithm for differential amplifier design" }],
												},
											],
										},
									],
								},
								{
									id: randomAddress(),
									type: "table-cell",
									children: [
										{
											id: randomAddress(),
											type: "table-cell-content",
											children: [
												{ id: randomAddress(), type: "paragraph", children: [{ text: "Bulletin of Electrical Engineering and Informatics" }] },
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Faculty Achievements", underline: true }] },
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Supervision of Doctoral Thesis" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "Dr. Ankit K. Shah supervised the thesis titled “Control Of Switched Dynamical System” by Research Scholar Mr. Hardik R. Patel, which has been approved for the award of Doctor of Philosophy.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "Dr. Tejas V. Shah supervised the thesis titled “Edge Detection for Brain Tissue Segmentation in MR Image” by Research Scholar Mr. Ghanshyam Parmar, which has been approved for the award of Doctor of Philosophy.",
						},
					],
				},
			],
		},

		{ id: randomAddress(), type: "heading-2", children: [{ text: "Expert Sessions and Industrial Visits" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "Dr. Chirag Thaker delivered an expert session on Augmented Reality (AR) and Virtual Reality (VR) at the Vibrant Gujarat Global Trade Show 2024, Helipad Ground, Gandhinagar. He also conducted a session on 'Supervised vs. Unsupervised Classification' on February 2nd and led an industrial visit at EInfochips, Ahmedabad.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Dr. Zishan Noorani delivered an expert talk at Raj Computer Academy on February 2, 2024." }],
				},
			],
		},

		{ id: randomAddress(), type: "heading-2", children: [{ text: "Colloquium On Data Analysis" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: 'Dr Hiteishi Diwanji delivered expert talk on “Exploratory Data Analytics” at Two Week DTE approved Faculty Development Program on "Data Analytics and Applications" (NC-Guj-23) organized jointly by NITTR and Computer Engineering Department, L.D.College of Engineering.\nShe worked as coordinator for Training program and delivered lecture on "AI/ML war in BigBees" at FDP organized by DTE on Interwoven Intelligence: A Multidisciplinary approach using AI/ML.',
						},
					],
				},
			],
		},

		{ id: randomAddress(), type: "heading-2", children: [{ text: "PhD Accomplishments" }] },
		{
			id: randomAddress(),
			type: "bulleted-list",
			children: [
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "Dr. Mital N. Panchal defended her PhD titled “Novel privacy preserving fuzzy keyword search for encrypted data in cloud computing” from Sankalchand Patel University, Visnagar, on January 2, 2024.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [
						{
							text: "Dr. Shital Solankii defended her PhD titled “Design And Development Of Support Vector Machines Using Piecewise Linear Approximation Based Optimization Techniques” from Gujarat Technological University on March 4, 2024.",
						},
					],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Prof. Pratima K. Shah successfully defended her PhD in Civil Engineering in January 2024." }],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Prof. Rena N. Shukla successfully defended her PhD in Civil Engineering in February 2024." }],
				},
				{
					id: randomAddress(),
					type: "list-item",
					children: [{ text: "Prof. Z. R. Chhaya successfully defended his PhD in Civil Engineering from IIT Roorkee in March 2024." }],
				},
			],
		},

		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Students' Achievements", underline: true }] },
		{
			id: randomAddress(),
			type: "flexbox",
			fixChildrenWidthRatios: [1, 1],
			children: [
				{
					id: randomAddress(),
					type: "card",
					imageUrl: "/Images/I1.jpg",
					borderAroundImage: true,
					bgColor: "#fff",
					shadowColor: "#000",
					borderColor: "#ddd",
					layoutImagePos: "top",
					// imageWidth: "50%",
					imageSizeAndPosition: {},
					children: [
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "Parikh Purva Ilesh and Dave Aakansha Bhaveshbhai from Environmental Engineering Department were awarded the Gold Medal in BE and ME respectively for the year 2023.",
								},
							],
						},
					],
				},
				{
					id: randomAddress(),
					type: "card",
					bgColor: "#fff",
					imageUrl: "/Images/I2.jpg",
					shadowColor: "#000",
					borderColor: "#ddd",
					layoutImagePos: "bottom",
					// imageWidth: "50%",
					imageSizeAndPosition: {},
					children: [
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "Shah Malav Dharmendrakumar, a PG student, under the guidance of Dr. R. J. Jani was awarded the Gold Medal for being a branch topper in M.E. (MECHANICAL – I. C. ENGINE & AUTOMOBILE) at GTU's 13th Annual convocation.",
								},
							],
						},
					],
				},
			],
		},
		{
			id: randomAddress(),
			type: "card",
			bgColor: "#c6e2e8",
			shadowColor: "#000",
			borderColor: "#ddd",
			layoutImagePos: "left",
			// imageWidth: "50%",
			imageSizeAndPosition: {},
			children: [
				{
					id: randomAddress(),
					type: "flexbox",
					alignItems: "stretch",
					fixChildrenWidthRatios: [1, 1, 1],
					children: [
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "Ayan Vaidya, Harsh Balsaraf and Yukta Dodia won the award of Hexapod Robot in the Grand Finale of India’s biggest Robotics competition “ROBOFEST GUJARAT 3.0”",
								},
							],
						},
						{
							id: randomAddress(),
							type: "image",
							srcUrl: "/Images/image-017-101.jpg",
							shadowColor: "#000",
							rounded: true,
							bgColor: "#fff",
							children: [{ text: "" }],
						},
						{
							id: randomAddress(),
							type: "paragraph",
							children: [
								{
									text: "The team also won prize money of Rs. 2,50,000 (Two lakh Fifty thousand only) on 16th March 2024. The team was mentored by Prof. Dr. C.H.Vithalani.",
								},
							],
						},
					],
				},
			],
		},
		{ id: randomAddress(), type: "page-break", children: [{ text: "" }] },
		{ id: randomAddress(), type: "heading-2", children: [{ text: "Sports: Impulse 2025" }] },
		{
			id: randomAddress(),
			type: "card",
			imageUrl: "/Images/Impulse2025Results.jpg",
			borderAroundImage: false,
			bgColor: "#afa",
			shadowColor: "#faf",
			borderColor: "#ddd",
			imageWidth: "75%",
			layoutImagePos: "bottom",
			imageSizeAndPosition: {},
			children: [{ id: randomAddress(), type: "heading-4", align: "center", children: [{ text: "Impulse 2025 Cricket Results" }] }],
		},
	];
}

export function getBlankEditorValue(): Descendant[] {
	return [
		{
			type: "front-page-with-text",
			children: [{ id: randomAddress(), type: "heading-1", align: "center", children: [{ text: "TemPermanent", code: true /*, smallCaps: true*/ }] }],
			id: randomAddress(),
		},
		{ id: randomAddress(), type: "paragraph", children: [{ text: "" }] },
		generateSpecificSectionBreakElement("lower-roman", true, {
			top: [[{ text: "" }], [{ text: "TemPermanent", code: true }], [{ text: "" }]],
			bottomNotPage: [{ text: "Date" }],
			bottomCenter: [{ text: "Company" }],
		}),
		{ type: "auto-toc", children: [{ text: "" }], id: randomAddress(), includeHeaderLevelUpto: 3 },
		generateSpecificSectionBreakElement("upper-roman", true, {
			top: [[{ text: "" }], [{ text: "TemPermanent", code: true }], [{ text: "" }]],
			bottomNotPage: [{ text: "Date" }],
			bottomCenter: [{ text: "Company" }],
		}),
		{ id: randomAddress(), type: "heading-1", children: [{ text: "Title", underline: true }] },
		{ id: randomAddress(), type: "paragraph", children: [{ text: "Paragraph" }] },
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
		children: getBlankEditorValue(),
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
