import { Font } from "@react-pdf/renderer";

function registerFontsForPDF() {
	const fontData = [
		{
			family: "Arimo",
			fonts: [
				{
					fontStyle: "normal",
					fontWeight: 400,
					src: "/Arimo/static/Arimo-Regular.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 400,
					src: "/Arimo/static/Arimo-Italic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 500,
					src: "/Arimo/static/Arimo-Medium.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 500,
					src: "/Arimo/static/Arimo-MediumItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 600,
					src: "/Arimo/static/Arimo-SemiBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 600,
					src: "/Arimo/static/Arimo-SemiBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 700,
					src: "/Arimo/static/Arimo-Bold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 700,
					src: "/Arimo/static/Arimo-BoldItalic.ttf",
				},
			],
		},
		{
			family: "Roboto",
			fonts: [
				{
					fontStyle: "normal",
					fontWeight: 100,
					src: "/Roboto/static/Roboto-Thin.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 100,
					src: "/Roboto/static/Roboto-ThinItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 200,
					src: "/Roboto/static/Roboto-ExtraLight.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 200,
					src: "/Roboto/static/Roboto-ExtraLightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 300,
					src: "/Roboto/static/Roboto-Light.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 300,
					src: "/Roboto/static/Roboto-LightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 400,
					src: "/Roboto/static/Roboto-Regular.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 400,
					src: "/Roboto/static/Roboto-Italic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 500,
					src: "/Roboto/static/Roboto-Medium.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 500,
					src: "/Roboto/static/Roboto-MediumItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 600,
					src: "/Roboto/static/Roboto-SemiBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 600,
					src: "/Roboto/static/Roboto-SemiBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 700,
					src: "/Roboto/static/Roboto-Bold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 700,
					src: "/Roboto/static/Roboto-BoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 800,
					src: "/Roboto/static/Roboto-ExtraBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 800,
					src: "/Roboto/static/Roboto-ExtraBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 900,
					src: "/Roboto/static/Roboto-Black.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 900,
					src: "/Roboto/static/Roboto-BlackItalic.ttf",
				},
			],
		},
		{
			family: "Josefin Slab",
			fonts: [
				{
					fontStyle: "normal",
					fontWeight: 100,
					src: "/Josefin_Slab/static/JosefinSlab-Thin.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 100,
					src: "/Josefin_Slab/static/JosefinSlab-ThinItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 200,
					src: "/Josefin_Slab/static/JosefinSlab-ExtraLight.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 200,
					src: "/Josefin_Slab/static/JosefinSlab-ExtraLightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 300,
					src: "/Josefin_Slab/static/JosefinSlab-Light.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 300,
					src: "/Josefin_Slab/static/JosefinSlab-LightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 400,
					src: "/Josefin_Slab/static/JosefinSlab-Regular.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 400,
					src: "/Josefin_Slab/static/JosefinSlab-Italic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 500,
					src: "/Josefin_Slab/static/JosefinSlab-Medium.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 500,
					src: "/Josefin_Slab/static/JosefinSlab-MediumItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 600,
					src: "/Josefin_Slab/static/JosefinSlab-SemiBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 600,
					src: "/Josefin_Slab/static/JosefinSlab-SemiBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 700,
					src: "/Josefin_Slab/static/JosefinSlab-Bold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 700,
					src: "/Josefin_Slab/static/JosefinSlab-BoldItalic.ttf",
				},
			],
		},
		{
			family: "JetBrains Mono",
			fonts: [
				{
					fontStyle: "normal",
					fontWeight: 100,
					src: "/JetBrains_Mono/static/JetBrainsMono-Thin.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 100,
					src: "/JetBrains_Mono/static/JetBrainsMono-ThinItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 200,
					src: "/JetBrains_Mono/static/JetBrainsMono-ExtraLight.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 200,
					src: "/JetBrains_Mono/static/JetBrainsMono-ExtraLightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 300,
					src: "/JetBrains_Mono/static/JetBrainsMono-Light.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 300,
					src: "/JetBrains_Mono/static/JetBrainsMono-LightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 400,
					src: "/JetBrains_Mono/static/JetBrainsMono-Regular.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 400,
					src: "/JetBrains_Mono/static/JetBrainsMono-Italic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 500,
					src: "/JetBrains_Mono/static/JetBrainsMono-Medium.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 500,
					src: "/JetBrains_Mono/static/JetBrainsMono-MediumItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 600,
					src: "/JetBrains_Mono/static/JetBrainsMono-SemiBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 600,
					src: "/JetBrains_Mono/static/JetBrainsMono-SemiBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 700,
					src: "/JetBrains_Mono/static/JetBrainsMono-Bold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 700,
					src: "/JetBrains_Mono/static/JetBrainsMono-BoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 800,
					src: "/JetBrains_Mono/static/JetBrainsMono-ExtraBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 800,
					src: "/JetBrains_Mono/static/JetBrainsMono-ExtraBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 900,
					src: "/JetBrains_Mono/static/JetBrainsMono-Black.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 900,
					src: "/JetBrains_Mono/static/JetBrainsMono-BlackItalic.ttf",
				},
			],
		},
		{
			family: "Nunito",
			fonts: [
				{
					fontStyle: "normal",
					fontWeight: 200,
					src: "/Nunito/static/Nunito-ExtraLight.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 200,
					src: "/Nunito/static/Nunito-ExtraLightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 300,
					src: "/Nunito/static/Nunito-Light.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 300,
					src: "/Nunito/static/Nunito-LightItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 400,
					src: "/Nunito/static/Nunito-Regular.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 400,
					src: "/Nunito/static/Nunito-Italic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 500,
					src: "/Nunito/static/Nunito-Medium.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 500,
					src: "/Nunito/static/Nunito-MediumItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 600,
					src: "/Nunito/static/Nunito-SemiBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 600,
					src: "/Nunito/static/Nunito-SemiBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 700,
					src: "/Nunito/static/Nunito-Bold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 700,
					src: "/Nunito/static/Nunito-BoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 800,
					src: "/Nunito/static/Nunito-ExtraBold.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 800,
					src: "/Nunito/static/Nunito-ExtraBoldItalic.ttf",
				},
				{
					fontStyle: "normal",
					fontWeight: 900,
					src: "/Nunito/static/Nunito-Black.ttf",
				},
				{
					fontStyle: "italic",
					fontWeight: 900,
					src: "/Nunito/static/Nunito-BlackItalic.ttf",
				},
			],
		},
	];

	fontData.forEach((font) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		Font.register(font);
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	Font.registerEmojiSource({
		format: "png",
		url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	Font.registerHyphenationCallback((word: string) => [word]);
}

export const sansSerifPDFFont = "Nunito";
export const serifPDFFont = "Josefin Slab";
export const monospacePDFFont = "JetBrains Mono";

registerFontsForPDF();
