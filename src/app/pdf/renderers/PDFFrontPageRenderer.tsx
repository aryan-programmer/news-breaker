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
				backgroundColor: element.textSectionBgColor ?? undefined,
			}}>
			<View style={styles.frontPageHeaderWithLogo}>
				<View
					style={{
						flexGrow: 1,
						flexBasis: 0,
					}}>
					{element.children.map((c, i, arr) => itemRenderer(c, i === arr.length - 1, ctx))}
				</View>
			</View>
			<View style={styles.frontPageMainImageHolder}>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				<Image src={element.mainImageUrl} style={styles.frontPageMainImage} />
			</View>
			{element.logoImageUrl != null ? (
				/* eslint-disable-next-line jsx-a11y/alt-text */
				<Image src={element.logoImageUrl} style={styles.frontPageLogo} />
			) : null}
		</Page>
	);
}
