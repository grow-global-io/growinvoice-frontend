import axios from "axios";

export const http = axios.create({
	baseURL: "https://growinvoice-94ee0dd2031b.herokuapp.com",
});
