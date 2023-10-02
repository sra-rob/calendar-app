// import { useNavigate } from "react-router-dom";
// import { useMutation } from "react-query";
// import { useAuthDispatchContext } from "@/providers/AuthProvider";


// export const useAuthMutation = (...options) => {
// 	const mutation = useMutation(...options);
// 	const navigate = useNavigate();
// 	const setAuth = useAuthDispatchContext();
// 	console.log(mutation);
// 	if(mutation.isError) {
// 		console.log("ERROR ERROR ERROR")
// 		console.log(mutation.error)
// 		setAuth({ isLoggedIn: false });
// 		// navigate("/auth/login");
// 	}
// 	return mutation;
// }
