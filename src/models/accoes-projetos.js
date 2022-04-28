export const nomeAccao = (id) => {
  switch (id) {
    case 1:
      return 'Com interesse'
    case 2:
      return 'Sem interesse'
    case 3:
      return 'Precisa apoio'
    default:
      return 'Não respondeu'
  }
}

export const accoes = [
  { label: 'Com interesse', value: 1 },
  { label: 'Sem interesse', value: 2 },
  { label: 'Precisa apoio', value: 3 },
  { label: 'Não respondeu', value: 4 },
  { label: 'Abriu link', value: 5 }
]
export const accoesCliente = [
  { label: 'Com interesse', value: 1 },
  { label: 'Sem interesse', value: 2 },
  { label: 'Preciso apoio', value: 3 }
]
export const accoesIds = [1, 2, 3]
