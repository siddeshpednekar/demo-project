const routes = [
  {
    path: '/',
    component: () => import('layouts/CustomLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DemoPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/CustomLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/userdashboard',
    component: () => import('layouts/UserDashboard.vue'),
    children: [
      { path: 'user', component: () => import('pages/UserDashboardPage.vue'), props: route => ({ ...route.query }) }
    ]
  },
  {
    path: '/dashboardadmin',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: 'create', component: () => import('pages/adminDashboardPage.vue') },
      { path: 'admin', component: () => import('pages/HomePage.vue'), props: route => ({ ...route.query })  }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
