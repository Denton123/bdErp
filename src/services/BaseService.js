import axios from 'axios'
import auth from '../auth.js'
const Host = '/api'
// const Host = '/v1'
export default class BaseService {
  constructor() {
    this.Request = axios.create({
      withCredentials: true
    })
    // 拦截处理token不自动更新问题
    this.Request.interceptors.request.use(
      function (config) {
        // const token = localStorage.getItem('token')
        let role
        if (window.location.href.indexOf('credit') !== -1) {
          role = localStorage.getItem('IN_CREDIT_ROLE')
        } else {
          role = localStorage.getItem('IN_ERP_ROLE')
        }
        // const role = localStorage.getItem('BD_SESSION_ROLE')
        // config.headers.Authorization = token
        config.headers.UserRole = 'BDLS_INV_CHARGEADMIN'
        // config.headers.UserRole = role
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    // 拦截response
    this.Request.interceptors.response.use(
      function (config) {
        if (config.data.msg == '请先登录') {
          auth.logout()
          let baseUrl = "";
          baseUrl =
            window.location.href.indexOf("dev") !== -1 ?
            "http://dev.work.bdlifescience.com" :
            "http://work.bdlifescience.com";
          window.location.href = `${baseUrl}/login`
        }
        return config
      },
      function (config) {
        return config
      }
    )
  }

  throwReqError(resp) {
    const error = new Error(resp.statusText)
    error.resp = resp
    throw error
  }

  checkStatus(resp) {
    if ((resp.status >= 200) && (resp.status < 400)) {
      return resp.data
    }
    this.throwReqError(resp)
  }

  procReqError(err) {
    if (err.toString().indexOf('401') > -1) {
      // localStorage.removeItem(auth.jwt.token)
      auth.logout()
      return {
        ret: 1,
        msg: '请先登录',
      }
    } else if (err.toString().indexOf('400') > -1) {
      return {
        ret: 1,
        msg: '请求错误、稍后重试',
      }
    } else if (err.toString().indexOf('403') > -1) {
      return {
        ret: 1,
        msg: '没有权限',
      }
    } else if (err.toString().indexOf('404') > -1) {
      return {
        ret: 1,
        msg: '请求的页面不存在',
      }
    } else if (err.toString().indexOf('500') > -1) {
      return {
        ret: 1,
        msg: '服务器异常、稍后重试',
      }
    }
  }

  procRequest(req) {
    return req.then(this.checkStatus).catch(this.procReqError)
  }

  downloadApi(url, data = {}, filename) {
    let host = '/inventory/api'
    url = host + url
    // const link = document.createElement('a');
    // link.target = '_blank'
    // let test = ''
    // for (let i in data) {
    //   if (data[i] !== undefined) {
    //     test += `${i}=${data[i]}&&`
    //   }
    // }
    // test = test.slice(0, test.length - 2)
    // link.href = `${url}?${test}`;
    // document.body.appendChild(link);
    // link.click();
    return this.Request.post(url, data, {
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      if (filename) {
        link.setAttribute('download', filename);
      }
      document.body.appendChild(link);
      link.click();
    });
  }

  getApi(url, data) {
    let host = '/inventory/api'
    url = host + url
    return this.procRequest(this.Request.get(url, {
      params: data
    }))
  }
  getRole(url, data) {
    return this.procRequest(this.Request.get(url, {
      params: data
    }))
  }
  postApi(url, data) {
    let host = '/inventory/api'
    url = host + url
    return this.procRequest(this.Request.post(url, data))
  }

  putApi(url, data) {
    let host = '/inventory/api'
    url = host + url
    return this.procRequest(this.Request.put(url, data))
  }

  deleteApi(url) {
    url = Host + url
    return this.procRequest(this.Request.delete(url))
  }
}