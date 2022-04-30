import { boot } from 'quasar/wrappers'
import { getAuth } from 'boot/api'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  // something to do
  router.beforeEach(async (to, from) => {
    // só validamos os caminhos protegidos, ou seja, /registed...
    if (to.path.startsWith('/registed')) {
      let precisaAutenticar = false
      const token = localStorage.getItem('token')
      if (token === null) {
        precisaAutenticar = true
      } else {
        const tokenValido = await getAuth('utilizadores/valida-token.php')
        if (
          typeof tokenValido === 'undefined' ||
          tokenValido === null ||
          tokenValido.ok === false
        )
          precisaAutenticar = true
      }
      if (precisaAutenticar) {
        return { path: '/login', query: to.query }
      }
    }
  })
})
