import dayjs from "dayjs";
import { css } from "@emotion/react";
import { Event } from "./Event";

export const Events = ({ todaysEvents }) => {
	const eventsExist = todaysEvents.length > 0;
	return(
		<div
			css={css`
				display:flex;
				flex-direction: column;
				gap: 2rem;
				margin-top: 0.25rem;
				overflow-y: scroll;
				padding-right: 1rem;
				&::-webkit-scrollbar {
					width: 2px;
					background: var(--color-accent-100);
					border-radius: 4px;
				}
				&::-webkit-scrollbar-thumb  {
  				background: var(--color-accent-400);
					border-radius: 4px;
					height: 10%;
				}
			`}
		>
			{
				eventsExist && todaysEvents.map(event => {
					const { id } = event;
					return(
						<Event 
							key={id}
							event={event}
						/>
					);
				})
			}
			{
				!eventsExist && <h3>No events</h3>
			}
		</div>
	)
}
