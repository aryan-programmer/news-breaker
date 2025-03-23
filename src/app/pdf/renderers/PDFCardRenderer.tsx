import { coreceEmptyToUndef, isNonNullAndNonEmpty } from "@/lib/utils";
import { Image, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import { ReactNode } from "react";
import { CardElement } from "../../editor/types";
import { Ctx } from "../PDFContextData";
import { PDFAddBottomShadowOptionally } from "./PDFAddBottomShadow";
import { itemRenderer } from "./PDFElementRenderer";

export const anchorToAlign = {
	top: "flex-start",
	left: "flex-start",
	center: "center",
	right: "flex-end",
	bottom: "flex-end",
} as const;

export function PDFCardRenderer({ element, ctx, style: styleOrig }: { ctx: Ctx; element: CardElement; style?: Style }) {
	let res: ReactNode;
	if (isNonNullAndNonEmpty(element.imageUrl))
		switch (element.layoutImagePos) {
			case "top":
			case "bottom": {
				res = <CardContentWithImageTopBottom element={element} ctx={ctx} />;
				break;
			}
			case "left":
			case "right": {
				res = <CardContentWithImageLeftRight element={element} ctx={ctx} />;
				break;
			}
			case "back": {
				res = (
					<View
						style={[
							{
								borderRadius: "12px",
								position: "relative",
								maxWidth: "100%",
								maxHeight: "100%",
								minHeight: "0%",
								minWidth: "0%",
								width: "100%",
								height: "100%",
								flexDirection: "row",
								backgroundColor: coreceEmptyToUndef(element.bgColor),
							},
							isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
						]}>
						<View
							style={{
								borderRadius: "12px",
								maxWidth: "100%",
								maxHeight: "100%",
								minHeight: "0%",
								minWidth: "0%",
								position: "absolute",
								left: 0,
								top: 0,
								bottom: 0,
								right: 0,
								width: "100%",
								height: "100%",
							}}>
							<ImageView element={element} viewStyle={{}} />
						</View>
						<View
							style={{
								width: "100%",
								height: "100%",
								padding: "8px",
							}}>
							{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
						</View>
					</View>
				);
				break;
			}
			default:
				break;
		}
	else {
		res = (
			<View
				style={[
					{
						borderRadius: "12px",
						maxWidth: "100%",
						maxHeight: "100%",
						minHeight: "0%",
						minWidth: "0%",
						width: "100%",
						height: "100%",
						backgroundColor: coreceEmptyToUndef(element.bgColor),
						padding: "8px",
					},
					isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
				]}>
				{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
			</View>
		);
	}

	return (
		<View
			wrap
			style={{
				alignSelf: "flex-start",
				maxWidth: "100%",
				maxHeight: "100%",
				minHeight: "0%",
				minWidth: "0%",
				width: "auto",
				height: "auto",
				padding: "4px",
				display: "flex",
				flexDirection: "row",
				...styleOrig,
			}}>
			<View
				wrap
				style={{
					alignSelf: "flex-start",
					width: "100%",
					height: "100%",
					padding: "4px",
					display: "flex",
					flexDirection: "row",
				}}>
				<PDFAddBottomShadowOptionally borderRadius="12px" shadowColor={element.shadowColor}>
					{res}
				</PDFAddBottomShadowOptionally>
			</View>
		</View>
	);
}
function ImageView({ element, viewStyle }: { element: CardElement; viewStyle: Style }) {
	return (
		<View style={viewStyle}>
			{/*eslint-disable-next-line jsx-a11y/alt-text */}
			<Image
				src={element.imageUrl!}
				style={[
					{
						borderRadius: "12px",
						maxWidth: "100%",
						maxHeight: "100%",
						minHeight: "0%",
						minWidth: "0%",
					},
					element.imageSizeAndPosition?.stretch === true
						? {
								width: "100%",
								height: "100%",
						  }
						: {
								width: "100%",
								height: "auto",
								aspectRatio: "auto",
								objectFit: "scale-down",
								objectPosition: `${element.imageSizeAndPosition?.anchorX ?? "center"} ${element.imageSizeAndPosition?.anchorY ?? "center"}`,
						  },
				]}
			/>
		</View>
	);
}

function CardContentWithImageLeftRight({ element, ctx }: { element: CardElement; ctx: Ctx }): ReactNode {
	const imageWidthStr = element.imageWidth?.toString();
	const childrenViewStyle =
		element.imageWidth != null && imageWidthStr != null && imageWidthStr.endsWith("%")
			? { width: (100 - +imageWidthStr.substring(0, imageWidthStr.length - 1)).toString() + "%" }
			: {
					flexBasis: "0px",
					flexShrink: 1,
					flexGrow: 1,
			  };
	const image = (
		<View
			style={{
				padding: "3px",
				...(element.imageWidth == null
					? {
							flexBasis: "0px",
							flexShrink: 1,
							flexGrow: 1,
					  }
					: { width: element.imageWidth }),
			}}>
			<ImageView
				element={element}
				viewStyle={{
					...(element.borderAroundImage === true && isNonNullAndNonEmpty(element.borderColor)
						? {
								padding: "1px",
								borderRadius: "12px",
								borderWidth: "1px",
								borderStyle: "solid",
								borderColor: element.borderColor,
						  }
						: {}),
					width: "100%",
				}}
			/>
		</View>
	);
	return (
		<View
			style={[
				{
					borderRadius: "12px",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: element.imageSizeAndPosition?.stretch ? undefined : anchorToAlign[element.imageSizeAndPosition?.anchorY ?? "center"],
					backgroundColor: coreceEmptyToUndef(element.bgColor),
				},
				isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
			]}>
			{element.layoutImagePos === "left" ? image : null}
			<View
				wrap
				style={{
					...childrenViewStyle,
					padding: "8px",
				}}>
				{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
			</View>
			{element.layoutImagePos === "right" ? image : null}
		</View>
	);
}

function CardContentWithImageTopBottom({ element, ctx }: { element: CardElement; ctx: Ctx }): ReactNode {
	const image = (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: element.imageSizeAndPosition?.stretch ? undefined : anchorToAlign[element.imageSizeAndPosition?.anchorX ?? "center"],
				width: "100%",
				padding: "3px",
			}}>
			<View
				style={{
					width: element.imageWidth ?? "100%",
				}}>
				<ImageView
					element={element}
					viewStyle={{
						...(element.borderAroundImage === true && isNonNullAndNonEmpty(element.borderColor)
							? {
									padding: "1px",
									borderRadius: "12px",
									borderWidth: "1px",
									borderStyle: "solid",
									borderColor: element.borderColor,
							  }
							: {}),
						width: "100%",
					}}
				/>
			</View>
		</View>
	);
	return (
		<View
			wrap
			style={[
				{
					borderRadius: "12px",
					width: "100%",
					height: "100%",
					backgroundColor: coreceEmptyToUndef(element.bgColor),
				},
				isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
			]}>
			{element.layoutImagePos === "top" ? image : null}
			<View
				wrap
				style={{
					width: "100%",
					padding: "8px",
				}}>
				{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
			</View>
			{element.layoutImagePos === "bottom" ? image : null}
		</View>
	);
}
