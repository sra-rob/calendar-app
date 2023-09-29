import { useState } from "react";
import { Button } from "@/components/Elements";
import { EventForm } from "@/features/event/components/Events";
import { useUpdateEvent } from "@/features/event/api/updateEvent";
import { Spinner } from "@/components/Elements/Spinner/Spinner";
import { useEventContext } from "@/providers/EventProvider";
import { formatDate } from "@/utils/calculateDateInterval";

export const UpdateEvent = ({ event }) => {
	const [ modalOpen, setModalOpen ] = useState(false);
	const { displayedDate } = useEventContext();
	const updateEvent = useUpdateEvent(displayedDate);
	const formData = new FormData();
	formData.set("id", event.id);
	formData.set("title", event.title);
	formData.set("startDate", event.startDate);
	formData.set("startTime", event.startTime);
	formData.set("endTime", event.endTime)
	const [ form, setForm ] = useState(formData);
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
		event.startDate = formatDate(event.startDate);
		updateEvent.mutate({ event });
		setModalOpen(false);
	}
	const handleOpenModal = () => setModalOpen(true);
	const onClose = () => setModalOpen(false);
	return(
		<>
			{(updateEvent.isLoading || updateEvent.isFetching) && <Spinner />}
			<EventForm 
				formTitle="Update Event"
				buttonText="Update"
				open={modalOpen}
				onClose={onClose}
				event={event}
				onSubmit={onSubmit}
				form={form}
				setForm={setForm}
			/>
			<Button 
				text="Update" 
				buttonType="accent" 
				type="submit" 
				onClick={handleOpenModal}
			/>
		</>
	);
}