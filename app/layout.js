import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import bgImg from "@/public/bg.jpg";
import Image from "next/image";

const inter = Inter({
	variable: "--font-inter",
});

export const metadata = {
	title: "BETNETIX",
	description: "Система симуляции и анализа забегов для тренера по легкой атлетике",
};

export default function RootLayout({ children }) {
	return (
		<html lang="ru" className="h-full">
			<body className={`${inter.className} antialiased flex flex-col min-h-full`}>
				<div className="fixed inset-0 -z-10 h-full w-full">
					<Image
						src={bgImg}
						alt="Background"
						fill
						priority
						quality={80}
						className="object-cover object-center opacity-20"
						sizes="100vw"
					/>
				</div>
				<div className="h-full flex flex-col overflow-hidden justify-start relative">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
