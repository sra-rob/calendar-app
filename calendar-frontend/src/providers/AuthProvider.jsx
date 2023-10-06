import { useContext, createContext, useState, useEffect } from "react";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const AuthContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [ auth, setAuth ] = useState({});
	useEffect(() => {
		const isLoggedIn = async () => {
			await fetchWithCsrf("https://calendar-site.online/api/v1/auth/user", {
				method: "POST",
				credentials: "include"
			}).then(res => {
				return res.json();
			})
			.then(loginStatus => {
				if(loginStatus != auth.isLoggedIn)
					setAuth({ isLoggedIn: loginStatus })
			});
		}
		isLoggedIn();
	}, []);
	return(
		<AuthContext.Provider value={auth}>
			<AuthDispatchContext.Provider value={setAuth}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthContext.Provider>
	) 
}

export const useAuthContext = () => useContext(AuthContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);