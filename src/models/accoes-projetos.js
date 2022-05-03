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
export const corAccao = (id) => {
  switch (id) {
    case 1:
      return 'accent'
    case 2:
      return 'primary'
    case 3:
      return 'warning'
    case 4:
      return 'blue-grey-2'
    default:
      return 'white'
  }
}

export const accoesCliente = [
  { value: 1, slot: 'one' },
  { value: 2, slot: 'two' },
  { value: 3, slot: 'three' }
]
export const accoes = [
  ...accoesCliente,
  { value: 4, slot: 'four' },
  { value: 5, slot: 'five' }
]
export const accoesIds = [1, 2, 3]
