import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect } from "../../../hooks/useConnect";
import { useWeb3Context } from "../../../contexts";

export const ValidateNetWorks = ({ children }) => {
	const { web3 } = useWeb3Context();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { auth, logged, userToken } = useConnect();

	useEffect(() => {
		if (web3.wallet !== null && web3.account) {
			userToken();
		}
	}, [web3.wallet, web3.account]);

	useEffect(() => {
		if (!auth && logged) {
			router.push("/login");
		} else if (logged && web3.wallet !== null && web3.account) {
			setLoading(true);
		}
	}, [logged, loading, web3.wallet, web3.account]);
	return <>{children}</>;
};
