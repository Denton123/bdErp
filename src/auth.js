const SESSION_NAME = 'BD_SESSION_NAME'
const SESSION_ICON = 'BD_SESSION_ICON'
const SESSION_GENDER = 'BD_SESSION_GENDER'
const SESSION_TOKEN = 'token'
const SESSION_ROLE = 'BD_SESSION_ROLE'

import {getToken} from '@/cookie'
export default {
  session: {
    name: SESSION_NAME,
    hp: SESSION_ICON,
    gender: SESSION_GENDER,
  },
  user: {
    authenticated: false,
  },
  getRoleID() {
    // return localStorage.getItem(SESSION_ROLE)
  },
  setLoginSession(data) {
    localStorage.setItem(SESSION_NAME, data.name)
    localStorage.setItem(SESSION_ICON, data.hp)
    // localStorage.setItem(SESSION_ROLE, data.type)
    this.user.authenticated = true
  },
  setLoginToken(data) {
    localStorage.setItem(SESSION_TOKEN, data.token),
    localStorage.setItem(SESSION_NAME, data.username),
    localStorage.setItem(SESSION_GENDER, data.gender)
  },
  getLoginSession() {
    return {
      name: localStorage.getItem(SESSION_NAME),
      hp: localStorage.getItem(SESSION_ICON),
      role: localStorage.getItem(SESSION_ROLE),
    }
  },
  logout() {
    localStorage.removeItem(SESSION_NAME)
    localStorage.removeItem(SESSION_ICON)
    // localStorage.removeItem(SESSION_ROLE)
    localStorage.removeItem(SESSION_TOKEN)
    this.user.authenticated = false
  },
  isLogin() {
    this.checkAuth()
    return this.user.authenticated
  },
  checkAuth() {
    // let name = localStorage.getItem(SESSION_NAME)
    // let hp = localStorage.getItem(SESSION_ICON)
    // let type = localStorage.getItem(SESSION_ROLE)
    // let token = localStorage.getItem(SESSION_TOKEN)
    let token = getToken('_bdls_token_')
    // if (name && hp && type && token) {
    if (token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
}