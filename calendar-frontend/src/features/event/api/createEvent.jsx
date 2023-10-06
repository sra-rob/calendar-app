import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { useEventContext } from "@/providers/EventProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const createEvent = (params) => {
	const { event } = params;
	return fetchWithCsrf("https://calendar-site.online:8080/api/v1/event", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
		credentials: "include"
	})
	.then(res => res.json());
}

export const useCreateEvent = () => {
	const event = useEventContext();
	const { displayedDate } = event;
	const queryClient = useQueryClient();
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	const { startDate: prevStartDate, endDate: prevEndDate } = calculateDateInterval(dayjs(displayedDate).subtract(1, "month"));
	const { startDate: nextStartDate, endDate: nextEndDate } = calculateDateInterval(dayjs(displayedDate).add(1, "month"));
	const setSnackPack = useSnackbarDispatchContext();
	const setAuth = useAuthDispatchContext();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createEvent,
		onSuccess: (res) => {
			setSnackPack(prev => [ ...prev, { message: "Event added", key: new Date().getTime(), severity: "success" }]);
			const prevKey = ["dateInterval", (prevStartDate + prevEndDate)];
			const currKey = ["dateInterval", (startDate + endDate)];
			const nextKey = ["dateInterval", (nextStartDate + nextEndDate)];
			queryClient.setQueryData(prevKey, oldEvents => {
				if(!oldEvents) return [ res ];
				return [ ...oldEvents, res ];
			});
			queryClient.setQueryData(currKey, oldEvents => {
				if(!oldEvents) return [ res ];
				return [ ...oldEvents, res ];
			});
			queryClient.setQueryData(nextKey, oldEvents => {
				if(!oldEvents) return [ res ];
				return [ ...oldEvents, res ];
			});
		},
		onError: () => {
			setAuth({ isLoggedIn: false });
			navigate("/auth/login");
			setSnackPack(prev => [ ...prev, { message: "Error adding event", key: new Date().getTime(), severity: "error" }]);
		}
	});
}