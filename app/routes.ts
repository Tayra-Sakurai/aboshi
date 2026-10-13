import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./app_container/layout.tsx',
    [
      index('./routes/home.tsx'),
      route('auth', './auth/auth.tsx',
        [
          route('login', './auth/login.tsx'),
        ]
      ),
    ]
  ),
] satisfies RouteConfig;
