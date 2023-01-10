import { createStore } from 'vuex'
import { useCookies } from '@vueuse/integrations/useCookies'
import { login, getCurrentUser } from '~/api/user'
import { getCurrentMenu } from '~/api/menu'
import { setToken, removeToken } from '~/composables/auth'
import { addRoutes } from '~/router'

const store = createStore({
    state() {
        return {
            // 用户信息
            currentUser: {},
            // 侧边宽度
            asideWidth: "250px",
            // 用户菜单
            currentMenu: {}
        }
    },
    mutations: {
        // 记录用户信息
        SET_CURRENT_USER(state, currentUser) {
            state.currentUser = currentUser
        },
        // 展开/缩起侧边
        SET_ASIDE_WIDTH(state) {
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        },
        // 记录用户菜单
        SET_CURRENT_MENU(state, currentMenu) {
            state.currentMenu = currentMenu
        }
    },
    actions: {
        // 登录
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(async res => {
                    setToken(res.token)
                    // await getCurrentUser({ commit })
                    const cookie = useCookies()
                    cookie.remove("tabList")
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 获取当前登录用户信息
        getCurrentUser({ commit }) {
            return new Promise((resolve, reject) => {
                getCurrentUser().then(res => {
                    commit("SET_CURRENT_USER", res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 退出登录
        logout({ commit }) {
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_CURRENT_USER", {})
            const cookie = useCookies()
            cookie.remove("tabList")
        },
        // 获取当前登录用户菜单
        getCurrentMenu({ commit }) {
            return new Promise((resolve, reject) => {
                getCurrentMenu().then(res => {
                    const routes = res && res.routes || []
                    commit("SET_CURRENT_MENU", res)
                    addRoutes(routes)
                    const cookie = useCookies()
                    const tbs = cookie.get("tabList") || []
                    const newTbs = [{ title: '后台首页', path: "/" }]
                    tbs.forEach(item => {
                        if (item.path != "/" && routes.find(obj => obj.route === item.path)) {
                            newTbs.push(item)
                        }
                    })
                    cookie.set("tabList", newTbs)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
    }
})

export default store