import { coreceEmptyToUndef, isNonNullAndNonEmpty } from "@/lib/utils";
import { Image, View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { CardElement } from "../../editor/types";
import { Ctx } from "../PDFContextData";
import { itemRenderer } from "./PDFElementRenderer";

const cardImageLayoutPosToFlexDirectionValue = {
	top: "column",
	bottom: "column-reverse",
	left: "row",
	right: "row-reverse",
	back: "row",
} as const;

export function PDFCardRenderer({ element, ctx }: { ctx: Ctx; element: CardElement }) {
	let res: ReactNode;
	if (isNonNullAndNonEmpty(element.imageUrl))
		switch (element.layoutImagePos) {
			case "top":
			case "bottom": {
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
								display: "flex",
								alignItems: "flex-start",
								flexDirection: cardImageLayoutPosToFlexDirectionValue[element.layoutImagePos],
								backgroundColor: coreceEmptyToUndef(element.bgColor),
							},
							isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
						]}>
						<View
							style={[
								{
									borderRadius: "12px",
									maxWidth: "100%",
									maxHeight: "100%",
									minHeight: "0%",
									minWidth: "0%",
								},
								element.borderAroundImage && isNonNullAndNonEmpty(element.borderColor)
									? {
											margin: "4px",
											borderRadius: "12px",
											borderWidth: "1px",
											borderStyle: "solid",
											borderColor: element.borderColor,
									  }
									: {},
							]}>
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<Image
								src={element.imageUrl}
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
												width: "auto",
												height: "auto",
												aspectRatio: "auto",
												objectFit: "scale-down",
												objectPosition: `${element.imageSizeAndPosition?.anchorX ?? "center"} ${element.imageSizeAndPosition?.anchorY ?? "center"}`,
										  },
								]}
							/>
						</View>
						<View
							style={{
								flexShrink: 1,
								flexGrow: 1,
								padding: "8px",
							}}>
							{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
						</View>
					</View>
				);
				break;
			}
			case "left":
			case "right": {
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
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "flex-start",
								flexDirection: cardImageLayoutPosToFlexDirectionValue[element.layoutImagePos],
								backgroundColor: coreceEmptyToUndef(element.bgColor),
							},
							isNonNullAndNonEmpty(element.borderColor) ? { borderWidth: "1px", borderStyle: "solid", borderColor: element.borderColor } : {},
						]}>
						<View
							style={[
								{
									borderRadius: "12px",
									width: "50%",
									maxHeight: "100%",
									minHeight: "0%",
								},
								element.borderAroundImage && isNonNullAndNonEmpty(element.borderColor)
									? {
											margin: "4px",
											borderRadius: "12px",
											borderWidth: "1px",
											borderStyle: "solid",
											borderColor: element.borderColor,
									  }
									: {},
							]}>
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<Image
								src={element.imageUrl}
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
												width: "auto",
												height: "auto",
												aspectRatio: "auto",
												objectFit: "scale-down",
												objectPosition: `${element.imageSizeAndPosition?.anchorX ?? "center"} ${element.imageSizeAndPosition?.anchorY ?? "center"}`,
										  },
								]}
							/>
						</View>
						<View
							style={{
								width: "50%",
								padding: "8px",
							}}>
							{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
						</View>
					</View>
				);
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
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<Image
								src={element.imageUrl}
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
												height: "100%",
												aspectRatio: "auto",
												objectFit: "scale-down",
												objectPosition: `${element.imageSizeAndPosition?.anchorX ?? "center"} ${element.imageSizeAndPosition?.anchorY ?? "center"}`,
										  },
								]}
							/>
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
			wrap={false}
			style={{
				alignSelf: "flex-start",
				maxWidth: "100%",
				maxHeight: "100%",
				minHeight: "0%",
				minWidth: "0%",
				width: "auto",
				height: "auto",
				margin: "4px",
				padding: "4px",
				display: "flex",
				flexDirection: "row",
			}}>
			<View
				style={{
					borderRadius: "12px",
					maxWidth: "100%",
					maxHeight: "100%",
					minHeight: "0%",
					minWidth: "0%",
					width: "auto",
					height: "auto",
					display: "flex",
					flexDirection: "row",
					...(isNonNullAndNonEmpty(element.shadowColor)
						? {
								paddingBottom: "4px",
								backgroundColor: element.shadowColor,
						  }
						: {}),
				}}>
				{res}
			</View>
		</View>
	);
}
