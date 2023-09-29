import { useContext, createContext, useState, useEffect } from "react";
import { fetchWithCsrf } from "@/utils/fetchWithCsrf";

const AuthContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [ auth, setAuth ] = useState({});
	useEffect(() => {
		const isLoggedIn = async () => {
			await fetchWithCsrf("http://localhost:8080/auth/user", {
				credentials: "include"
			}).then(res => res.json())
			.then(loginStatus => {
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