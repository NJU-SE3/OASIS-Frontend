import axios from 'axios'
import {Message} from 'element-ui'

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = process.env.NODE_ENV === 'production'
//     ? 'http://39.96.75.119:8081'
//     : 'http://localhost:8080'
// axios.defaults.baseURL = process.env.NODE_ENV
// axios.defaults.baseURL = '/api'

axios.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    error =>{
          return Promise.resolve(error.response);
    }
)

function checkCode(response) {
  if(response.status !== 200){
    return {
        status: response.status,
        message: response.statusText,
        data: response.statusText,
      };
  }
  return response;
}


export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      return JSON.stringify(params)
    }],
    headers: {
      'Content-Type': 'application/json;charset-UTF-8',
      'Authorization':sessionStorage.getItem('token')
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      return JSON.stringify(params)
    }],
    headers: {
      'Content-Type': 'application/json;charset-UTF-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':sessionStorage.getItem('token')
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':sessionStorage.getItem('token')
    },
  });
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type":"text/plain",
      // "Access-Control-Allow-Credentials": true
    },
    url: `${url}`
  }).then(checkCode)
    ;
}
