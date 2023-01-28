import { common } from '~/axios'

export const listRole = () => {
    return common.get('/common/role')
}

export const insertRole = data => {
    return common.post('/common/role', data)
}

export const updateRole = data => {
    return common.put('/common/role', data)
}

export const deleteRole = code => {
    return common.delete('/common/role', { params: { code } })
}