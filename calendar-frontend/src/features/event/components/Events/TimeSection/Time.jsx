import { css } from "@emotion/react"
import dayjs from "dayjs";

export const Time = ({ time, text }) => {
	const [ hours, minutes ] = time.split(":");
	const formattedTime = dayjs().set("hours", hours).set("minutes", minutes).format("h:mm A");
	return(
		<>
			{ 
				time 
				&&
				<div css={
					css`
						display: flex;
						flex-direction: column;
						gap: 0.05rem;
					`
				}>
					<p css={css`font-size: 0.65rem; font-weight: bold;`}>{text}</p>
					<p>{formattedTime}</p>
				</div>  
			}
		</>
	)
}