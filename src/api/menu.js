import { common } from '~/axios'

export const getCurrentMenu = () => {
    return common.get('/menu/current')
}