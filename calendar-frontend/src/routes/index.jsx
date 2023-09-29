import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Landing } from "@/features/misc/Landing";
import { useAuthContext } from "@/providers/AuthProvider";

export const AppRoutes = () => {
	const { isLoggedIn } = useAuthContext();
	const commonRoutes = [{ path: "/", element: <Landing />}];
	const routes = isLoggedIn ? protectedRoutes : publicRoutes;
	const element = useRoutes([ ...commonRoutes, ...routes ]);
	return <>{element}</>;
}