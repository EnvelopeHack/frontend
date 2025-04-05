import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const TopsProbabilityTable = ({ data }) => {
	const transposed = data[0].map((_, colIndex) => data.map((row) => row[colIndex]));

	return (
		<div className="flex flex-col items-center w-full ml-4 md:ml-0">
			<h2 className="table-header">Призовые места</h2>
			<Table>
				<TableHeader>
					<TableRow className="border-none">
						<TableHead className="text-center py-3 border-b">
							<div className="flex justify-center gap-1">
								<span className="bg-gold w-8 h-8 rounded-[4px] flex-center">1</span>

								<span className="bg-silver w-8 h-8 rounded-[4px] flex-center">2</span>
							</div>
						</TableHead>
						<TableHead className="text-center py-3 border-b">
							<div className="flex justify-center gap-1">
								<span className="bg-gold w-8 h-8 rounded-[4px] flex-center">1</span>

								<span className="bg-silver w-8 h-8 rounded-[4px] flex-center">2</span>

								<span className="bg-bronze w-8 h-8 rounded-[4px] flex-center">3</span>
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transposed.map((row, index) => (
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

export default TopsProbabilityTable;
