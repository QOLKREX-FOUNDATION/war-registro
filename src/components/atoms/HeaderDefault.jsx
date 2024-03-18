import React from "react";

const HeaderDefault = ({ category, title, render }) => (
	<div className=" mb-10 capitalize">
		<p className="text-lg text-gray-400">{category}</p>
		<div className="flex justify-center">
			<p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white w-2/4">
				{title}
			</p>
			<div className="w-2/4">{render()}</div>
		</div>
	</div>
);

export default HeaderDefault;
