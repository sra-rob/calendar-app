import Cookies from "js-cookie";

export const fetchWithCsrf = (url, options) => {
	const csrfToken =  Cookies.get("XSRF-TOKEN");
	if(csrfToken) {
		const headers = { 
			...options.headers, 
			"X-XSRF-TOKEN": csrfToken

		}
		options.headers = headers;
	}
	return fetch(url, options);
}