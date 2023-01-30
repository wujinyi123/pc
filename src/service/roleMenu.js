import { ref, reactive } from 'vue'
import { toast } from "~/composables/util"
import { listByRoleCode, saveRoleMenu } from '~/api/roleMenu'
import { getMenuInfo } from '~/api/menu'
import { listRole } from '~/api/role'

export const treeRef = ref(null)
export const menuData = reactive({ tree: [], routes: [] })
export const renderContent = (h, { node, data, store }) => {
    return h(
        'span',
        {
            style:
                'flex: 1;display: flex;  align-items: center;  justify-content: space-between;  font-size: 14px;  padding-right: 8px'
        },
        h('span', null, data.name)
    )
}
export const roleData = reactive({ list: [] })
export const initData = () => {
    getMenuInfo().then(res => {
        menuData.tree = res && res.tree || []
        menuData.routes = res && res.routes || []
    })
    listRole().then(res => {
        roleData.roleCode = null
        roleData.list = res || []
    })
}

export const listRoleMenu = roleCode => {
    if (roleCode) {
        listByRoleCode(roleCode).then(res => {
            setChecked((res || []).map(item => item.menuCode))
        })
    } else {
        setChecked([])
    }
}

const setChecked = list => {
    treeRef.value.setCheckedKeys(list)
}

export const saveRoleMenuFunc = () => {
    if (!roleData.roleCode) {
        toast('角色不能为空', 'error')
        return
    }
    const payload = {
        roleCode: roleData.roleCode,
        body: treeRef.value.getCheckedKeys().filter(item => menuData.routes.filter(m => m.code === item).length > 0)
    }
    saveRoleMenu(payload).then(res => {
        if (res) {
            toast('保存成功')
        }
    })
}
