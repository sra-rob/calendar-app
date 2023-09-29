import { MainLayout } from "@/components/Layout/MainLayout";
import { Outlet } from "react-router-dom";
import { EventsRoutes } from "@/features/event/routes"

const App = () => {
	return(
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}

export const protectedRoutes = [
	{
		path: "/app",
		element: <App />,
		children: [
			{
				path: "events/*",
				element: <EventsRoutes />
			}
		]
	}
]