import { css } from "@mui/material";
import { CircularProgress } from "@mui/material";

export const Spinner = () => {
	return(
		<div
			css={
				css`
					margin: 0 auto;
					position: absolute;
					height: 90vh;
					width: 90vw;
					display: grid;
					place-content: center;
				`
			}
		>
			<CircularProgress />
		</div>
	);
}