const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'User',
        name: 'User',
        component: () => import('src/pages/User.vue'),
      },
      {
        path: 'create-user/:id',
        name: 'CreateUser',
        component: () => import('src/pages/CreateUser.vue'),
      },
      {
        path: 'CreateUser',
        name: 'CreateUser',
        component: () => import('src/pages/CreateUser.vue'),
      }
    ]
  },

  // Catch all route for handling 404 pages
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
];

export default routes;
