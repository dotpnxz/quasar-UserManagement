const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'User', // Removed leading slash
        component: () => import('src/pages/User.vue'),
      },
      {
        path: '/create-user/:id',
        name: 'CreateUser', // Removed leading slash
        component: () => import('src/pages/CreateUser.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
