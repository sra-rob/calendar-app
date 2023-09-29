import { useState } from "react";
import { createContext, useContext } from "react";
import dayjs from "dayjs";

const EventContext = createContext(undefined);
const EventDispatchContext = createContext(undefined);

export const EventProvider = ({ children }) => {
	const displayedDate = dayjs().format("YYYY-MM-01");
	const [ event, setEvent ] = useState({
		displayedDate
	})
	return(
		<EventContext.Provider value={event}>
			<EventDispatchContext.Provider value={setEvent}>
				{children}
			</EventDispatchContext.Provider>
		</EventContext.Provider>
	);
}
export const useEventContext = () => useContext(EventContext);
export const useEventDispatchContext = () => useContext(EventDispatchContext);