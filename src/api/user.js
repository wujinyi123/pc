import { common } from '~/axios'

export const login = data => {
    return common.post('/user/login', data)
}

export const getCurrentUser = () => {
    return common.get('/user/current')
}

export const logout = () => {
    return common.get('/user/logout')
}

export const updatePassword = data => {
    return common.post('/user/updatePassword', data)
}