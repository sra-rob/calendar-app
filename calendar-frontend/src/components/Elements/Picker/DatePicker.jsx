import { css } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

export const DatePicker = ({ label, value, name, form, formKey, setForm }) => {
	const handleOnChange = (val) => {
		form.set(formKey, dayjs(val));
		setForm(form)
	}
	return(
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MuiDatePicker 
				name={name}
				label={label} 
				defaultValue={dayjs(value)}
				onChange={handleOnChange}
				css={
					css`
						width: 100%;
					`
				} 
				/>
		</LocalizationProvider>
	)
}