import { useMutation } from "react-query";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

export const login = async (params) => {
	const { username, password } = params;
	const userDetails = { username, password };
	return await fetchWithCsrf("http://calendar-site.online:8080/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userDetails),
		credentials: "include"
	})
	.then(res => {
		if(!res.ok) {
			throw new Error(res.type + " error");
		}
	})
}

export const useLogin = () => {
	const setAuth = useAuthDispatchContext();
	const navigate = useNavigate();
	const setSnackbar = useSnackbarDispatchContext();
	return useMutation({
		mutationFn: login,
		queryKey: ["login"],
		onSuccess: () => {
			setAuth({ isLoggedIn: true });
			navigate("/app/events");
		},
		onError: () => {
			setAuth({ isLoggedIn: false });
			setSnackbar(prev => [ ...prev, { message: "Error logging in", key: new Date().getTime(), severity: "error" }]);
		}
	});
}