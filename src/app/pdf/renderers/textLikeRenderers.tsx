import { getAddress } from "@/lib/uniq-address";
import { Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { CustomText, HeadingNElement } from "../../editor/types";
import { formatPageNumber } from "../pdf-rendering-utils";
import { Ctx } from "../PDFContextData";
import "../registerFontsForPDF";
import { styles } from "./styles";

export function PDFTextStringRenderer({ element, ctx, style: styleOrig }: { ctx: Ctx; element: CustomText; style?: Style }) {
	let style: Style = styleOrig ?? {};
	if (element.bold) style = { ...style, ...styles.bold };
	if (element.italic) style = { ...style, ...styles.italic };
	if (element.underline) style = { ...style, ...styles.underline };
	if (element.code) style = { ...style, ...styles.code };
	if (element.color != null) style = { ...style, color: element.color };
	if (element.pageNumberOverride) {
		style = { ...style, ...styles.pageNumber };
		return (
			<Text
				wrap
				style={style}
				render={({ pageNumber }) =>
					formatPageNumber(pageNumber, ctx.section?.id ?? ctx.pdfContext.first.id, ctx.section?.pageNumberFormat ?? "numeric", ctx)
				}>
				???
			</Text>
		);
	} else {
		return (
			<Text wrap style={style}>
				{element.text}
			</Text>
		);
	}
}

export function PDFTextLikeElementRenderer({
	style,
	id,
	childrenElements,
	ctx,
}: {
	ctx: Ctx;
	style: Style;
	id: string;
	childrenElements: CustomText[];
}) {
	return (
		<Text wrap style={style} id={id}>
			{childrenElements.map((child) => (
				<PDFTextStringRenderer element={child} key={getAddress(child)} ctx={ctx} />
			))}
		</Text>
	);
}

export function PDFHeadingRenderer({ style, element, ctx }: { ctx: Ctx; style: Style; element: HeadingNElement }) {
	return (
		<Text wrap style={style} id={element.id}>
			<Text
				render={({ pageNumber }) => {
					ctx.pdfContext.setPageNumber(element.id, pageNumber);
					return "";
				}}
			/>
			{element.children.map((child) => (
				<PDFTextStringRenderer element={child} key={getAddress(child)} ctx={ctx} />
			))}
		</Text>
	);
}
