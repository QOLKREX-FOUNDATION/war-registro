import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

export const FileInput = ({
	name = false,
	id = "",
	formInput = {},
	onChange = {},
	error = {},
	required = false,
	readOnly = false,
	accept = "image/*",
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
			<input
				type="file"
				{...formInput}
				{...onChange}
				id={id}
				readOnly={readOnly}
				accept={accept}
			/>
			{error && <small className="text-red-400">{error.message}</small>}
		</div>
	);
};
