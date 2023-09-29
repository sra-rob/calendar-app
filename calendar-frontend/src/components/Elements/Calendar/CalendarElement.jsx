import dayjs from "dayjs";
import { css } from "@emotion/react";
import { Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from "@mui/x-date-pickers";
import { formatDate } from "@/utils/calculateDateInterval";

export const CalendarElement = ({ 
	handleDateChange, loading, handleMonthChange, 
	handleYearChange, highlightedDays, selectedDate,
	displayedDate
}) => {
	const HighlightedDays = ({ highlightedDays = [], day }) => {
		day = formatDate(dayjs(day));
		const firstDateOfMonth = formatDate(dayjs(displayedDate).startOf("month"));
		const lastDateOfMonth = formatDate(dayjs(displayedDate).endOf("month"));
		const outsideOfMonth = dayjs(day).isBefore(firstDateOfMonth, "day") || dayjs(day).isAfter(lastDateOfMonth, "day");
		const isHighlighted = highlightedDays.includes(day);
		const isSelected = dayjs(day).isSame(selectedDate);
		const isToday = dayjs(day).isSame(formatDate(dayjs()));
		const outsideOfMonthStyles = css`
			color: var(--color-primary-100);
		`;
		const highlightedStyles = css`
			border: 1px solid var(--color-accent-400);
		`;
		const selectedStyles = css`
			border: 1px solid var(--color-accent-400);
			background: var(--color-accent-400);
			color: var(--color-white);
			&:focus {
				background: var(--color-accent-400);
				color: var(--color-white);
			}
		`;
		return(
			<div>
				<PickersDay 
					css={css`
						line-height: 0;
						${outsideOfMonth && outsideOfMonthStyles}
						${isHighlighted && highlightedStyles}
						${isSelected && selectedStyles}
						&:hover {
							background: var(--color-accent-400);
							color: var(--color-white);
						}
					`}
					day={day} 
					onDaySelect={handleDateChange} 
					outsideCurrentMonth={false}
					isLastVisibleCell={false}
					isFirstVisibleCell={false}
				/>
				{
					isToday && <div css={css`
						height: 4px;
						width: 4px;
						background: var(--color-primary-400);
						position: relative;
						bottom: 8px;
						margin: 0 auto;
						border-radius: 100%;
				`}></div>
				}
			</div>
		);
}
	return(
		<Paper 
			elevation={4}
		>
			<h1 css={css`margin-top: 1rem; margin-left: 1.3rem;`}>Calendar</h1>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar 
					value={dayjs(selectedDate)}
					showDaysOutsideCurrentMonth
					onChange={handleDateChange}
					onMonthChange={handleMonthChange}
					onYearChange={handleYearChange}
					slots={{
						day: HighlightedDays
					}}
					slotProps={{
						day: loading ? {
							highlightedDays: [selectedDate]
						} : {
							highlightedDays,
						},
					}}
				/>
			</LocalizationProvider>
		</Paper>
	);
}