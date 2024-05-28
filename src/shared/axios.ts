import axios from "axios";

export const http = axios.create({
	baseURL: "https://growinvoice-backend-16f908d94aed.herokuapp.com",
});
