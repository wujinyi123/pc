import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "token"
const cookie = useCookies()

// 获取token
export const getToken = () => {
    return cookie.get(TokenKey)
}

// 设置token
export const setToken = token => {
    return cookie.set(TokenKey, token)
}

// 清除token
export const removeToken = () => {
    return cookie.remove(TokenKey)
}