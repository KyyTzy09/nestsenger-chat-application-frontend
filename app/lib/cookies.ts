import { createCookie } from "react-router"

export const setCookie = async (token: string) => {
    const isProduction = process.env.NODE_ENV === "production";
    await createCookie("user-session", {
        secrets : [token],
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        secure: isProduction ? true : false,
        sameSite: "lax",
        path: "/"
    })
}