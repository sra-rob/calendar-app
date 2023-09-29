import dayjs from "dayjs";

export const formatDate = date => {
	return dayjs(date).format("YYYY-MM-DD");
}

export const calculateDateInterval = (displayedDate) => {
	const firstDayOfMonth = dayjs(displayedDate).day();
	const dateIntervalStart = formatDate(dayjs(displayedDate)
		.subtract(firstDayOfMonth, "day"));
	const daysInMonth = dayjs(displayedDate).daysInMonth();
	const lastDateOfMonth = formatDate(dayjs(displayedDate)
		.add(daysInMonth - 1, "days"));
	const lastDayOfMonth = dayjs(lastDateOfMonth).day();
	let daysToAdd = 0;
	if(lastDayOfMonth < 6) {
		daysToAdd += 6 - lastDayOfMonth;
	}
	const dateIntervalEnd = formatDate(dayjs(lastDateOfMonth).add(daysToAdd, "day"));
	return {
		startDate: dateIntervalStart,
		endDate: dateIntervalEnd
	}
} 