import { css } from "@emotion/react";

export const ContentLayout = ({ children }) => {
	return(
		<div
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
			`}
		>
			{children}
		</div>
	);
}