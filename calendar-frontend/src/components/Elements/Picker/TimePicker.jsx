import { css } from '@emotion/react';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';

export const TimePicker = ({ label, value, form, formKey, setForm }) => {
	let time = undefined;
	if(value) {
		const [ hours, minutes ] = value.split(":");
		time = dayjs().set("hours", hours).set("minutes", minutes);
	}
	const handleOnChange = (val) => {
		if(val) {
			form.set(formKey, dayjs(val).format("HH:mm:ss.SSS"));
		} else form.set(formKey, val);
		setForm(form)
	}
	return(
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MuiTimePicker 
				label={label} 
				defaultValue={time}
				onChange={handleOnChange}
				slotProps={{
					actionBar: {
						actions: ["clear"]
					}
				}}
				css={
					css`
						width: 100%;
					`
				}
			/>
		</LocalizationProvider>
	)
}