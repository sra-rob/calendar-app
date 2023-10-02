import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";
import { useAuthDispatchContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const updateEvent = async (params) => {
	const { event } = params;
	return await fetchWithCsrf("http://34.174.230.159:8080/api/v1/event", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
		credentials: "include"
	})
	.then(res => res.json());
}

const eventMapper = (oldEvent, newEvent) => {
	oldEvent.title = newEvent.title;
	oldEvent.startDate = newEvent.startDate;
	oldEvent.startTime = newEvent.startTime;
	oldEvent.endTime = newEvent.endTime;
}

export const useUpdateEvent = (displayedDate) => {
	const queryClient = useQueryClient();
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	const setSnackPack = useSnackbarDispatchContext();
	const setAuth = useAuthDispatchContext();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateEvent,
		onSuccess: (res) => {
			const currKey = ["dateInterval", (startDate + endDate)];
			queryClient.setQueryData(currKey, oldEvents => {
				if(!oldEvents) return [ res ];
				const eventToUpdate = oldEvents.filter(events => events.id === res.id)[0];
				eventMapper(eventToUpdate, res);
				return oldEvents;
			});
			setSnackPack(prev => [ ...prev, { message: "Event updated", key: new Date().getTime(), severity: "success" }]);
		},
		onError: () => {
			setAuth({ isLoggedIn: false });
			navigate("/auth/login");
			setSnackPack(prev => [ ...prev, { message: "Error updating event", key: new Date().getTime(), severity: "error" }]);
		}
	});
}