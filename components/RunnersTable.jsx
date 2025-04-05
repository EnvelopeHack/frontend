import React from "react";
import RunnerSquare from "./RunnerSquare";

const RunnersTable = ({ placeNumber = null, size = 44, className = "" }) => {
	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<RunnerSquare number="1" place={placeNumber && placeNumber} />
			<RunnerSquare number="2" place={placeNumber && placeNumber} />
			<RunnerSquare number="3" place={placeNumber && placeNumber} />
			<RunnerSquare number="4" place={placeNumber && placeNumber} />
			<RunnerSquare number="5" place={placeNumber && placeNumber} />
			<RunnerSquare number="6" place={placeNumber && placeNumber} />
		</div>
	);
};

export default RunnersTable;
