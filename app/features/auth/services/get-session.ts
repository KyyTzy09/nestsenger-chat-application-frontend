import axios from "axios";
import { redirect } from "react-router";
import { baseUrl } from "shared/constants/baseurl";
import type { UserType } from "shared/types/user-type";

export async function getSession() {
    try {
        const response = await axios.get<{ data: UserType }>(`${baseUrl}/auth/session`, {
            withCredentials: true,
        })
        return response.data.data;

    } catch (error) {
        return;
    }
}