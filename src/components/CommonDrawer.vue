<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false" :destroy-on-close="destroyOnClose">
    <div class="drawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions items-center justify-center">
        <el-button type="primary" v-if="submit" @click="submit" :loading="loading">{{ confirmText }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  }
})

const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)

// 打开
const open = () => (showDrawer.value = true)

// 关闭
const close = () => (showDrawer.value = false)

// 提交
const emit = defineEmits(['submit'])
const submit = () => emit('submit')

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})
</script>
<style>
.drawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.drawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.drawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>