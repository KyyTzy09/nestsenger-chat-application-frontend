import axios, { type AxiosRequestConfig } from "axios"
import { baseUrl } from "../constants/baseurl"


const axiosInstance = axios.create({
    baseURL: baseUrl
})

export const apiClient = async <T>(config: AxiosRequestConfig): Promise<T | undefined> => {
    try {
        const { data } = await axiosInstance(config)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error( error.response?.data?.message || "Request Failed")
        }
        throw error
    }
}