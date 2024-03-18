import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

export const Select = ({
	name = false,
	required = false,
	formInput = {},
	onBlur = () => false,
	onChange = {},
	onKeyUp = () => false,
	options = [],
	readOnly = false,
}) => {
	const { currentColor } = useStateContext();

	return (
		<div className=" relative">
			<label className="text-gray-700 text-xs">
				<p className="capitalize mb-2" style={{ color: currentColor }}>
					{name}
					{required && <span className="text-red-500 required-dot"> *</span>}
				</p>
			</label>
			<select
				disabled={readOnly}
				className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-xs focus:outline-none focus:ring-2 focus:border-transparent  dark:bg-slate-700 dark:text-white"
				{...formInput}
				{...onChange}
				onBlur={onBlur}
				onKeyUp={onKeyUp}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
