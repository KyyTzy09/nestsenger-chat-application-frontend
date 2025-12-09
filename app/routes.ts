import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    layout("layouts/layout.tsx", [
        ...prefix("chat", [
            layout("layouts/chat.layout.tsx", [
                index("routes/chat/chat.tsx"),
                route(":roomId", "routes/chat/chat-detail.tsx")
            ])
        ]),
        ...prefix("status", [
            layout("layouts/status.layout.tsx", [
                index("routes/status/status.tsx")
            ])
        ])
    ]),
] satisfies RouteConfig;
