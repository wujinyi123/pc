import { ref, reactive } from 'vue'
import { logout, updatePassword } from "~/api/user"
import { showModal, toast } from "~/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export const useRepassword = () => {
    const router = useRouter()
    const store = useStore()
    const pwdFormDrawerRef = ref(null)
    const pwdForm = ref(null)
    const pwdData = reactive({
        username:
            store.state.currentUser &&
            store.state.currentUser.user &&
            store.state.currentUser.user.username,
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
    })
    const pwdRules = {
        oldPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        newPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule, value, callback) => {
                    if (value && pwdData.oldPassword && value === pwdData.oldPassword) {
                        callback(new Error('新旧密码不能一样'))
                    } else {
                        callback()
                    }
                }
            }
        ],
        checkPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' },
            {
                trigger: 'blur',
                validator: (rule, value, callback) => {
                    if (value && pwdData.newPassword && value !== pwdData.newPassword) {
                        callback(new Error('新密码与确认密码不一致'))
                    } else {
                        callback()
                    }
                }
            }
        ]
    }

    const handlePwdUpdate = () => {
        pwdForm.value.validate((valid) => {
            if (!valid) {
                return false
            }
            pwdFormDrawerRef.value.showLoading()
            updatePassword(pwdData)
                .then((res) => {
                    if (res) {
                        store.dispatch('logout')
                        // 跳转回登录页
                        router.push('/login')
                        toast('修改密码成功，请重新登录')
                    }
                })
                .finally(() => {
                    pwdFormDrawerRef.value.hideLoading()
                })
        })
    }

    const openRePasswordForm = () => pwdFormDrawerRef.value.open()

    return {
        pwdFormDrawerRef,
        pwdForm,
        pwdData,
        pwdRules,
        handlePwdUpdate,
        openRePasswordForm
    }
}

export const userRefreshMenu = () => {
    const store = useStore()
    const refreshMenu = () => {
        store.dispatch('getCurrentMenu')
    }
    return {
        refreshMenu
    }
}

export const useLogout = () => {
    const router = useRouter()
    const store = useStore()
    const handleLogout = () => {
        showModal('', '是否要退出登录？').then(() => {
            logout().finally(() => {
                store.dispatch('logout')
                // 跳转回登录页
                router.push('/login')
                // 提示退出登录成功
                toast('退出登录成功')
            })
        })
    }

    return {
        handleLogout
    }
}