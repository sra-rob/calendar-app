import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const deleteEvent = (params) => {
	const { id } = params;
	return fetchWithCsrf(`http://34.174.230.159:8080/api/v1/event/${id}`, {
		method: "DELETE",
		credentials: "include"
	})
	.then(res => {
		if(!res.ok) throw new Error("really bad error");
	})
}
export const useDeleteEvent = (displayedDate, id) => {
	const queryClient = useQueryClient();
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	const { startDate: prevStartDate, endDate: prevEndDate } = calculateDateInterval(dayjs(displayedDate).subtract(1, "month"));
	const { startDate: nextStartDate, endDate: nextEndDate } = calculateDateInterval(dayjs(displayedDate).add(1, "month"));
	const setSnackPack = useSnackbarDispatchContext();
	const setAuth = useAuthDispatchContext();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			const prevData = queryClient.getQueryData(["dateInterval", (prevStartDate + prevEndDate)]);
			queryClient.setQueryData(["dateInterval", (startDate + endDate)], (oldData) => {
				return (oldData || []).filter(data => data.id !== id);
			});
			if(prevData !== undefined && prevData !== null) {
				queryClient.setQueryData(["dateInterval", (prevStartDate + prevEndDate)], (oldData) => {
					return (oldData || []).filter(data => data.id !== id);
				});
			}
			const nextData = queryClient.getQueryData(["dateInterval", (nextStartDate + nextEndDate)]);
			if(nextData !== undefined && nextData !== null) {
				queryClient.setQueryData(["dateInterval", (nextStartDate + nextEndDate)], (oldData) => {
					return (oldData || []).filter(data => data.id !== id);
				});
			}
			setSnackPack(prev => [ ...prev, { message: "Event deleted", key: new Date().getTime(), severity: "success" }]);
		},
		onError: () => {
			setAuth({ isLoggedIn: false });
			navigate("/auth/login");
			setSnackPack(prev => [ ...prev, { message: "Error deleting event", key: new Date().getTime(), severity: "error" }]);
		}
	});
}