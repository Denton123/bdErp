// 存取cookie
import Cookies from 'js-cookie'

export function setToken(token, url) {
    return Cookies.set('token', token, {
        path: url
    })
}

export function getToken(item) {
    return Cookies.get(item)
}
export function removeToken(item) {
    return Cookies.remove(item)
}