<template>
  <div class="f-menu" :style="{ width:$store.state.asideWidth }">
    <el-menu :default-active="defaultActive" unique-opened :collapse="isCollapse" class="border-0" @select="handleSelect" :collapse-transition="false">
      <MenuTree v-for="obj in asideMenus || []" :key="obj.code" :menuObj="obj" />
    </el-menu>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import MenuTree from '~/components/MenuTree.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()

// 默认选中
const defaultActive = ref(route.path)

// 是否折叠
const isCollapse = computed(() => store.state.asideWidth !== '250px')

const asideMenus = computed(
  () => (store.state.currentMenu && store.state.currentMenu.tree) || []
)

const handleSelect = (e) => {
  router.push(e)
}
</script>
<style scoped>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>