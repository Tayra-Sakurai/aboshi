import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

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
          route('large_categories', 'views/large_categories/large_categories_view.tsx'),
          route('medium_categories/:lc?', './views/medium_categories/medium_categories_view.tsx'),
          route('money_status', './views/money_status/money_status_view.tsx'),
          route('small_categories/:lc?/:mc?', './views/small_categories/small_categories_view.tsx'),
          route('items', './views/items/items_view.tsx'),
          ...prefix('edit', [
            route('item/:cid', './views/items/item_edit.tsx'),
            route('medium_category/:cid', './views/medium_categories/medium_category_edit.tsx'),
            route('large_category/:cid', './views/large_categories/large_category_edit.tsx'),
            route('money_status/:cid', './views/money_status/money_status_edit.tsx'),
            route('small_category/:cid', './views/small_categories/small_category_edit.tsx'),
          ]),
          ...prefix('add', [
            route('item', './views/items/item_add.tsx'),
            route('large_category', './views/large_categories/large_category_add.tsx'),
            route('medium_category', './views/medium_categories/medium_category_add.tsx'),
            route('money_status', './views/money_status/money_status_add.tsx'),
            route('small_category', './views/small_categories/small_category_add.tsx'),
          ]),
        ]
      ),
      route('deletion', './views/deletion/deletion.tsx'),
      route('add', './routes/add.tsx'),
    ]
  ),
] satisfies RouteConfig;
