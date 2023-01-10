import { common } from '~/axios'

export const insertLog = data => {
    return common.post('/common/log', data)
}