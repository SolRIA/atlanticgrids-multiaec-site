import { reactive } from 'vue'

const config = reactive({
    theme_color: "rgb(0, 163, 82)",
    bg_color: "rgb(0, 163, 82)",
    username: '',
    projects: []
})

const methods = {
    init () {
      let localConfig = JSON.parse(localStorage.getItem('local_config'))
  
      if (localConfig === null) {
        config.projects = [
          { id: 1, nome: 'Barragem', pais: 'Angola', data: '2021-07-10', descricao: 'Construção barragem', imagem: '/Images/barragem.jpeg' },
          { id: 2, nome: 'Energia', pais: 'Moçambique', data: '2021-07-08', descricao: 'Energia', imagem: '/Images/ag_energia.png' },
          { id: 3, nome: 'Água e Saneamento', pais: 'Moçambique', data: '2021-07-08', descricao: 'Água e Saneamento', imagem: '/Images/ag_aguas_saneamento.png' },
          { id: 4, nome: 'Ponte', pais: 'Moçambique', data: '2021-07-09', descricao: 'Construção ponte', imagem: '/Images/ponte.jpg' },
          { id: 5, nome: 'Mobilidade', pais: 'Moçambique', data: '2021-07-09', descricao: 'Mobilidade', imagem: '/Images/ag_mobilidade.png' },
          { id: 6, nome: 'Projeto e Consulturia', pais: 'Moçambique', data: '2021-07-09', descricao: 'Projeto e Consulturia', imagem: '/Images/ag_projeto_consulturia.png' },
          { id: 7, nome: 'Vias Comunicação', pais: 'Moçambique', data: '2021-07-09', descricao: 'Vias Comunicação', imagem: '/Images/ag_vias_comunicacao.png' },
          { id: 8, nome: 'Hospital', pais: 'Angola', data: '2021-07-10', descricao: 'Construção hospital', imagem: '/Images/hospital.jpg' }
        ]
        localConfig = config

        localStorage.setItem('local_config', JSON.stringify(config))
      }
  
      config.theme_color = localConfig.theme_color
      config.bg_color = localConfig.bg_color
      config.projects = localConfig.projects
      config.username = localConfig.username
    },
    resetCache() {
      localStorage.removeItem('local_config')
      this.init()
    },
    setThemeColor (theme_color) {
      config.theme_color = theme_color
      localStorage.setItem('local_config', JSON.stringify(config))
    },
    setBgColor () {
      config.bg_color = !config.bg_color
      localStorage.setItem('local_config', JSON.stringify(config))
    },
    getProjects () {
      return config.projects.sort((a, b) => a.id - b.id)
    },
    setUsername (username) {
      config.username = username
      localStorage.setItem('local_config', JSON.stringify(config))
    },
    getUsername () {
      return config.username
    },
    saveProject (project) {
      console.log(project)
      config.projects = config.projects.filter(p => p.id !== project.id)

      config.projects.push(project)

      localStorage.setItem('local_config', JSON.stringify(config))
    },
    deleteProject (id) {
      config.projects = config.projects.filter(p => p.id !== id)

      localStorage.setItem('local_config', JSON.stringify(config))
    }
  }

export {
    config,
    methods
}