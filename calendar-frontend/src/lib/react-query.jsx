import { QueryClient } from "react-query";

const queryConfig = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false, 
		staleTime: Infinity
	}
}

const qc = new QueryClient({ defaultOptions: queryConfig });

export const queryClient = qc;