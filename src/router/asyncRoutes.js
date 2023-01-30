
import Role from '~/pages/Role.vue'
import Menu from '~/pages/Menu.vue'
import RoleMenu from '~/pages/RoleMenu.vue'

export default [
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
    },
    {
        path: "/roleMenu",
        name: "/roleMenu",
        component: RoleMenu,
        meta: {
            title: "菜单管理"
        }
    }
]