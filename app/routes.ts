import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./app_container/layout.tsx',
    [
      index('./routes/home.tsx'),
      route('auth', './auth/auth.tsx',
        [
          route('login', './auth/login.tsx'),
          route('login_wait', './auth/login_wait.tsx'),
        ]
      ),
      layout('./views/view_base.tsx',
        [
          route('edit/large_category/:cid', './views/large_categories/large_category_edit.tsx'),
          route('large_categories', 'views/large_categories/large_categories_view.tsx'),
        ]
      ),
      route('deletion', './views/deletion/deletion.tsx'),
    ]
  ),
] satisfies RouteConfig;
