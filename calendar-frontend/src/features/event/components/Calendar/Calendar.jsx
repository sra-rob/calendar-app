import { useState } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { useEvents } from "@/features/event/api/getEvents";
import { Spinner } from "@/components/Elements";
import { CalendarElement as CalendarElement } from "@/components/Elements";
import { EventList } from "@/features/event/components/Events";
import { formatDate } from "@/utils/calculateDateInterval";
import { useEventContext } from "@/providers/EventProvider";
import { useEventDispatchContext } from "@/providers/EventProvider";

export const Calendar = () => {
	const [ selectedDate, setSelectedDate ] = useState(formatDate(dayjs()));
	const event = useEventContext();
	const { displayedDate } = event;
	const setEvent = useEventDispatchContext();
	const setDisplayedDate = value => setEvent({ ...event, ["displayedDate"]: value });
	const formData = new FormData();
	formData.set("startDate", selectedDate);
	const [ form, setForm ] = useState(formData);
	const handleDateChange = date => {
		form.set("startDate", formatDate(dayjs(date)));
		setForm(form);
		setSelectedDate(date);
	}
	const handleMonthChange = date => {
		let newDate = dayjs(date);
		const maxDaysInNewMonth = dayjs(date).daysInMonth();
		const currentSelectedDate = dayjs(selectedDate).get("date");		
		newDate = (currentSelectedDate > maxDaysInNewMonth) 
		?
			dayjs(newDate).set("date", maxDaysInNewMonth)
		: 
			dayjs(newDate).set("date", dayjs(selectedDate).date());
		setSelectedDate(formatDate(newDate));
		setDisplayedDate(formatDate(dayjs(date).startOf("month")));
	}
	const handleYearChange = date => {
		let newDate = dayjs(selectedDate).set("year", dayjs(date).year());
		setSelectedDate(formatDate(newDate));
		setDisplayedDate(formatDate(dayjs(date).startOf("month")));
	}
	const eventsQuery = useEvents(displayedDate);
	if(eventsQuery.isError) return <h1>We weren't able to load your events</h1>;
	const highlightedDays = [];
	const eventsOnSelectedDay = [];
	const todaysEvents = [];
	if(!eventsQuery.isLoading && !eventsQuery.isRefetching) {
		eventsQuery.data.forEach(event => {
			highlightedDays.push(formatDate(dayjs(event.startDate)));
			if(dayjs(event.startDate).isSame(selectedDate)) {
				eventsOnSelectedDay.push(event);
			}
		});
		todaysEvents.push(...eventsQuery.data.filter(event => event.startDate === selectedDate))
		todaysEvents.sort((a, b) =>{
			if(!a.startTime) return 1;
			if(!b.startTime) return -1;
			const [ startTimeA, endTimeA ] = a.startTime.split(":");
			const [ startTimeB, endTimeB ] = b.startTime.split(":");
			const dateA = dayjs(a.startDate).set("hours", startTimeA).set("minutes", endTimeA);
			const dateB = dayjs(b.startDate).set("hours", startTimeB).set("minutes", endTimeB);
			return dateA.isBefore(dateB) ? -1 : 1;
		})
	}
	return(
		<>
			{(eventsQuery.isLoading || eventsQuery.isRefetching) && <Spinner />}
			<div
				css={css`
					display: flex;
					height: 396px;
					flex-direction: column;
					gap: 1rem;
					padding-block: 0rem;
					@media(min-width: 800px) {
						flex-direction: row;
					}
				`}
			>
				<CalendarElement 
					handleDateChange={handleDateChange}
					loading={eventsQuery.isLoading}
					handleMonthChange={handleMonthChange}
					handleYearChange={handleYearChange}
					highlightedDays={highlightedDays}
					selectedDate={selectedDate}
					displayedDate={displayedDate}
				/>
				<EventList 
					eventsOnSelectedDay={eventsOnSelectedDay}
					todaysEvents={todaysEvents}
					selectedDate={selectedDate}
					form={form}
					setForm={setForm}
				/>
			</div>
		</>
	)
}