import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { useSnackbarDispatchContext } from "@/providers/SnackbarProvider";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const updateEvent = (params) => {
	const { event } = params;
	return fetchWithCsrf("http://34.174.200.5:8080/api/v1/event", {
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
	const { startDate: prevStartDate, endDate: prevEndDate } = calculateDateInterval(dayjs(displayedDate).subtract(1, "month"));
	const { startDate: nextStartDate, endDate: nextEndDate } = calculateDateInterval(dayjs(displayedDate).add(1, "month"));
	const setSnackPack = useSnackbarDispatchContext();
	return useMutation({
		mutationFn: updateEvent,
		onSuccess: (res) => {
			const prevKey = ["dateInterval", (prevStartDate + prevEndDate)];
			const currKey = ["dateInterval", (startDate + endDate)];
			const nextKey = ["dateInterval", (nextStartDate + nextEndDate)];
			queryClient.setQueryData(prevKey, oldEvents => {
				if(!oldEvents) return [ res ];
				const eventToUpdate = oldEvents.filter(events => events.id === res.id)[0];
				eventMapper(eventToUpdate, res);
				return oldEvents;
			});
			queryClient.setQueryData(currKey, oldEvents => {
				if(!oldEvents) return [ res ];
				const eventToUpdate = oldEvents.filter(events => events.id === res.id)[0];
				eventMapper(eventToUpdate, res);
				return oldEvents;
			});
			queryClient.setQueryData(nextKey, oldEvents => {
				if(!oldEvents) return [ res ];
				const eventToUpdate = oldEvents.filter(events => events.id === res.id)[0];
				eventMapper(eventToUpdate, res);
				return oldEvents;
			});
			setSnackPack(prev => [ ...prev, { message: "Event updated", key: new Date().getTime(), severity: "success" }]);
		},
		onError: () => {
			setSnackPack(prev => [ ...prev, { message: "Error updating event", key: new Date().getTime(), severity: "error" }]);
		}
	});
}