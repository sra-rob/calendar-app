import { Routes, Route } from "react-router-dom";
import { Events } from "./Events";

export const EventsRoutes = () => {
	return(
		<Routes>
			<Route path="" element={<Events />} />
		</Routes>
	);
}