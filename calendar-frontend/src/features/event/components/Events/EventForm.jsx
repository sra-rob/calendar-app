
import { Modal } from "@/components/Elements/Modal/Modal";
import { Button } from "@/components/Elements";
import { Form } from "@/components/Form";
import { InputGroup } from "@/components/Form";
import { TextField } from "@mui/material";
import { RowContainer } from "@/components/Elements";
import { DatePicker } from "@/components/Elements";
import { TimePicker } from "@/components/Elements";

export const EventForm = ({
	open, onClose, buttonText, onSubmit, event, selectedDate, formTitle,
	form, setForm
}) => {
	const title = event ? event.title : "";
	const startDate = event ? event.startDate : selectedDate;
	const startTime = event ? event.startTime : undefined;
	const endTime = event ? event.endTime : undefined;
	const handleTextFieldChange = (e) => {
		form.set("title", e.target.value);
		setForm(form);
	}
	return(
		<Modal
			title={formTitle}
			open={open}
			onClose={onClose}
			buttonText="Update"
		>
			<Form 
				onSubmit={onSubmit}
			>
				<InputGroup>
					<TextField 
						label="Event name (Required)" 
						fullWidth 
						defaultValue={title}
						onChange={handleTextFieldChange}
						required
					/>
				</InputGroup>
				<RowContainer
					justifyContent="space-between"
				>
					<DatePicker 
						label="Event date (Required)" 
						value={startDate}
						formKey="startDate"
						form={form}
						setForm={setForm}
					/>
				</RowContainer>
				<RowContainer
					justifyContent="space-between"
				>
					<TimePicker 
						label="Start time (Optional)" 
						value={startTime}
						formKey="startTime"
						form={form}
						setForm={setForm}
					/>
					<TimePicker 
						label="End time (Optional)" 
						value={endTime}
						formKey="endTime"
						form={form}
						setForm={setForm}
					/>
				</RowContainer>
				<Button 
					text={buttonText}
					buttonType="accent"
					type="submit"
				/>
			</Form>
		</Modal>
	);
}