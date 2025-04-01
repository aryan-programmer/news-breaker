import { StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/stylesheet";
import { monospacePDFFont, sansSerifPDFFont, serifPDFFont } from "../registerFontsForPDF";

export const styles = StyleSheet.create({
	frontPageBody: {
		height: "100px",
		padding: "0px",
		fontFamily: sansSerifPDFFont,
		fontSize: 16,
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
	frontPageHeaderWithLogo: {
		flexBasis: "auto",
		display: "flex",
		flexDirection: "column-reverse",
		flexWrap: "nowrap",
		alignItems: "stretch",
		justifyContent: "flex-end",
		width: "100%",
		height: "100%",
	},
	frontPageLogo: {
		marginBottom: "4px",
		marginRight: "4px",
		height: "3.5rem",
		width: "auto",
		aspectRatio: "auto",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	frontPageMainImageHolder: {
		maxWidth: "100%",
		maxHeight: "100%",
		minHeight: "0%",
		minWidth: "0%",
		display: "flex",
		flexDirection: "row",
		flexShrink: 1,
		flexBasis: 0,
		flexGrow: 1,
	},
	frontPageMainImage: {
		minHeight: "0%",
		minWidth: "0%",
		width: "auto",
		height: "auto",
		aspectRatio: "auto",
		objectFit: "scale-down",
	},
	frontPageMainImageStretch: {
		maxWidth: "100%",
		maxHeight: "100%",
		minHeight: "0%",
		minWidth: "0%",
		width: "100%",
		height: "100%",
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
	fixedBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
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
	"tocField:heading-4": {
		lineHeight: 1,
		paddingLeft: 30,
		paddingTop: "4px",
	},
	"tocField:heading-5": {
		lineHeight: 1,
		paddingLeft: 40,
		paddingTop: "4px",
	},
	"tocField:heading-6": {
		lineHeight: 1,
		paddingLeft: 50,
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
	"tocFieldText:heading-4": {},
	"tocFieldText:heading-5": {},
	"tocFieldText:heading-6": {},

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
		marginBottom: "12px",
	},
	lastParagraph: {},
	blockquote: {
		borderLeft: "2px solid #000",
		marginLeft: 0,
		marginRight: 0,
		paddingLeft: "10px",
		paddingRight: "10px",
		color: "#000",
		fontStyle: "italic",
	},

	"heading-1": {
		//mb-4 text-5xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.5rem",
		fontFamily: serifPDFFont,
		fontWeight: "extrabold",
		// lineHeight: 1,
	},
	"heading-2": {
		//mb-3 text-4xl font-serif font-extrabold leading-none
		marginTop: "3px",
		marginBottom: "8px",
		fontSize: "2.25rem",
		fontFamily: serifPDFFont,
		fontWeight: "bold",
		// lineHeight: 1,
	},
	"heading-3": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "2px",
		marginBottom: "5px",
		fontSize: "1.875rem",
		fontFamily: serifPDFFont,
		// lineHeight: 1,
	},
	"heading-4": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "2px",
		marginBottom: "5px",
		fontSize: "1.5rem",
		fontFamily: serifPDFFont,
		// lineHeight: 1,
	},
	"heading-5": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "1px",
		marginBottom: "3px",
		fontSize: "1.25rem",
		fontFamily: serifPDFFont,
		// lineHeight: 1,
	},
	"heading-6": {
		//mb-2 text-3xl font-serif font-extrabold leading-none
		marginTop: "1px",
		marginBottom: "3px",
		fontFamily: serifPDFFont,
		// lineHeight: 1,
	},

	list: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	listItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "center",
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
} as const satisfies Record<string, Style>);
