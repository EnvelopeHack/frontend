import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const PlacesProbabilityTable = async ({ data }) => {
	return (
		<div className="flex flex-col items-center w-full ml-4">
			<h2 className="table-header">Вероятности занятия места</h2>
			<Table>
				<TableHeader>
					<TableRow className="border-none">
						<TableHead className="text-center py-3 border-b">
							<span className="bg-gold w-8 h-8 rounded-[4px] flex-center mx-auto">1</span>
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<span className="bg-silver w-8 h-8 rounded-[4px] flex-center mx-auto">2</span>
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<span className="bg-bronze w-8 h-8 rounded-[4px] flex-center mx-auto">3</span>
						</TableHead>
						<TableHead className="text-center border-b">4</TableHead>
						<TableHead className="text-center border-b">5</TableHead>
						<TableHead className="text-center border-b">6</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((probs) => (
						<TableRow key={probs.id} className="text-center border-none">
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForFirst * 100).toFixed(1)} %
							</TableCell>
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForSecond * 100).toFixed(1)} %
							</TableCell>
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForThird * 100).toFixed(1)} %
							</TableCell>
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForFourth * 100).toFixed(1)} %
							</TableCell>
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForFifth * 100).toFixed(1)} %
							</TableCell>
							<TableCell className="py-0 border-b w-[44px] h-[51px]">
								{(probs.probabilityForSixth * 100).toFixed(1)} %
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default PlacesProbabilityTable;
