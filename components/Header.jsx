import Image from "next/image";
import React from "react";

import logo from "@/public/logo.svg";
import Link from "next/link";

const Header = () => {
	return (
		<header className="container py-6 flex gap-3 justify-between items-start">
			<Link href="/">
				<Image width={170} height={56} src={logo} alt="logo" />
			</Link>

			<Link href="/" className="main-button">
				Характеристики
			</Link>
		</header>
	);
};

export default Header;
