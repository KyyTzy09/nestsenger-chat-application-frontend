import { redirect } from "react-router";
import type { Route } from "./+types";
import IndexPage from "~/pages/index.page";
import { getSession } from "~/features/auth/services/get-session";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nestsenger" },
    { name: "Realtime chat application", content: "Realtime chat application" },
  ];
}

export async function clientLoader({} : Route.ClientLoaderArgs){
  const session = await getSession();
  if (session) {
    throw redirect("/chat");
  }
  return;
};

export default function IndexRoute() {
  return <IndexPage />;
}
