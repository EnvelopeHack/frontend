"use client";

import { useState, useRef, useEffect } from "react";

const TrackSimulation = () => {
	const ws = useRef(null);
	const [isConnected, setIsConnected] = useState(false);

	const [raceData, setRaceData] = useState({
		second: 0,
		positions: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
	});
	const [isRunning, setIsRunning] = useState(false);
	const [results, setResults] = useState({});
	const [finishedRunners, setFinishedRunners] = useState({});

	const calculateResults = (positions) => {
		const sorted = Object.entries(positions)
			.filter(([id, pos]) => !finishedRunners[id])
			.sort(([, posA], [, posB]) => posB - posA);

		const fixedResults = Object.keys(finishedRunners).reduce((acc, id) => {
			acc[id] = results[id] || 0;
			return acc;
		}, {});

		const newResults = sorted.reduce((acc, [id], index) => {
			acc[id] = index + 1 + Object.keys(fixedResults).length;
			return acc;
		}, {});

		return {
			...fixedResults,
			...newResults,
		};
	};

	// Подключение к WebSocket
	const connectWebSocket = () => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			return;
		}

		// Подключаемся к вашему WebSocket серверу
		ws.current = new WebSocket("wss://electives.t-university.exfl.ru/race-simulation");

		ws.current.onopen = () => {
			console.log("Connected to WebSocket");
			setIsConnected(true);
		};

		ws.current.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setRaceData(data);
			// console.log(data);

			const newFinished = { ...finishedRunners };
			let hasNewFinishers = false;

			Object.entries(data.positions).forEach(([id, pos]) => {
				if (pos >= 100 && !newFinished[id]) {
					newFinished[id] = true;
					hasNewFinishers = true;
				}
			});

			if (hasNewFinishers) {
				// setFinishedRunners(newFinished);
				setFinishedRunners((prev) => ({ ...prev, ...newFinished }));
			}

			const currentResults = calculateResults({
				...data.positions, // данные только что пришедшие
				...newFinished, // только что вычисленные finishedRunners
			});

			setResults((prev) => ({
				...prev,
				...currentResults,
			}));

			// console.log(currentResults);
			// console.log(finishedRunners);

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

	// Отключение от WebSocket
	const disconnectWebSocket = () => {
		if (ws.current) {
			ws.current.close();
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

	const startSimulation = () => {
		if (!isConnected) {
			connectWebSocket();
		}
		// setFinishedRunners({});
		setRaceData({
			second: 0,
			positions: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
		});
		setResults({});

		setIsRunning(true);
	};

	// Остановка симуляции
	const stopSimulation = () => {
		disconnectWebSocket();

		setIsRunning(false);
	};

	useEffect(() => {
		console.log("Race data updated:", raceData);
	}, [raceData]);

	useEffect(() => {
		console.log("Finished runners updated:", finishedRunners);
	}, [finishedRunners]);

	useEffect(() => {
		console.log("Results updated:", results);
	}, [results]);

	return (
		<div className="flex flex-col">
			<div className="flex justify-between mb-4 gap-2 items-center flex-wrap">
				<h2 className="table-header mb-0">Беговая дорожка (100 м)</h2>

				<p className="text-center text-xl font-bold">Время: {raceData.second} сек</p>
			</div>

			<div className="rounded-[4px] mt-4">
				{Object.entries(raceData.positions).map(([id, position]) => (
					<div key={id} className="flex items-center gap-1.5 sm:gap-3 mb-3 last:mb-0">
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
							<div className="w-16 sm:w-20 text-center sm:text-right text-xs sm:text-sm md:text-base  text-white-50">
								{position.toFixed(2)} м
							</div>
							<div className="w-16 text-center text-xs sm:text-sm md:text-base font-semibold text-white-50">
								{results[id] ? `${results[id]} место` : "-"}
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
