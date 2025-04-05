import React from "react";

const RunnerSquare = ({ number, place = null, size = 44, className = "" }) => {
	const color =
		number == 1
			? "oklch(50.5% 0.213 27.518)"
			: number == 2
			? " oklch(48.8% 0.243 264.376)"
			: number == 3
			? " oklch(55.3% 0.195 38.402)"
			: number == 4
			? "oklch(52.7% 0.154 150.069)"
			: number == 5
			? "oklch(49.6% 0.265 301.924)"
			: "oklch(21.6% 0.006 56.043)";

	return (
		<p
			className={`flex-center rounded-[4px] relative ${className}`}
			style={{
				backgroundColor: `${color}`,
				width: `${size}px`,
				height: `${size}px`,
			}}
		>
			{number}
			{place && (
				<span
					className={`absolute -top-1 -right-1 w-4 h-4 text-sm flex-center ${
						place == "1" ? "bg-gold" : "bg-silver"
					}`}
				>
					{place}
				</span>
			)}
		</p>
	);
};

export default RunnerSquare;
