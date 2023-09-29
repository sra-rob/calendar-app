import { css } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

export const OutlinedButton = ({ text, buttonType, variant="contained", type, onClick }) => {
	const primary = css`
		border: 1px solid var(--color-primary-400);
		color: var(--color-primary-400);
		&:hover {
			background: var(--color-primary-400);
			color: var(--color-white);
			border: 1px solid var(--color-primary-400);
		}
	`;
	const secondary = css`
		border: 1px solid var(--color-secondary-400);
		color: var(--color-secondary-400);
		&:hover {
			background: var(--color-secondary-400);
			color: var(--color-white)
			border: 1px solid var(--color-secondary-400);

		}
	`;
	const accent = css`
		border: 1px solid var(--color-accent-400);
		color: var(--color-accent-400);
		&:hover {
			background: var(--color-accent-400);
			color: var(--color-white);
			border: 1px solid var(--color-accent-400);
		}
	`;
	let styles = css``;
	if(buttonType === "primary") styles = primary;
	if(buttonType === "secondary") styles = secondary;
	if(buttonType === "accent") styles = accent;
	
	return(
		<MuiButton
			css={styles}
			variant={variant}
			type={type}
			onClick={onClick}
		>
			{text}
		</MuiButton>
	);
} 