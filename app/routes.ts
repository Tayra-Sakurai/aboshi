import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout('./app_container/layout.tsx',
    [
      index('./routes/home.tsx'),
    ]
  ),
] satisfies RouteConfig;
