import { useState, useEffect } from "react";
import { Snackbar as MuiSnackbar } from "@mui/material"
import { Alert } from "@mui/material";

export const Snackbar = ({
	onClose, snackPack, setSnackPack
}) => {
	const [ snackbarIsOpen, setSnackbarIsOpen ] = useState(false);
	const [ messageInfo, setMessageInfo ] = useState(undefined);
	useEffect(() => {
		if(snackPack.length && !messageInfo) {
			setMessageInfo({ ...snackPack[0] });
			setSnackPack(prev => prev.slice(1));
			setSnackbarIsOpen(true);
		} else if(snackPack.length && messageInfo && snackbarIsOpen) {
			setSnackbarIsOpen(false);
		}
	}, [ snackPack, snackbarIsOpen, messageInfo, setSnackPack ]);
	if(!onClose) {
		onClose = () => setSnackbarIsOpen(false);
	}
	const handleExit = () => {
		setMessageInfo(undefined);
	}
	return(
		<MuiSnackbar 
			autoHideDuration={4000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={snackbarIsOpen}
			onClose={onClose}
			TransitionProps={{ onExited: handleExit }}
		>
			<Alert
				onClose={onClose}
				severity={messageInfo ? messageInfo.severity : undefined}
			>
				{messageInfo ? messageInfo.message : undefined}
			</Alert>
		</MuiSnackbar>
	);
}

