
import NotFound from '~/pages/NotFound.vue'
import Role from '~/pages/Role.vue'
import Menu from '~/pages/Menu.vue'

export default [
    {
        path: "/xxx1",
        name: "/xxx1",
        component: NotFound,
        meta: {
            title: "测试1"
        }
    },
    {
        path: "/xxx2",
        name: "/xxx2",
        component: NotFound,
        meta: {
            title: "测试2"
        }
    },
    {
        path: "/xxx3",
        name: "/xxx3",
        component: NotFound,
        meta: {
            title: "测试3"
        }
    },
    {
        path: "/xxx4",
        name: "/xxx4",
        component: NotFound,
        meta: {
            title: "测试4"
        }
    },
    {
        path: "/xxx5",
        name: "/xxx5",
        component: NotFound,
        meta: {
            title: "测试5"
        }
    },
    {
        path: "/xxx6",
        name: "/xxx6",
        component: NotFound,
        meta: {
            title: "测试6"
        }
    },
    {
        path: "/role",
        name: "/role",
        component: Role,
        meta: {
            title: "角色管理"
        }
    },
    {
        path: "/menu",
        name: "/menu",
        component: Menu,
        meta: {
            title: "菜单管理"
        }
    }
]