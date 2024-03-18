import { LoginView } from "../../components/templates/LoginView";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect } from "../../hooks/useConnect";
import { Web3Context } from "../../contexts/Web3/Web3Context";

export default function LoginMain() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { web3 } = useContext(Web3Context);
	const { auth, logged, adopterToken, userToken } = useConnect();

	useEffect(() => {
		adopterToken();
	}, []);

	useEffect(() => {
		if (web3.wallet !== null && web3.account) {
			userToken();
		}
	}, [web3.wallet, web3.account]);

	useEffect(() => {
		if (auth && logged) {
			web3.rol === "adopter" ? router.push("/adopter") : router.push("/admin");
		} else if (logged) {
			setLoading(true);
		}
	}, [auth, logged]);

	return <>{loading && logged && !auth && <LoginView />}</>;
}
