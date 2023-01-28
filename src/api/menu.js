import { common } from '~/axios'

export const getCurrentMenu = () => {
    return common.get('/menu/current')
}

export const getMenuInfo = () => {
    return common.get('/menu/info')
}

export const insertMenu = data => {
    return common.post('/menu/info', data)
}

export const updateMenu = data => {
    return common.put('/menu/info', data)
}

export const deleteMenu = code => {
    return common.delete('/menu/info', { params: { code } })
}