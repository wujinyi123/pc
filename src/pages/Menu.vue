<template>
  <div style="margin: 0px 0px 10px 25px;">
    <el-button size="small" type="primary" icon="Plus" @click="openDrawer(null)">添加</el-button>
  </div>
  <el-tree style="width:30%" :data="menuData.tree" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent" />
  <CommonDrawer ref="drawerRef" :title="formData.title" destroyOnClose @submit="handleSubmit">
    <el-form ref="formRef" :model="formData.data" :rules="formData.rules" status-icon size="small" label-width="100px" style="width:70%;margin: 0px auto">
      <el-form-item label="上级菜单" prop="parentCode">
        <el-select v-model="formData.data.parentCode" filterable placeholder="请选择上级菜单" style="width:100%">
          <el-option v-for="item in menuData && menuData.folders || []" :key="item.parentCode" :label="item.name" :value="item.parentCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单代码" prop="code">
        <el-input v-model="formData.data.code" autocomplete="off" :disabled="formData.disabled" placeholder="请输入菜单代码" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formData.data.name" autocomplete="off" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="icon图标" prop="icon">
        <el-input v-model="formData.data.icon" autocomplete="off" placeholder="请输入icon图标" />
      </el-form-item>
      <el-form-item label="是否配路由" prop="type">
        <el-radio-group v-model="formData.data.type" :disabled="formData.disabled">
          <el-radio :label="2" size="small">是</el-radio>
          <el-radio :label="1" size="small">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路由地址" prop="route" v-if="formData.data.type===2">
        <el-input v-model="formData.data.route" autocomplete="off" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item label="排序数字" prop="sortNo">
        <el-input v-model="formData.data.sortNo" autocomplete="off" placeholder="请输入排序数字" />
      </el-form-item>
    </el-form>
  </CommonDrawer>
</template>

<script setup>
import CommonDrawer from '~/components/CommonDrawer.vue'
import { onMounted } from 'vue'
import {
  defaultProps,
  menuData,
  renderContent,
  initData,
  drawerRef,
  formRef,
  formData,
  openDrawer,
  handleSubmit
} from '~/service/menu'
onMounted(() => {
  initData()
})
</script>

<style scoped>
</style>