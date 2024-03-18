import React from "react";

const HeaderDefault = ({ category, title, render }) => (
	<div className=" mb-10 capitalize pl-4 pt-10">
		<div className="flex justify-center items-center">
			<div className="flex flex-col w-full">
				<p className="text-lg text-gray-400 flex items-center">{category}</p>
				<p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white w-full max-w-lg">
					{title}
				</p>
			</div>
			<div className="w-2/4">{render()}</div>
		</div>
	</div>
);

export default HeaderDefault;
