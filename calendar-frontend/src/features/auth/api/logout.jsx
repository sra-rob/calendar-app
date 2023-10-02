import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useNavigate } from "react-router-dom";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const logout = async () => {
	return await fetchWithCsrf("http://34.174.230.159:8080/auth/logout", {
		method: "POST",
		credentials: "include"
	})
}

export const useLogout = () => {
	const navigate = useNavigate();
	const setAuth = useAuthDispatchContext();
	return useAuthMutation({
		queryKey: "logout",
		mutationFn: logout,
		onSuccess: () => {
			navigate(0);
			setAuth({ isLoggedIn: false })
		},
		onFailure: () => {

		}
	});
}