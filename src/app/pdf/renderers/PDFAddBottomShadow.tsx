import { View } from "@react-pdf/renderer";

type PDFAddBottomShadowProps = { children: React.ReactNode; shadowColor: string; borderRadius?: string };
export function PDFAddBottomShadow({ shadowColor, children, borderRadius }: PDFAddBottomShadowProps) {
	return (
		<View
			wrap
			style={{
				borderRadius,
				maxWidth: "100%",
				maxHeight: "100%",
				minHeight: "0%",
				minWidth: "0%",
				width: "auto",
				height: "auto",
				display: "flex",
				flexDirection: "row",
				paddingBottom: "4px",
				backgroundColor: shadowColor,
			}}>
			{children}
		</View>
	);
}

export function PDFAddBottomShadowOptionally(props: { children: React.ReactNode; shadowColor?: string | null; borderRadius?: string }) {
	if (props.shadowColor == null) {
		return <>{props.children}</>;
	} else {
		return <PDFAddBottomShadow {...(props as PDFAddBottomShadowProps)} />;
	}
}
