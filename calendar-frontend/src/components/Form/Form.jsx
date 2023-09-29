import { css } from "@emotion/react";

export const Form = ({ children, onSubmit }) => {
	return(
		<form
			css={
				css`
					display: flex;
					flex-direction: column;
					gap: 1rem;
					padding-block: 1rem;
				`
			} 
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
}