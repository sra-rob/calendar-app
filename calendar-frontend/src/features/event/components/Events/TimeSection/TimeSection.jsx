import { css } from "@emotion/react";
import { Time } from "./Time";

export const TimeSection = ({ startTime, endTime }) => {
	return(
		<>
			{
				(startTime || endTime) && <div
					css={css`
						display: flex;
						justify-content: space-between;
					`}
				>
					{
						startTime && <Time 
							time={startTime}
							text="Starts at"
						/>
					}
					{
						endTime && <Time 
							time={endTime}
							text="Ends at"
						/>
					}
				</div>
			}
		</>
	);
}