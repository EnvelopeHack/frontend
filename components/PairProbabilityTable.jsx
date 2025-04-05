import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import RunnerSquare from "./RunnerSquare";

const PairProbabilityTable = ({ data }) => {
	return (
		<div className="flex flex-col items-center w-full ml-4 mr-0 lg:mr-4 lg:ml-0">
			<h2 className="table-header">Парная статистика</h2>
			<Table>
				<TableHeader>
					<TableRow className="border-none">
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="1" size="32" className="mx-auto" />
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="2" size="32" className="mx-auto" />
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="3" size="32" className="mx-auto" />
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="4" size="32" className="mx-auto" />
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="5" size="32" className="mx-auto" />
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<RunnerSquare place={"2"} number="6" size="32" className="mx-auto" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={index} className="text-center border-none">
							{row.map((value, colIndex) => (
								<TableCell key={colIndex} className="py-0 border-b w-[44px] h-[51px]">
									{(value * 100).toFixed(1)} %
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default PairProbabilityTable;
