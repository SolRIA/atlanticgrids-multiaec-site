const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'projetos', component: () => import('src/pages/Projetos.vue') },
      { path: 'associados', component: () => import('src/pages/Socios.vue') },
      { path: 'associado', component: () => import('src/pages/Socio.vue') },
      {
        path: 'banco-bm',
        component: () => import('src/pages/BancoBM.vue')
      },
      {
        path: 'banco-bid',
        component: () => import('src/pages/BancoBID.vue')
      },
      {
        path: 'banco-berd',
        component: () => import('src/pages/BancoBERD.vue')
      },
      {
        path: 'banco-bei',
        component: () => import('src/pages/BancoBEI.vue')
      },
      { path: 'noticias', component: () => import('src/pages/Noticias.vue') },
      { path: 'tutoriais', component: () => import('src/pages/Tutoriais.vue') },
      { path: 'projeto', component: () => import('src/pages/Projeto.vue') },
      { path: 'mercado', component: () => import('src/pages/Mercado.vue') },
      {
        path: 'accao',
        component: () => import('src/pages/RegistarAccaoProjeto.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'registo', component: () => import('pages/Register.vue') },
      {
        path: 'registo-parceiro',
        component: () => import('pages/RegisterPartner.vue')
      },
      {
        path: 'recuperarPassword',
        component: () => import('pages/RecoverPassword.vue')
      }
    ]
  },
  {
    path: '/registed',
    component: () => import('layouts/Registed.vue'),
    children: [
      { path: '', component: () => import('src/pages/Registed/Projetos.vue') },
      {
        path: 'keywords',
        component: () => import('src/pages/Registed/ProjetosKeywords.vue')
      },
      {
        path: 'accoes',
        component: () => import('src/pages/Registed/EmailActions.vue')
      },
      {
        path: 'bancos',
        component: () => import('src/pages/Registed/Bancos.vue')
      },
      {
        path: 'conta',
        component: () => import('src/pages/Registed/Conta.vue')
      },
      {
        path: 'empresas',
        component: () => import('src/pages/Registed/Empresas.vue')
      },
      {
        path: 'utilizadores',
        component: () => import('src/pages/Registed/Utilizadores.vue')
      },
      {
        path: 'tiposprojeto',
        component: () => import('src/pages/Registed/TiposProjeto.vue')
      },
      {
        path: 'emails',
        component: () => import('src/pages/Registed/Emails.vue')
      },
      {
        path: 'noticias',
        component: () => import('src/pages/Registed/Noticias.vue')
      },
      {
        path: 'tutoriais',
        component: () => import('src/pages/Registed/Tutoriais.vue')
      }
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
