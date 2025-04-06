"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [runnersData, setRunnersData] = useState({
		1: { avgSpeed: "", deviation: "" },
		2: { avgSpeed: "", deviation: "" },
		3: { avgSpeed: "", deviation: "" },
		4: { avgSpeed: "", deviation: "" },
		5: { avgSpeed: "", deviation: "" },
		6: { avgSpeed: "", deviation: "" },
	});

	const handleInputChange = (runnerId, field, value) => {
		setRunnersData((prev) => ({
			...prev,
			[runnerId]: {
				...prev[runnerId],
				[field]: value,
			},
		}));
	};

	const handleSubmit = () => {
		onRunnersDataSubmit(runnersData); // Передаем данные в родительский компонент
		setIsOpen(false); // Закрываем модальное окно
	};

	return (
		<header className="container py-6 flex gap-3 justify-between items-start">
			<Link href="/">
				<Image width={170} height={56} src={logo} alt="logo" />
			</Link>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<button className="main-button">Характеристики</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]" Description="Ввод характеристик">
					<DialogHeader>
						<DialogTitle>Характеристики бегунов</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{Object.keys(runnersData).map((runnerId) => (
							<div key={runnerId} className="grid grid-cols-3 gap-2 items-center">
								<span className="text-sm">Бегун {runnerId}</span>
								<Input
									placeholder="Ср. скорость (м/с)"
									value={runnersData[runnerId].avgSpeed}
									onChange={(e) => handleInputChange(runnerId, "avgSpeed", e.target.value)}
									type="number"
									step="0.1"
								/>
								<Input
									placeholder="Отклонение"
									value={runnersData[runnerId].deviation}
									onChange={(e) =>
										handleInputChange(runnerId, "deviation", e.target.value)
									}
									type="number"
									step="0.1"
								/>
							</div>
						))}
					</div>
					<button className="main-button" onClick={handleSubmit}>
						Сохранить
					</button>
				</DialogContent>
			</Dialog>
		</header>
	);
};

export default Header;
