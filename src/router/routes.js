
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'projetos', component: () => import('src/pages/Projetos.vue') },
      { path: 'perfil', component: () => import('src/pages/PerfilEmpresa.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'registo', component: () => import('pages/Register.vue') },
      { path: 'recuperarPassword', component: () => import('pages/RecoverPassword.vue') }
    ]
  },
  {
    path: '/registed',
    component: () => import('layouts/Registed.vue'),
    children: [
      { path: '', component: () => import('src/pages/Registed/Projetos.vue') },
      { path: 'bancos', component: () => import('src/pages/Registed/Bancos.vue') },
      { path: 'conta', component: () => import('src/pages/Registed/Conta.vue') },
      { path: 'empresas', component: () => import('src/pages/Registed/Empresas.vue') },
      { path: 'paises', component: () => import('src/pages/Registed/Paises.vue') },
      { path: 'utilizadores', component: () => import('src/pages/Registed/Utilizadores.vue') },
      { path: 'tiposempresa', component: () => import('src/pages/Registed/TiposEmpresa.vue') },
      { path: 'tiposprojeto', component: () => import('src/pages/Registed/TiposProjeto.vue') },
      { path: 'emails', component: () => import('src/pages/Registed/Emails.vue') }
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
