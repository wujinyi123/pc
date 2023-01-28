<template>
  <div style="width: 80%; margin: 0 auto;">
    <div style="margin: 10px 0px;">
      <el-button size="small" type="primary" icon="Plus" @click="openDrawer(null)">添加</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="code" label="角色代码" align="center" />
      <el-table-column prop="name" label="角色名称" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="openDrawer({...scope.row})">编辑</el-button>
          <el-button size="small" type="danger" @click="delRole(scope.row&&scope.row.code)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <CommonDrawer ref="roleFormDrawerRef" :title="drawerObj.title" destroyOnClose @submit="handleRole">
    <el-form ref="roleForm" :model="roleData" :rules="roleRules" status-icon size="small" label-width="80px" style="width:70%;margin: 0px auto">
      <el-form-item label="角色代码" prop="code">
        <el-input v-model="roleData.code" autocomplete="off" :disabled="drawerObj.disabled" placeholder="请输入角色代码" />
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleData.name" autocomplete="off" placeholder="请输入角色名称" />
      </el-form-item>
    </el-form>
  </CommonDrawer>
</template>

<script setup>
import CommonDrawer from '~/components/CommonDrawer.vue'
import { onMounted } from 'vue'
import {
  tableData,
  initTableData,
  drawerObj,
  roleFormDrawerRef,
  roleForm,
  roleData,
  roleRules,
  openDrawer,
  handleRole,
  delRole
} from '~/service/role'
onMounted(() => {
  initTableData()
})
</script>

<style scoped>
</style>