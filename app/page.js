"use server"; // Указываем, что это серверный экшен

import ChartStat from "@/components/ChartStat";
import PairProbabilityTable from "@/components/PairProbabilityTable";
import PlacesProbabilityTable from "@/components/PlacesProbabilityTable";
import RunnersTable from "@/components/RunnersTable";
import TopsProbabilityTable from "@/components/TopsProbabilityTable";
import TrackSimulation from "@/components/TrackSimulation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

async function fetchData() {
	const [placeTable, top2and3, pares, statistics] = await Promise.all([
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/place-table", {
			// Отключаем кэш для тестирования
		}).then((res) => res.json()),
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/top2and3", {}).then(
			(res) => res.json()
		),
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/pares", {}).then((res) =>
			res.json()
		),
		fetch("https://electives.t-university.exfl.ru/api/v1/statistics", {}).then((res) =>
			res.json()
		),
	]);

	console.log("Fetched data on server:", { statistics });
	return { placeTable, top2and3, pares, statistics };
}

export default async function Home() {
	const { placeTable, top2and3, pares, statistics } = await fetchData();

	return (
		<main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_2fr] gap-x-3 gap-y-8 mb-6 container mt-4">
			<div className="flex items-end">
				<RunnersTable />
				<PlacesProbabilityTable data={placeTable} />
			</div>
			<div className="flex items-end">
				<RunnersTable className="md:hidden" />
				<TopsProbabilityTable data={top2and3} />
			</div>
			<div className="flex items-end justify-end col-span-full lg:col-span-1 flex-row-reverse lg:flex-row">
				<PairProbabilityTable data={pares} />
				<RunnersTable placeNumber="1" />
			</div>
			<div className="col-span-full flex flex-col items-center">
				<h2 className="table-header">Занятые места участников за последние 10 забегов</h2>

				<ScrollArea type="always" className="mt-4 self-stretch">
					<ChartStat data={statistics} />
					<ScrollBar className="[&>div]:bg-white-50" orientation="horizontal" />
				</ScrollArea>
			</div>

			<div className="col-span-full">
				<TrackSimulation />
			</div>

			<div className="w-full col-span-full mt-10">
				<video
					src="https://electives.t-university.exfl.ru/video"
					autoPlay
					muted
					controls
					className="max-w-2xl w-full mx-auto rounded-[8px]"
				></video>
			</div>
		</main>
	);
}
