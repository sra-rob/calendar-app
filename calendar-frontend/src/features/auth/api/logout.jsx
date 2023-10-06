import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const logout = async () => {
	return await fetchWithCsrf("http://calendar-site.online:8080/api/v1/auth/logout", {
		method: "POST",
		credentials: "include"
	})
}

export const useLogout = () => {
	const navigate = useNavigate();
	const setAuth = useAuthDispatchContext();
	return useMutation({
		queryKey: "logout",
		mutationFn: logout,
		onSuccess: () => {
			navigate("/auth/login");
			setAuth({ isLoggedIn: false })
		},
		onFailure: () => {
			setAuth({ isLoggedIn: false });
		}
	});
}