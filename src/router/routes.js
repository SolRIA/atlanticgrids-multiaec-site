
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Projetos', component: () => import('src/pages/Projetos.vue') },
      { path: 'CompanyProfile', component: () => import('src/pages/PerfilEmpresa.vue') }
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
      { path: '', component: () => import('src/pages/Registed/Projetos.vue') },
      { path: 'Bancos', component: () => import('src/pages/Registed/Bancos.vue') },
      { path: 'Conta', component: () => import('src/pages/Registed/Conta.vue') },
      { path: 'Empresas', component: () => import('src/pages/Registed/Empresas.vue') },
      { path: 'Paises', component: () => import('src/pages/Registed/Paises.vue') },
      { path: 'Utilizadores', component: () => import('src/pages/Registed/Utilizadores.vue') }
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
