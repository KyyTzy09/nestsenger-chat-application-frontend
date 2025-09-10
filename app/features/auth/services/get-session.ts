import axios from "axios";
import { baseUrl } from "shared/constants/baseurl";

export async function getSession() {
    return await axios.get<{ data: any }>(`${baseUrl}/auth/session`, {
        withCredentials: true,
    })
}