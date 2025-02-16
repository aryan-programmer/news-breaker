import React from "react";
import { RenderElementProps } from "slate-react";
import EditableImage from "./EditableImage";
import { FrontPageWithText } from "./FrontPageWithText";

export default function ElementRenderer(props: RenderElementProps) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { attributes, children, element } = props;
	const style = { textAlign: "align" in element ? element.align : undefined };
	if ("type" in element) {
		switch (element.type) {
			case "block-quote":
				return (
					<blockquote style={style} {...attributes}>
						{children}
					</blockquote>
				);
			case "bulleted-list":
				return (
					<ul className="max-w-md space-y-1 list-disc list-inside" style={style} {...attributes}>
						{children}
					</ul>
				);
			case "heading-1":
				return (
					<h1 className="mb-4 text-5xl font-extrabold leading-none" style={style} {...attributes}>
						{children}
					</h1>
				);
			case "heading-2":
				return (
					<h2 className="mb-3 text-4xl font-extrabold leading-none" style={style} {...attributes}>
						{children}
					</h2>
				);
			case "list-item":
				return (
					<li style={style} {...attributes}>
						{children}
					</li>
				);
			case "numbered-list":
				return (
					<ol className="max-w-md space-y-1 list-decimal list-inside" style={style} {...attributes}>
						{children}
					</ol>
				);
			case "paragraph":
				return (
					<p style={style} {...attributes}>
						{children}
					</p>
				);
			case "image":
				return (
					<EditableImage element={element} attributes={attributes}>
						{children}
					</EditableImage>
				);
			case "front-page-with-text":
				return (
					<FrontPageWithText element={element} attributes={attributes}>
						{children}
					</FrontPageWithText>
				);
		}
	} else {
		return (
			<p style={style} {...attributes}>
				{children}
			</p>
		);
	}
}
