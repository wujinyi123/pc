<template>
  <el-sub-menu v-if="menuObj.type===1" :index="menuObj.code">
    <template #title>
      <el-icon>
        <component :is="menuObj.icon"></component>
      </el-icon>
      <span>{{ menuObj.name }}</span>
    </template>
    <MenuTree v-for="obj in menuObj.children || []" :key="obj.code" :menuObj="obj" />
  </el-sub-menu>
  <el-menu-item v-else :index="menuObj.route">
    <el-icon>
      <component :is="menuObj.icon"></component>
    </el-icon>
    <span>{{ menuObj.name }}</span>
  </el-menu-item>
</template>

<script setup>
const props = defineProps({
  menuObj: Object
})
</script>