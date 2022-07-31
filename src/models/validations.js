export function isEmail(email) {
  if (email === null || email.length === 0) return false

  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export function isNifPt(nif) {
  let firstDigit = 0,
    checkDigit = 0,
    i = 0

  if (nif !== null && nif.length === 9) {
    firstDigit = parseInt(nif.charAt(0))
    checkDigit = firstDigit * 9
    for (i = 2; i <= 8; i++) {
      checkDigit += parseInt(nif.charAt(i - 1)) * (10 - i)
    }
    checkDigit = 11 - (checkDigit % 11)
    if (checkDigit >= 10) {
      checkDigit = 0
    }
    if (checkDigit === parseInt(nif.charAt(8))) {
      return true
    }
  }
  return false
}

export function isCae(cae) {
  if (cae === null || cae.length !== 5) return false
  else return true
}
