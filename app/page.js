import ChartStat from "@/components/ChartStat";
import PairProbabilityTable from "@/components/PairProbabilityTable";
import PlacesProbabilityTable from "@/components/PlacesProbabilityTable";
import RunnersTable from "@/components/RunnersTable";
import TopsProbabilityTable from "@/components/TopsProbabilityTable";
import TrackSimulation from "@/components/TrackSimulation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function Home() {
	const [placeTable, top2and3, pares, statistics] = await Promise.all([
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/place-table").then((res) =>
			res.json()
		),
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/top2and3").then((res) =>
			res.json()
		),
		fetch("https://electives.t-university.exfl.ru/api/v1/probabilities/pares").then((res) =>
			res.json()
		),
		fetch("https://electives.t-university.exfl.ru/api/v1/statistics").then((res) => res.json()),
	]);

	const simulationData = {
		second: 3,
		positions: {
			1: 30.78,
			2: 30.61,
			3: 29.14,
			4: 29.75,
			5: 28.59,
			6: 28.73,
		},
	};

	return (
		<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr] gap-x-3 gap-y-8 container mt-4">
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
				<TrackSimulation data={simulationData} />
			</div>
		</main>
	);
}
