import axios from "axios"
import { toast } from '~/composables/util'
import { getToken } from '~/composables/auth'
import store from "./store"

const reqInterceptors = config => {
    // 往header头自动添加token
    const token = getToken()
    if (token) {
        config.headers["token"] = token
    }
    return config;
}

const reqError = error => {
    // 对请求错误做些什么
    return Promise.reject(error);
}

const respInterceptors = response => {
    // 对响应数据做点什么
    return response.data;
}

const respError = error => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
        store.dispatch("logout").finally(() => location.reload())
        toast("未登录或登录已过期", "error")
    } else {
        toast(error.response.data.message || "请求失败", "error")
    }
    return Promise.reject(error);
}

export const common = axios.create({
    baseURL: "/api/common"
})
// 添加请求拦截器
common.interceptors.request.use(reqInterceptors, reqError)
// 添加响应拦截器
common.interceptors.response.use(respInterceptors, respError)

export const file = axios.create({
    baseURL: "/api/file"
})
// 添加请求拦截器
file.interceptors.request.use(reqInterceptors, reqError)
// 添加响应拦截器
file.interceptors.response.use(respInterceptors, respError)
