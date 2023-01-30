import { common } from '~/axios'

export const listByRoleCode = roleCode => {
    return common.get('/role/menu', { params: { roleCode } })
}

export const saveRoleMenu = payload => {
    return common.post(`/role/menu?roleCode=${payload.roleCode}`, payload.body)
}