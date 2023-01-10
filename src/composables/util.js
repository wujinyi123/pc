import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息提示
export const toast = (message, type = "success", dangerouslyUseHTMLString = false, duration = 2000) => {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration
    })
}

// 显示全屏loading
export const showFullLoading = () => {
    nprogress.start()
}

// 隐藏全屏loading
export const hideFullLoading = () => {
    nprogress.done()
}

export const showModal = (title = "Warning", content = "提示内容", type = "warning") => {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}