
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Projetos', component: () => import('pages/Projects.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'Register', component: () => import('pages/Register.vue') },
      { path: 'RecoverPassword', component: () => import('pages/RecoverPassword.vue') },
      { path: 'ResetPassword', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/registed',
    component: () => import('layouts/Registed.vue'),
    children: [
      { path: '', component: () => import('pages/Registed/Projects.vue') },
      { path: 'Conta', component: () => import('pages/Registed/Account.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
