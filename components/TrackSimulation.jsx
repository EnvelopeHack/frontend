"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { revalidateRaceData } from "@/app/actions";

const TrackSimulation = () => {
	const ws = useRef("-");
	const router = useRouter();
	const [isConnected, setIsConnected] = useState(false);
	const [raceData, setRaceData] = useState({
		places: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-" },
		second: 0,
		positions: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	});
	const [isRunning, setIsRunning] = useState(false);

	const connectWebSocket = () => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) return;

		ws.current = new WebSocket("wss://electives.t-university.exfl.ru/race-simulation");

		ws.current.onopen = () => {
			console.log("Connected to WebSocket");
			setIsConnected(true);
		};

		ws.current.onmessage = (event) => {
			const data = JSON.parse(event.data);

			setRaceData(data);

			// const newFinished = { ...finishedRunners };
			// let hasNewFinishers = false;

			// Object.entries(data.positions).forEach(([id, pos]) => {
			// 	if (pos >= 100 && !newFinished[id]) {
			// 		newFinished[id] = Object.keys(newFinished).length + 1;
			// 		hasNewFinishers = true;
			// 	}
			// });

			// if (hasNewFinishers) {
			// 	setFinishedRunners(newFinished);
			// }

			// const currentResults = calculateResults(data.positions, newFinished);
			// setResults(currentResults);

			if (Object.values(data.positions).every((pos) => pos >= 100)) {
				stopSimulation();
			}
		};

		ws.current.onclose = () => {
			console.log("Disconnected from WebSocket");
			setIsConnected(false);
			setIsRunning(false);
		};

		ws.current.onerror = (error) => {
			console.error("WebSocket error:", error);
			setIsConnected(false);
			setIsRunning(false);
		};
	};

	const disconnectWebSocket = () => {
		if (ws.current) ws.current.close();
	};

	// const calculateResults = (positions, finished) => {
	// 	const sorted = Object.entries(positions)
	// 		.filter(([id]) => !finished[id])
	// 		.sort(([, posA], [, posB]) => posB - posA);

	// 	const fixedResults = Object.keys(finished).reduce((acc, id) => {
	// 		acc[id] = finished[id];
	// 		return acc;
	// 	}, {});

	// 	const newResults = sorted.reduce((acc, [id], index) => {
	// 		acc[id] = index + 1 + Object.keys(fixedResults).length;
	// 		return acc;
	// 	}, {});

	// 	return { ...fixedResults, ...newResults };
	// };

	const startSimulation = () => {
		if (!isConnected) connectWebSocket();
		// setFinishedRunners({});
		// setResults({});
		setRaceData({
			places: { 1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-" },
			second: 0,
			positions: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
		});
		setIsRunning(true);
	};

	const stopSimulation = async () => {
		disconnectWebSocket();
		setIsRunning(false);

		try {
			console.log("Stopping simulation and revalidating...");
			const result = await revalidateRaceData();
			if (result.success) {
				console.log("Revalidation successful, refreshing...");
				await new Promise((resolve) => setTimeout(resolve, 500));
				router.refresh();
				console.log("Refresh triggered");
			} else {
				console.error("Revalidation failed");
			}
		} catch (error) {
			console.error("Error during revalidation:", error);
		}
	};

	const colors = {
		1: "oklch(50.5% 0.213 27.518)",
		2: "oklch(48.8% 0.243 264.376)",
		3: "oklch(55.3% 0.195 38.402)",
		4: "oklch(52.7% 0.154 150.069)",
		5: "oklch(49.6% 0.265 301.924)",
		6: "oklch(21.6% 0.006 56.043)",
	};

	return (
		<div className="flex flex-col">
			<div className="flex justify-between mb-4 gap-2 items-center flex-wrap">
				<h2 className="table-header mb-0">Беговая дорожка (100 м)</h2>
				<p className="text-center text-xl font-bold">Время: {raceData.second} сек</p>
			</div>
			<div className="rounded-[4px] mt-4">
				{Object.entries(raceData.positions).map(([id, position]) => (
					<div key={id} className="flex items-center gap-1.5 sm:gap-3 mb-3 last:mb-0">
						<p></p>
						<div className="w-4 sm:w-8 text-center font-bold text-white-50">{id}</div>
						<div
							className="flex-1 h-8 sm:h-10 rounded relative"
							style={{ backgroundColor: "rgba(226, 232, 240, 0.85)" }}
						>
							<div className="h-full left-2 right-5 absolute">
								<div
									className={`absolute w-5 h-5 rounded-full shadow-md top-1.5 sm:top-2.5 transition-all duration-300 ease-out`}
									style={{ left: `${position}%`, backgroundColor: `${colors[id]}` }}
								/>
								<div className="absolute right-0 w-1 h-full bg-red-500" />
							</div>
						</div>
						<div className="flex flex-col sm:gap-4 sm:flex-row">
							<div className="w-16 sm:w-20 text-center sm:text-right text-xs sm:text-sm md:text-base text-white-50">
								{position.toFixed(2)} м
							</div>
							<div className="w-16 text-center text-xs sm:text-sm md:text-base font-semibold text-white-50">
								{raceData.places[id] !== "-" ? `${raceData.places[id]} место` : "-"}
							</div>
						</div>
					</div>
				))}
			</div>
			<button
				className={`main-button self-center mt-5 px-5 ${
					isRunning
						? "bg-gray-600 hover:bg-gray-600 border-gray-600 opacity-75 hover:text-white-50 cursor-not-allowed"
						: "bg-transparent hover:bg-white-50"
				}`}
				onClick={startSimulation}
				disabled={isRunning}
			>
				{isRunning ? "Гонка идёт..." : "Старт"}
			</button>
		</div>
	);
};

export default TrackSimulation;
