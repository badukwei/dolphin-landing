import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "DolphinBay | Web3 Gaming Made Easy",
	description:
		"Blockchain gaming with a cyber-aquatic aesthetic. Fun, easy, and rewarding.",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} font-poppins dark`}>
				{children}
			</body>
		</html>
	);
}
