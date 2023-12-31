import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useQueryClient } from "react-query";
import { API_URL } from "@/environment";

const logout = async () => {
	return await fetchWithCsrf(`${API_URL}/api/v1/auth/logout`, {
		method: "POST",
		credentials: "include"
	})
}

export const useLogout = () => {
	const navigate = useNavigate();
	const setAuth = useAuthDispatchContext();
	const queryClient = useQueryClient();
	return useMutation({
		queryKey: "logout",
		mutationFn: logout,
		onSuccess: () => {
			queryClient.clear();
			navigate("/auth/login");
			setAuth({ isLoggedIn: false })
		},
		onFailure: () => {
			queryClient.clear();
			setAuth({ isLoggedIn: false });
		}
	});
}