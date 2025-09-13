import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    layout("layouts/default.layout.tsx", [
        ...prefix("chat", [
            layout("routes/chat/chat.layout.tsx", [
                index("routes/chat/chat.tsx")
            ])
        ]),
        route("status", "routes/status/status.tsx")
    ]),
] satisfies RouteConfig;
