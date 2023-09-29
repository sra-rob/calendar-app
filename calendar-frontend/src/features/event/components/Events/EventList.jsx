import { useState } from "react";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import { Paper } from "@mui/material";
import { Button } from "@/components/Elements";
import { Events } from "./Events";
import { EventForm } from "./EventForm";
import { useCreateEvent } from "@/features/event/api/createEvent";
import { Spinner } from "@/components/Elements/Spinner/Spinner";
import { formatDate } from "@/utils/calculateDateInterval";

export const EventList = ({ todaysEvents, selectedDate, form, setForm}) => {
	const [ modalOpen, setModalOpen ] = useState(false);
	const createEvent = useCreateEvent();
	const handleOpenModal = () => {
		setModalOpen(true);
	}
	const onClose = () => {
		setModalOpen(false);
	}
	const onSubmit = (e) => {
		e.preventDefault();
		const title = form.get("title");
		const startDate = form.get("startDate");
		const startTime = form.get("startTime");
		const endTime = form.get("endTime");
		const isValid = startDate != "Invalid Date" 
		&& startTime != "Invalid Date"
		&& endTime != "Invalid Date"
		&& title.length > 0;
		if(!isValid) return;
		const event = Object.fromEntries(form.entries());
		for(const [key, value] of Object.entries(event)) {
			if(value === "null") {
				delete event[key];
			}
		}
		event.startDate = formatDate(dayjs(startDate));
		createEvent.mutate({ event });
		form.set("startTime", null);
		form.set("endTime", null);
		setForm(form); 
		setModalOpen(false);
	}
	const eventListDate = dayjs(selectedDate).format("M-D-YYYY");
	return(
		<>
			{(createEvent.isLoading || createEvent.isFetching) && <Spinner />}
			<div
				css={css`
					&::after {
						content: "";
						display: block;
						height: 1rem;
						width: 100%;
					}
				`}
			>
				<EventForm 
					formTitle="Create Event"
					buttonText="Create"
					open={modalOpen}
					onClose={onClose}
					onSubmit={onSubmit}
					event={{ startDate: selectedDate }}
					form={form}
					setForm={setForm}
				/>
				<Paper 
					elevation={4}
					css={css`
						height: calc(460px - 4rem);
						width: 320px;
						padding: 1rem;
						display: flex;
						gap: 1rem;
						flex-direction: column;
					`}
				>
					<div
						css={css`
							display: flex;
							justify-content: space-between;
							align-items: center;
						`}
					>
						<h1>Events</h1>
						<Button 
							text="Create"
							buttonType="accent"
							onClick={handleOpenModal}
						/>
					</div>
					<p 
						css={css`
							width: fit-content;
							border-bottom: 1px dashed var(--color-primary-400);
							font-size: 1.3rem;
						`}
					>
						{eventListDate}
					</p>
					<Events 
						todaysEvents={todaysEvents} 
					/>
				</Paper>
			</div>
		</>
	);
}