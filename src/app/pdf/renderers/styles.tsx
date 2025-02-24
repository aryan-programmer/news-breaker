import { StyleSheet } from "@react-pdf/renderer";
import { monospacePDFFont, sansSerifPDFFont, serifPDFFont } from "../registerFontsForPDF";

export const styles = StyleSheet.create({
	frontPageBody: {
		padding: "0px",
		fontFamily: sansSerifPDFFont,
		fontSize: 16,
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	frontPageHeaderWithLogo: {
		justifySelf: "stretch",
		padding: "4px",
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
	},
	frontPageLogo: {
		marginTop: "4px",
		marginRight: "4px",
		height: "3.5rem",
		width: "auto",
		aspectRatio: "auto",
	},
	frontPageMainImageHolder: {
		maxWidth: "100%",
		maxHeight: "100%",
		minHeight: "0%",
		minWidth: "0%",
		display: "flex",
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	frontPageMainImage: {
		maxWidth: "100%",
		maxHeight: "100%",
		aspectRatio: "auto",
		objectFit: "scale-down",
	},

	body: {
		paddingTop: 55,
		paddingBottom: 60,
		paddingHorizontal: 35,
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
	},
	sectionedBodyPage: {
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
		paddingBottom: 60,
		paddingTop: 55,
	},
	sectionedBody: {
		paddingHorizontal: 35,
		fontFamily: sansSerifPDFFont,
		fontSize: 12,
	},
	fixedHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	fixedFooter: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	headerFooter: {
		paddingVertical: 4,
		paddingHorizontal: 35,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 15,
	},
	headerFooterLeft: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	headerFooterCenter: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	headerFooterRight: {
		flexBasis: 0,
		flexGrow: 1,
		flexShrink: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},

	tocContainer: { fontFamily: serifPDFFont, width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" },
	tocFields: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: "1px dotted #ddd",
	},
	"tocField:heading-1": {
		lineHeight: 1,
		paddingTop: "18px",
	},
	"tocField:heading-2": {
		lineHeight: 1,
		paddingLeft: 10,
		paddingTop: "8px",
	},
	"tocField:heading-3": {
		lineHeight: 1,
		paddingLeft: 20,
		paddingTop: "4px",
	},
	"tocFieldText:heading-1": {
		fontSize: "1.5rem",
		fontWeight: "semibold",
	},
	"tocFieldText:heading-2": {
		fontSize: "1.25rem",
		fontWeight: "medium",
	},
	"tocFieldText:heading-3": {},

	bold: {
		fontWeight: "bold",
	},
	italic: {
		fontStyle: "italic",
	},
	underline: {
		textDecoration: "underline",
		textDecorationStyle: "solid",
	},
	pageNumber: {
		fontFamily: monospacePDFFont,
	},
	code: {
		fontFamily: monospacePDFFont,
		backgroundColor: "#eee",
	},
	paragraph: {
		marginTop: "12px",
	},
	firstParagraph: {},
	blockquote: {
		borderLeft: "2px solid #ddd",
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: "10px",
		color: "#aaa",
		fontStyle: "italic",
	},

	"heading-1": {
		//mb-4 text-5xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.5rem",
		fontFamily: serifPDFFont,
		fontWeight: "extrabold",
		lineHeight: 1,
	},
	"heading-2": {
		//mb-3 text-4xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.25rem",
		fontFamily: serifPDFFont,
		fontWeight: "bold",
		lineHeight: 1,
	},
	"heading-3": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "2px",
		marginBottom: "5px",
		fontSize: "1.875rem",
		fontFamily: serifPDFFont,
		lineHeight: 1,
	},

	list: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	listItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		width: "100%",
		marginTop: "1px",
	},
	bullet: {
		margin: 0,
		padding: 0,
	},
	text: {
		flex: 1,
		margin: 0,
		padding: 0,
	},

	tableCell: {
		padding: "4px",
	},
	tableRow: {},
	tableHeaderRow: {
		borderColor: "#a7f3d0",
		fontWeight: "bold",
		backgroundColor: "#f1f5f9",
	},
	tableHeaderRowLast: {
		borderColor: "#a7f3d0",
		borderWidth: "4px",
		fontWeight: "semibold",
	},
	tableFooterRow: {
		backgroundColor: "rgba(241, 245, 249, 0.4)",
		color: "#64748b",
	},
});
