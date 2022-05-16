import api from '../../services'

const errorDefault = error => {
  if (error.response) {
    const { message } = error.response.data
    return message
  } else if (error.request) {
    console.log(error.request)
    return 'Ops, algo deu errado. Tente novamente mais tarde'
  } else {
    return error.message
  }
}

export function getDreams() {
  return new Promise((resolve, reject) => {
    const getData = async () => {
      await api
        .get(`/sonhos`)
        .then(async response => {
          const data = await response.data
          if (response.status === 200 || response.status === 201) {
            const dreams = data.data
            resolve(dreams)
          } else {
            reject(data.message)
          }
        })
        .catch(error => reject(errorDefault(error)))
    }
    getData()
  })
}

export function addDream(title, description) {
  return new Promise((resolve, reject) => {
    const getData = async () => {
      await api
        .post(`/sonhos`, {
          titulo: title,
          descricao: description
        })
        .then(async response => {
          const data = await response.data
          if (response.status === 200 || response.status === 201) {
            const dreams = data.data
            resolve(dreams)
          } else {
            reject(data.message)
          }
        })
        .catch(error => reject(errorDefault(error)))
    }
    getData()
  })
}