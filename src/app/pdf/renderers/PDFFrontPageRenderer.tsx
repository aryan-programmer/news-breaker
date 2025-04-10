import { coreceEmptyToUndef, isNonNullAndNonEmpty } from "@/lib/utils";
import { Image, Page, View } from "@react-pdf/renderer";
import { FrontPageWithTextElement } from "../../editor/types";
import { Ctx } from "../PDFContextData";
import { itemRenderer } from "./PDFElementRenderer";
import { styles } from "./styles";

export function PDFFrontPageRenderer({ element, ctx }: { ctx: Ctx; element: FrontPageWithTextElement }) {
	return (
		<Page
			style={{
				...styles.frontPageBody,
				backgroundColor: coreceEmptyToUndef(element.textSectionBgColor),
			}}>
			<View style={styles.frontPageHeaderWithLogo}>
				{isNonNullAndNonEmpty(element.mainImageUrl) ? (
					<View
						style={[
							styles.frontPageMainImageHolder,
							element.useMainImageAsBg
								? {
										position: "absolute",
										left: 0,
										top: 0,
										bottom: 0,
										right: 0,
										width: "100%",
										height: "100%",
								  }
								: {},
						]}>
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<Image
							src={element.mainImageUrl}
							style={[
								element.mainImageSizeAndPosition?.stretch === true ? styles.frontPageMainImageStretch : styles.frontPageMainImage,
								{
									objectPosition: `${element.mainImageSizeAndPosition?.anchorX ?? "center"} ${element.mainImageSizeAndPosition?.anchorY ?? "center"}`,
								},
							]}
						/>
					</View>
				) : null}
				<View
					style={{
						flexGrow: 0,
						padding: 25,
					}}>
					{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
				</View>
			</View>
			{isNonNullAndNonEmpty(element.logoImageUrl) ? (
				/* eslint-disable-next-line jsx-a11y/alt-text */
				<Image src={element.logoImageUrl} style={styles.frontPageLogo} />
			) : null}
		</Page>
	);
}
