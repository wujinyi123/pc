<template>
  <div style="margin: 0px 0px 10px 25px;">
    <el-select v-model="roleData.roleCode" placeholder="请选择角色" @change="listRoleMenu">
      <el-option v-for="item in roleData && roleData.list || []" :key="item.code" :label="item.name" :value="item.code" />
    </el-select>
    <el-button style="margin-left:10px" type="primary" @click="saveRoleMenuFunc">保存</el-button>
  </div>
  <el-tree ref="treeRef" style="width:30%" :data="menuData.tree" show-checkbox node-key="code" default-expand-all :expand-on-click-node="false" :render-content="renderContent" />
</template>

<script setup>
import { onMounted } from 'vue'
import {
  treeRef,
  roleData,
  menuData,
  renderContent,
  initData,
  listRoleMenu,
  saveRoleMenuFunc
} from '~/service/roleMenu'
onMounted(() => {
  initData()
})
</script>

<style scoped>
</style>