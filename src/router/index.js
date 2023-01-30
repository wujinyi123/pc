import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Login from '~/pages/Login.vue'
import NotFound from '~/pages/NotFound.vue'
import Admin from "~/layouts/Admin.vue";
import Index from '~/pages/Index.vue'
import asyncRoutes from './asyncRoutes'

// 默认路由，所有用户共享
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "登录页"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: "页面不存在"
        }
    }]

// 后台首页
const indexRoute = {
    path: "/",
    name: "/",
    component: Index,
    meta: {
        title: "后台首页"
    }
}

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export const addRoutes = menuRoutes => {
    // 清除默认路由外的其他路由
    const defaultRoutes = routes.map(item => item.path)
    const allRoutes = router.getRoutes()
    allRoutes.forEach(item => {
        if (defaultRoutes.indexOf(item.path) === -1) {
            router.removeRoute(item.path)
        }
    })

    // 添加后台首页
    if (!router.hasRoute(indexRoute.path)) {
        router.addRoute("admin", indexRoute)
    }
    // 添加动态路由
    asyncRoutes.forEach(data => {
        const item = { ...data }
        let routeObj = menuRoutes.find(obj => obj.route === item.path)
        if (routeObj && !router.hasRoute(item.path)) {
            item.meta = {
                title: routeObj.name
            }
            router.addRoute("admin", item)
        } else if (item.fromPath) {
            if (item.fromPath instanceof Array) {
                routeObj = menuRoutes.find(obj => item.fromPath.indexOf(obj.route) > -1)
            } else {
                routeObj = menuRoutes.find(obj => obj.route === item.fromPath)
            }
            if (routeObj && !router.hasRoute(item.path)) {
                router.addRoute("admin", item)
            }
        }
    })
    return true
}