import axios from 'axios'

const apiUrl = 'http://localhost:8080/advertiser/'

export const GET_ADVERTISERS = 'GET_ADVERTISERS'
export const GET_ADVERTISER = 'GET_ADVERTISER'
export const NEW_ADVERTISER = 'NEW_ADVERTISER'
export const AUTHENTICATE = 'AUTHENTICATE'

export const getAdvertisers = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch({ type: GET_ADVERTISERS, advertisers: response.data })
      })
      .catch(error => {
        console.log(`error getting advertisers: ${error}`)
      })
  }
}

export const getAdvertiser = (paramKey, paramVal) => {
  const config = {
    params: {
      [paramKey]: paramVal
    }
  }
  return (dispatch) => {
    return axios.get(`${apiUrl}`, config)
      .then(response => {
        // dispatch({ type: GET_ADVERTISER, advertiser: response.data[0] })
        dispatch({ type: GET_ADVERTISER, advertiser: response.data[0] })
      })
      .catch(error => {
        console.log(`error getting advertiser: ${error}`)
        // throw (error)
      })
  }
}

export const newAdvertiser = (advertiserObject) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}`, advertiserObject)
      .then(response => {
        dispatch({ type: NEW_ADVERTISER, newAdvertiser: advertiserObject })
      })
      .then(() => {
        dispatch({ type: AUTHENTICATE, authenticated: true })
      })
      .catch(error => {
        console.log(`error posting advertiser: ${error}`)
        // throw (error)
      })
  }
}