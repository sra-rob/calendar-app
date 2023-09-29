import { useContext, createContext, useState } from "react";
import { Snackbar } from "@/components/Elements/Snackbar/Snackbar";

export const SnackbarContext = createContext(undefined);
export const SnackbarDispatchContext = createContext(undefined);

export const SnackbarProvider = ({ children }) => {
	const [ snackPack, setSnackPack ] = useState([]);
	return(
		<SnackbarContext.Provider value={snackPack}>
			<SnackbarDispatchContext.Provider value={setSnackPack}>
				{children}
				<Snackbar 
					snackPack={snackPack}
					setSnackPack={setSnackPack}
				/>
			</SnackbarDispatchContext.Provider>
		</SnackbarContext.Provider>
	)
}

export const useSnackbarContext = () => useContext(SnackbarContext);
export const useSnackbarDispatchContext = () => useContext(SnackbarDispatchContext);