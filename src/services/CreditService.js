import BaseService from './BaseService'

export default class PatientService extends BaseService {
  login (params) {
    return this.postApi('/user/login', params)
  }

  forgetPwdValidate(params) {
    return this.postApi("/credit/forgetPwdValidate", params)
  }

  forgetPwdChange(params) {
    return this.postApi("/credit/changePwd", params)
  }

  logout(params) {
    return this.postApi('/credit/logout', params)
  }

  getList(status, params) {
    return this.getApi(`/materiel/audit/getPurchaseList/${status}`, params)
  }

  getSmsCode(params) {
    return this.getApi('/credit/getSmsCode', params)
  }

  getCpSmsCode(params) {
    return this.getApi('/credit/cp/getSmsCode', params)
  }

  getBindSmsCode(pn) {
    return this.getApi('/credit/wx/getSmsCode?phoneNum=' + pn)
  }

  getDetailInfo(id) {
    return this.getApi(`/materiel/detail/${id}`)
  }

  creditRefuse(id, params) {
    return this.postApi(`/materiel/audit/fail/${id}`, params)
  }

  creditAccept(id) {
    return this.postApi(`/materiel/audit/${id}`)
  }
}
