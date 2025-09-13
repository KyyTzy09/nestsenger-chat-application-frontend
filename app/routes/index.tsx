import type { Route } from "./+types";
import IndexPage from "~/pages/index.page";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nestsenger" },
    { name: "Realtime chat application", content: "Realtime chat application" },
  ];
}

export default function IndexRoute() {
  return <IndexPage />;
}
