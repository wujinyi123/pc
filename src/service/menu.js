import { ref, reactive } from 'vue'
import { showModal, toast } from "~/composables/util"
import { getMenuInfo, insertMenu, updateMenu, deleteMenu } from '~/api/menu'

export const menuData = reactive({ tree: [], folders: [] })
export const renderContent = (h, { node, data, store }) => {
    return h(
        'span',
        {
            style:
                'flex: 1;display: flex;  align-items: center;  justify-content: space-between;  font-size: 14px;  padding-right: 8px'
        },
        h('span', null, data.name),
        h(
            'span',
            null,
            h('a', { style: 'color: #409eff', onClick: () => openDrawer({ ...data }) }, '修改 '),
            h(
                'a',
                { style: 'color: #f56c6c;margin-left: 8px', onClick: () => delMenu(data.code) },
                '删除'
            )
        )
    )
}

export const initData = () => {
    getMenuInfo().then(res => {
        menuData.tree = res && res.tree || []
        menuData.folders = [
            {
                parentCode: '/',
                name: '/'
            },
            ...(res && res.folders || []).map(item => {
                return {
                    parentCode: item && item.code,
                    name: `/${item && item.names.join('/')}`
                }
            })
        ]
    })
}

export const drawerRef = ref(null)
export const formRef = ref(null)
export const formData = reactive({
    data: {},
    rules: {
        parentCode: [
            { required: true, message: '上级菜单不能为空', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '菜单代码不能为空', trigger: 'blur' },
            { max: 30, message: '菜单代码长度不超过30位', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '菜单名称不能为空', trigger: 'blur' },
            { max: 50, message: '菜单名称长度不超过50位', trigger: 'blur' }
        ],
        icon: [
            { max: 30, message: 'icon图标长度不超过30位', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '是否配路由不能为空', trigger: 'blur' },
        ],
        route: [
            { required: true, message: '路由不能为空', trigger: 'blur' },
        ],
        sortNo: [
            { required: true, message: '排序数字不能为空', trigger: 'blur' },
        ]
    },
    title: "xxx",
    disabled: false
})

export const openDrawer = obj => {
    formData.data = obj || {}
    if (!formData.data.parentCode) {
        formData.data.parentCode = '/'
    }
    formData.title = obj && obj.code ? '修改菜单' : '添加菜单'
    formData.disabled = obj && obj.code ? true : false
    drawerRef.value.open()
}

export const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        const func = formData.disabled ? updateMenu : insertMenu
        if (formData.data.parentCode === '/') {
            formData.data.parentCode = null
        }
        drawerRef.value.showLoading()
        func(formData.data).then((res) => {
            if (res) {
                toast(`${formData.title}成功`)
                initData()
                drawerRef.value.close()
            }
        }).finally(() => {
            drawerRef.value.hideLoading()
        })
    })
}

const delMenu = code => {
    showModal('', '是否要删除菜单？').then(() => {
        deleteMenu(code).then(res => {
            if (res) {
                toast('删除菜单成功')
                initData()
            }
        })
    })
}