import { css } from "@emotion/react";

export const Link = ({ href, text, buttonType }) => {
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
		<a
			href={href}
			css={ 
				css`
					text-decoration: none;
					color: var(--color-white);
					${styles}
					padding-block: 0.70rem;
					font-weight: 200;
					padding-inline: 1rem;
					border-radius: 4px;
					font-size: 0.8rem;
					font-weight: 600;
					letter-spacing: 0.05rem;
					&:clicked {
						color: var(--color-white);
					}
				`
			}
		>
			{text.toUpperCase()}
		</a>
	)
}