import { useEffect, useState } from "react";

export const Error = ({ bandera=false, value, name, setValue, text = "" }) => {
	const [error, setError] = useState("");
	

	useEffect(() => {
		bandera && setError(value);
	}, [bandera]);

	useEffect(() => {
		if(bandera){
			setValue(name , "");
		} 
	}, [bandera]);

	return (
		<small className="text-red-400 text-xs">
			{bandera && `${error} - ${text}`}
		</small>
	);
};
