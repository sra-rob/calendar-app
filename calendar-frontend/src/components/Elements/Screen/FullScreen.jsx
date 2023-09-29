import { css } from "@emotion/react"
export const FullScreen = ({ children, centered }) => {
	return(
		<div
			css={css`
				height: 100vh;
				width: 100vw;
				display: ${centered ? "grid" : ""};
				place-content: ${centered ? "center": ""}
			`}
		>
			{children}
		</div>
	)
}