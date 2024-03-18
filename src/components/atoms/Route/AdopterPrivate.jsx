import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect } from "../../../hooks/useConnect";

export const AdopterPrivate = ({ children }) => {

	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { auth, logged, adopterToken } = useConnect();

	useEffect(() => {
		adopterToken();
	}, []);

	useEffect(() => {
		if (!auth && logged) {
			router.push("/login");
		} else if (logged) {
			setLoading(true);
		}
	}, [auth, logged, loading]);

	return <>{children}</>;
	// return <>{loading && logged && auth && children}</>;
};
