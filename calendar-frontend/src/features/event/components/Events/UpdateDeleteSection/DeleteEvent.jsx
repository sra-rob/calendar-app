import { useState } from "react";
import { Dialog } from "@/components/Elements";
import { OutlinedButton } from "@/components/Elements";
import { Button } from "@/components/Elements/Button";
import { useDeleteEvent } from "@/features/event/api/deleteEvent";
import { Spinner } from "@/components/Elements/Spinner/Spinner";
import { useEventContext } from "@/providers/EventProvider";

export const DeleteEvent = ({ event }) => {
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const { displayedDate } = useEventContext();
	const deleteEvent = useDeleteEvent(displayedDate, event.id);
	const onClose = () => setDialogOpen(false);
	const handleOpenDialog = () => setDialogOpen(true);
	const handleDelete = (id) => {
		deleteEvent.mutate({ id });
		setDialogOpen(false);
	}
	return(
		<>
			{(deleteEvent.isLoading || deleteEvent.isFetching) && <Spinner />}
			<Dialog 
				open={dialogOpen}
				onClose={onClose}
				title="Delete Event"
				text="Are you sure? This action cannot be undone."
			>
				<OutlinedButton 
					text="delete"
					onClick={() => handleDelete(event.id)}
					variant="outlined"
					buttonType="primary"
				/>
				<Button 
					text="cancel"
					onClick={onClose}
					buttonType="primary"
				/>
			</Dialog>
			<OutlinedButton 
				text="Delete"
				variant="outlined"
				buttonType="primary"
				onClick={handleOpenDialog}
			/>		
		</>
	);
}