import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const deleteEvent = (params) => {
	const { id } = params;
	fetchWithCsrf(`http://localhost:8080/api/v1/event/${id}`, {
		method: "DELETE",
		headers: {
		},
		credentials: "include"
	});
}

export const useDeleteEvent = (displayedDate, id) => {
	const queryClient = useQueryClient();
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	const { startDate: prevStartDate, endDate: prevEndDate } = calculateDateInterval(dayjs(displayedDate).subtract(1, "month"));
	const { startDate: nextStartDate, endDate: nextEndDate } = calculateDateInterval(dayjs(displayedDate).add(1, "month"));
	const setSnackPack = useSnackbarDispatchContext();
	return useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			setSnackPack(prev => [ ...prev, { message: "Event deleted", key: new Date().getTime(), severity: "success" }]);
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
		},
		onFailure: () => {
			setSnackPack(prev => [ ...prev, { message: "Error deleting event", key: new Date().getTime(), severity: "error" }]);
		}
	});
}