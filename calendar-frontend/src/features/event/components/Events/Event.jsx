import { css } from "@emotion/react"
import { TimeSection } from "@/features/event/components/Events/TimeSection";
import { UpdateDeleteSection } from "./UpdateDeleteSection/UpdateDeleteSection";

export const Event = ({ event }) => {
	const { title, startTime, endTime } = event;
	const timeStyles = css`
		justify-content: space-between;
		align-items: center;
	`
	return(
		<div 
			css={css`
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			`}
		>
		<div
			css={css`
				${timeStyles}
			`}
		>
			<h3 css={
				css`
					margin-bottom: 0.25rem; 
					word-wrap:break-word;
				`
			}>{title}</h3>
			<TimeSection 
				startTime={startTime}
				endTime={endTime}
			/>
			</div>
			<UpdateDeleteSection
				event={event}
			/>
		</div>
	);
}