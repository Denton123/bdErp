import BaseService from './BaseService'

export default class UserService extends BaseService {
  // 登录
  login(params) {
    return this.postApi(`/user/login`, params)
  }
  // 退出登录
  logout(params) {
    return this.postApi('/user/logout', params)
  }
  // 修改用户密码
  modifyPW(params) {
    return this.postApi('/v1/user/modifyPW', params)
  }
  // 修改用户信息
  modifyInfo(params) {
    return this.postApi('/v1/user/modifyInfo', params)
  }
  // 获取用户信息
  getInfo(oid) {
    return this.getApi('/v1/user/getInfo', oid)
  }
  // 获取头像列表
  getHPList(oid) {
    return this.getApi('/v1/user/getHPList', oid)
  }
}