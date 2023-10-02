import { useMutation } from "react-query";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { useLogin } from "./login";
import { useAuthDispatchContext } from "@/providers/AuthProvider";

const register = async (user) => {
	return await fetchWithCsrf("http://34.174.230.159:8080/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
		body: JSON.stringify(user)
	})
	.then(res => {
		if(!res.ok) throw new Error("Error registering user");
		return res.json();
	})
}

export const useRegister = () => {
	const setSnackPack = useSnackbarDispatchContext();
	const loginQuery = useLogin();
	const setAuth = useAuthDispatchContext();
	return useMutation({
		queryKey: ["register"],
		mutationFn: register,
		onSuccess: (user) => {
			loginQuery.mutate(user);
		},
		onError: () => {
			setAuth({ isLoggedIn: false });
			setSnackPack(prev => [ ...prev, { message: "Error registering user", key: new Date().getTime(), severity: "error" }]);
		}
	})
}