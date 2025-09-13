import axios from "axios";
import { baseUrl } from "shared/constants/baseurl";
import type { UserType } from "shared/types/user-type";

export async function getSession() {
    return await axios.get<{ data: UserType }>(`${baseUrl}/auth/session`, {
        withCredentials: true,
    })
}