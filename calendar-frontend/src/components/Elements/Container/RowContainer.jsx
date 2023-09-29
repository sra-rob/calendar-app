import { css } from "@emotion/react";

export const RowContainer = ({ 
	children, justifyContent="center", alignItems="center", 
	p="0px", g="1rem" 
}) => {
	return(
		<div
			css={
				css`
					display: flex;
					justify-content: ${justifyContent};
					align-items: ${alignItems};
					padding: ${p};
					gap: ${g};
				`
			}
		>
			{children}
		</div>
	)
}