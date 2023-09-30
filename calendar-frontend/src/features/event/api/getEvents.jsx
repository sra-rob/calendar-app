import { useQuery } from "react-query";
import { calculateDateInterval } from "@/utils/calculateDateInterval";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

export const getEvents = (startDate, endDate) => {
	return fetchWithCsrf(`http://34.174.200.5:8080/api/v1/event/${startDate}/${endDate}`, {
		credentials: "include"
	})
		.then(res => res.json());
}

export const useEvents = (displayedDate) => {
	const { startDate, endDate } = calculateDateInterval(displayedDate);
	return useQuery({
		queryKey: ["dateInterval", (startDate + endDate)],
		queryFn: () => getEvents(startDate, endDate)
	});
}