import { baseUrl } from 'shared/constants/baseurl'
import { io } from 'socket.io-client'

export const socket = io(baseUrl, {
    withCredentials: true
})