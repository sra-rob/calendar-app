import { css } from "@emotion/react";
import { Paper } from "@mui/material";
export const Layout = ({ children }) => {
	return(
			<Paper
				elevation={4}
				css={
					css`
						padding: 2rem;
						width: 100%;
						max-width: 600px;
						margin: 0 auto;
					`
				}
			>
				{children}
			</Paper>
	);
}