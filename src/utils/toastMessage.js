import { toast } from "react-toastify";

export const toastMessage = ({
	type = "success",
	text,
	options = {
		theme: "colored",
	},
}) => {
	toast[type](text, options);
};
