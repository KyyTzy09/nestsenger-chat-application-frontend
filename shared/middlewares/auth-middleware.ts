import { redirect } from "react-router";
import { getSession } from "~/features/auth/services/get-session";

export async function AuthMiddleware() {
    const user = await getSession()
    if (!user) {
        redirect("/")
    }
}