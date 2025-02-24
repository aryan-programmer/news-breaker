import type { Metadata } from "next";
import { NavigationGuardProvider } from "next-navigation-guard";
import "./globals.css";

export const metadata: Metadata = {
	title: "NewsBreaker",
	description: "Create your own newsletter",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="min-h-full">
			<body className="antialiased min-h-screen">
				<NavigationGuardProvider>
					<div className="w-auto mx-3">{children}</div>
				</NavigationGuardProvider>
			</body>
		</html>
	);
}
