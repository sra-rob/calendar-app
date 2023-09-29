import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";
import { SnackbarProvider } from "./SnackbarProvider";
import { AuthProvider } from "./AuthProvider";
import { AppBar } from "@/components/Elements";

export const AppProvider = ({ children }) => {
	return(
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<BrowserRouter>
						<SnackbarProvider>
							<AppBar />
							{children}
						</SnackbarProvider>
					</BrowserRouter>
				</AuthProvider>
			</QueryClientProvider>
	);
}