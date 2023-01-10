<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1">
        <eleme-filled />
      </el-icon>
      pc系统
    </span>
    <el-icon class="icon-btn" @click="$store.commit('SET_ASIDE_WIDTH')">
      <fold v-if="$store.state.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.currentUser&&$store.state.currentUser.user&&$store.state.currentUser.user.img" />
          {{ $store.state.currentUser&&$store.state.currentUser.user&&$store.state.currentUser.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="refreshMenu">刷新菜单</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <CommonDrawer ref="pwdFormDrawerRef" title="修改密码" destroyOnClose @submit="handlePwdUpdate">
    <el-form ref="pwdForm" :model="pwdData" :rules="pwdRules" status-icon size="small" label-width="80px" style="width:70%;margin: 0px auto">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="pwdData.oldPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="pwdData.newPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="pwdData.checkPassword" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
  </CommonDrawer>
</template>
<script setup>
import CommonDrawer from '~/components/CommonDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import {
  useRepassword,
  userRefreshMenu,
  useLogout
} from '~/composables/useManager'

const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle
} = useFullscreen()

const {
  pwdFormDrawerRef,
  pwdForm,
  pwdData,
  pwdRules,
  handlePwdUpdate,
  openRePasswordForm
} = useRepassword()

const { handleLogout } = useLogout()

const { refreshMenu } = userRefreshMenu()

// 刷新
const handleRefresh = () => location.reload()

const handleCommand = (c) => {
  switch (c) {
    case 'rePassword':
      openRePasswordForm()
      break
    case 'refreshMenu':
      refreshMenu()
      handleRefresh()
      break
    case 'logout':
      handleLogout()
      break
  }
}
</script>
<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>