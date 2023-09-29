import { css } from "@mui/material";
import { 
	Dialog, DialogContent, DialogTitle
} from "@mui/material";
import { IconButton } from '@mui/material';
import { RowContainer } from "@/components/Elements";
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ open, onClose, title, children }) => {
	return(
		<Dialog
			open={open}
			onClose={onClose}
			css={
				css`
					padding-block: 1rem;
				`
			}
		>
			<DialogTitle>
				<RowContainer 
					justifyContent="space-between"
				>
					{title}
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</RowContainer>				
			</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
		</Dialog>
	);
}