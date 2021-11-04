import { Notify } from 'quasar'
import { route } from 'quasar/wrappers'

export function apiBaseUrl () {
  return process.env.DEV ? 'http://localhost:8000/api/' : 'https://multiaecapi.idealkids.pt/api/'
}

export function apiPublicUrl (name) {
  if(typeof name === 'undefined' || name === null) {
    return null
  }
  return process.env.DEV ? `http://localhost:8000/public/${name}` : `https://multiaecapi.idealkids.pt/public/${name}`
}

export function createQueryParameters (data) {
  return `?${new URLSearchParams(data)}`
}

export function getAuthToken () {
  const currentUser = JSON.parse(localStorage.getItem('token'))
  return 'KEY ' + currentUser.token
}

export async function deleteAuth (url, data) {
  return await baseApiAuth('DELETE', url, JSON.stringify(data), 'application/json')
}

export async function postAuth (url, data) {
  return await baseApiAuth('POST', url, JSON.stringify(data), 'application/json')
}

export async function postFormAuth (url, data) {
  return await baseApiAuth('POST', url, data)
}

export async function getAuth (url, data) {
  return await baseApiAuth('GET', url, JSON.stringify(data), 'application/json')
}

export function downloadXml (method, url, filename, data, elementid) {
  return download(method, url, filename, data, 'application/xml', elementid)
}
export function downloadPdf (method, url, filename, data, elementid) {
  return download(method, url, filename, data, 'application/pdf', elementid)
}
function download (method, url, filename, data, mimeType, elementid) {
  return new Promise((resolve, reject) => {
    const config = {
      method: method,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        authorization: getAuthToken()
      },
      body: JSON.stringify(data)
    }

    fetch(apiBaseUrl() + url, config)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }))
        const link = document.getElementById(elementid)
        link.href = url
        link.setAttribute('download', filename)
        resolve()
      })
      .catch(error => {
        let message = 'Não foi possível concluir o pedido'
        if (typeof error !== 'undefined' && typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined' && typeof error.response.data.message !== 'undefined') {
          message = error.response.data.message
        }
        Notify.create({ message: message, type: 'negative' })
        reject(error)
      })
  })
}

export async function baseApiAuth (method, url, data, contentType) {
  var headers = new Headers();
  headers.append('Access-Control-Allow-Credentials', 'true')
  headers.append('Authorization', getAuthToken())
  if (typeof contentType !== 'undefined' && contentType !== null) {
    headers.append('Content-Type', contentType)
  }
  const config = {
    method: method,
    headers: headers,
    body: data
  }

  try {
    let response = await fetch(apiBaseUrl() + url, config)

    if (response.ok === false && response.status === 401) {
        route.push('/login')
    } else {
        return await response.json()
    }
  } catch (error) {
    let message = 'Não foi possível concluir o pedido'
    if (typeof error !== 'undefined' && typeof error.response !== 'undefined' && typeof error.response.data !== 'undefined' && typeof error.response.data.message !== 'undefined') {
        message = error.response.data.message
    }
    Notify.create({ message: message, type: 'negative' })
    
    return null
  }
}

export async function post (url, data) {
  const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  var response = await fetch(apiBaseUrl() + url, config)

  return await response.json()
}

export async function postForm (url, data) {
  const config = {
    method: 'POST',
    body: data
  }

  var response = await fetch(apiBaseUrl() + url, config)

  return await response.json()
}

export async function get (url, data) {
  const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  var response = await fetch(apiBaseUrl() + url, config)

  return await response.json()
}
