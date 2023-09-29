import { ContentLayout } from "../../../components/Layout/ContentLayout"
import { Calendar } from "../components/Calendar/Calendar"
import { EventProvider } from "@/providers/EventProvider"
export const Events = () => {
	return(
		<ContentLayout>
			<EventProvider>
				<Calendar />
			</EventProvider>
		</ContentLayout>
	)
}