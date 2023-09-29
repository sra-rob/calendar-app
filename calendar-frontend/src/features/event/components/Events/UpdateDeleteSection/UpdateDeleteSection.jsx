import { RowContainer } from "@/components/Elements"
import { UpdateEvent } from "./UpdateEvent"
import { DeleteEvent } from "./DeleteEvent"

export const UpdateDeleteSection = ({ event }) => {
	return(
		<RowContainer
			justifyContent="space-between"
		>
			<DeleteEvent 
				event={event}
			/>
			<UpdateEvent 
				event={event}
			/>
		</RowContainer>
	);
}