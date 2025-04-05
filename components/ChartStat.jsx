"use client";

import React from "react";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";

const ChartStat = ({ data }) => {
	const runnerColors = [
		"oklch(50.5% 0.213 27.518)",
		"oklch(48.8% 0.243 264.376)",
		"oklch(55.3% 0.195 38.402)",
		"oklch(52.7% 0.154 150.069)",
		"oklch(49.6% 0.265 301.924)",
		"oklch(21.6% 0.006 56.043)",
	];

	// Добавляем объект для преобразования ID в названия цветов
	const runnerColorNames = {
		1: "Красный",
		2: "Синий",
		3: "Оранжевый",
		4: "Зеленый",
		5: "Фиолетовый",
		6: "Черный",
	};

	const chartData = data
		// Сначала сортируем исходные данные
		.sort((a, b) => a.raceNumber - b.raceNumber)
		// Затем преобразовываем отсортированные данные
		.map((race) => ({
			raceNumber: race.raceNumber,
			...Object.entries(race.positions).reduce(
				(acc, [position, runner]) => ({
					...acc,
					[runner]: Number(position),
				}),
				{}
			),
		}));

	return (
		<div className="flex flex-col items-center min-w-[600px]">
			<ResponsiveContainer height={350} width="100%">
				<LineChart
					data={chartData}
					margin={{
						bottom: 40,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis
						dataKey="raceNumber"
						label={{ value: "Номер забега", position: "bottom", fill: "#f7f7f5" }}
						tickFormatter={(value) => `${value}`}
						tick={{ fill: "#f7f7f5" }}
					/>

					<YAxis
						label={{
							value: "Занятое место",
							angle: -90,
							position: "insideLeft",
							fill: "#f7f7f5",
						}}
						stroke="#888888"
						fontSize={12}
						tickLine={{ stroke: "#888888" }}
						axisLine={{ stroke: "#888888" }}
						domain={[1, 6]}
						ticks={[1, 2, 3, 4, 5, 6]}
						tick={{ fill: "#f7f7f5" }}
						reversed={true}
						allowDataOverflow={false}
						padding={{ top: 10, bottom: 10 }}
					/>

					<Tooltip
						content={({ payload, label }) => (
							<div
								style={{
									fontWeight: 600,
									color: "#1c1c1c",
									backgroundColor: "rgba(226, 232, 240, 0.85)",
									border: "1px solid #ddd",
									borderRadius: "4px",
									padding: "8px",
								}}
							>
								<div className="mb-2 text-lg">Забег {label}</div>
								<div>
									{payload?.map((entry, index) => (
										<div
											key={index}
											style={{
												color: `${runnerColors[index % runnerColors.length]}`,
											}}
										>
											{runnerColorNames[entry.name] || entry.name}: Место: {entry.value}
										</div>
									))}
								</div>
							</div>
						)}
					/>

					{[1, 2, 3, 4, 5, 6].map((runner, index) => (
						<Line
							key={runner}
							type="linear"
							dataKey={runner}
							stroke={runnerColors[index % runnerColors.length]}
							strokeWidth={3}
							dot={{
								r: 3,
								fill: runnerColors[index % runnerColors.length],
								strokeWidth: 2,
								stroke: "#ffffff",
							}}
							activeDot={{
								r: 5,
								fill: runnerColors[index % runnerColors.length],
								stroke: "#ffffff",
							}}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartStat;
