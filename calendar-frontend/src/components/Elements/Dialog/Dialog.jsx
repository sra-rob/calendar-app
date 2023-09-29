import { css } from "@mui/material";
import { 
	Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText,
	DialogTitle
} from "@mui/material";

export const Dialog = ({ 
	open, onClose, title, text, children
}) => {
	return(
		<MuiDialog
			open={open}
			onClose={onClose}
		>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{children}
			</DialogActions>
		</MuiDialog>
	);
}