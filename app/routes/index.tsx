import HomePage from "~/pages/index.page";
import type { Route } from "./+types/home";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nestsenger" },
    { name: "Realtime chat application", content: "Realtime chat application" },
  ];
}

export default function Home() {
  return <HomePage />;
}
