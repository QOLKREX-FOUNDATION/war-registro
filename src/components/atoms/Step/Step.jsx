export const Step = ({ wizard, quantity }) => {
	return (
		<div className="flex justify-center gap-4 mb-4">
			{quantity.map((q) => (
				<span
					key={q}
					className={`w-4 h-4 rounded-full block m-0 p-0 cursor-pointer ba  ${
						wizard === q ? "bg-blue-500" : "bg-gray-300"}
					}`}
				></span>
			))}
		</div>
	);
};
