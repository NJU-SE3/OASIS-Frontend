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
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
          return Promise.resolve(response);
      } else {
          return Promise.reject(response);
      }
    },
    err =>{
      console.log(err)
      Message.error({message:'出错了，请稍后重试～'})
    }
)


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
  });
}
