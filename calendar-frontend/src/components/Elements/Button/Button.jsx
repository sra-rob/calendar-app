import { css } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

export const Button = ({ text, buttonType, variant="contained", type, onClick }) => {
	const primary = css`
		background: var(--color-primary-400);
		&:hover {
			background: var(--color-primary-500);
		}
	`;
	const secondary = css`
		background: var(--color-secondary-400);
		&:hover {
			background: var(--color-secondary-500);
		}
	`;
	const accent = css`
		background: var(--color-accent-400);
		&:hover {
			background: var(--color-accent-500);
		}
	`;
	const styles = css`
		${buttonType === "primary" && primary}
		${buttonType === "secondary" && secondary}
		${buttonType === "accent" && accent}
	`
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