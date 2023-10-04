import { useQuery } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useNavigate } from "react-router-dom";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";

export const getEvents = (startDate, endDate) => {
	return fetchWithCsrf(`http://34.174.200.5:8080/api/v1/event/${startDate}/${endDate}`, {
		credentials: "include"
	})
		.then(res => res.json());
}

export const useEvents = (displayedDate) => {
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	const setAuth = useAuthDispatchContext();
	const navigate = useNavigate();
	const setSnackPack = useSnackbarDispatchContext();
	return useQuery({
		queryKey: ["dateInterval", (startDate + endDate)],
		queryFn: () => getEvents(startDate, endDate),
		onError: () => {
			setAuth({ isLoggedIn: false });
			navigate("/auth/login");
			setSnackPack(prev => [ ...prev, { message: "Error getting events", key: new Date().getTime(), severity: "error" }]);
		}
	});
}