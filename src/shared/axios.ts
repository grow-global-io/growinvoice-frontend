import { environment } from "@enviroment";
import axios from "axios";

export const http = axios.create({

	baseURL: process.env.VITE_BASE_URL,

	baseURL: environment.baseUrl,

});
