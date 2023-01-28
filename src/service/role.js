import { ref, reactive } from 'vue'
import { showModal, toast } from "~/composables/util"
import { listRole, insertRole, updateRole, deleteRole } from '~/api/role'

export const tableData = reactive([])

export const initTableData = () => {
    listRole().then((res) => {
        tableData.length = 0
        tableData.push(...(res || []))
    })
}

export const drawerObj = reactive({})
export const roleFormDrawerRef = ref(null)
export const roleForm = ref(null)
export const roleData = reactive({})
export const roleRules = {
    code: [
        { required: true, message: '角色代码不能为空', trigger: 'blur' },
        { max: 30, message: '角色代码长度不超过30位', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '角色名称不能为空', trigger: 'blur' },
        { max: 50, message: '角色名称长度不超过50位', trigger: 'blur' }
    ]
}

export const openDrawer = item => {
    drawerObj.title = item && item.code ? '修改角色' : '添加角色'
    drawerObj.disabled = item && item.code ? true : false
    roleData.code = item && item.code
    roleData.name = item && item.name
    roleFormDrawerRef.value.open()
}

export const handleRole = () => {
    roleForm.value.validate((valid) => {
        if (!valid) {
            return false
        }
        const func = drawerObj.disabled ? updateRole : insertRole
        roleFormDrawerRef.value.showLoading()
        func(roleData).then((res) => {
            if (res) {
                toast(`${drawerObj.title}成功`)
                initTableData()
                roleFormDrawerRef.value.close()
            }
        }).finally(() => {
            roleFormDrawerRef.value.hideLoading()
        })
    })
}

export const delRole = code => {
    showModal('', '是否要删除角色？').then(() => {
        deleteRole(code).then(res => {
            if (res) {
                toast('删除角色成功')
                initTableData()
            }
        })
    })
}