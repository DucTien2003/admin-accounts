<script setup lang="ts">
import { computed, createVNode, onMounted, onUnmounted, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { version } from '../../package.json';
import { SliderStore } from '@/stores';
import Sider from './Slider.vue';

import Profile from '@/views/profile/Index.vue';
import ChangePassword from '@/views/change-password/Index.vue';

const store = SliderStore();
const isMobile = ref(false);

const handleResize = () => {
  const widthScreen = window.innerWidth || 0;
  isMobile.value = widthScreen <= 768;
};
const isCollapsed = computed(() => store.getIsCollapsed);

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleSider = () => {
  store.actionCollapse(!isCollapsed.value);
};

const appVersion = version;

// Handle Logout
const route = useRouter();
const confirmLogout = () => {
  Modal.confirm({
    title: 'Đăng xuất',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Bạn có chắc chắn muốn đăng xuất không?',
    okText: 'Đồng ý',
    cancelText: 'Hủy',
    onOk: () => {
      route.push({ name: 'login', params: {} });
    },
  });
};

// Handle show modal profile
const profileComponentRef = ref<InstanceType<typeof Profile> | null>(null);
const showProfile = () => {
  if (profileComponentRef.value !== null) {
    profileComponentRef.value.showModalProfile();
  }
};

//Handle show modal change password
const changePasswordComponentRef = ref<InstanceType<typeof ChangePassword> | null>(null);
const showChangePassword = () => {
  if (changePasswordComponentRef.value !== null) {
    changePasswordComponentRef.value.showModalChangePassword();
  }
};
</script>

<template>
  <a-layout style="min-height: 100vh">
    <Sider :trigger="null" :is-mobile="isMobile" />
    <a-layout :style="!isMobile ? { marginLeft: isCollapsed ? '80px' : '220px', transition: 'all 0.2s' } : {}">
      <a-layout-header style="background: #fff; padding: 0">
        <div class="flex items-center justify-between w-full">
          <div class="!cursor-pointer px-4" @click="handleSider">
            <template v-if="isCollapsed">
              <MenuFoldOutlined />
            </template>
            <template v-else>
              <MenuUnfoldOutlined />
            </template>
          </div>

          <div class="mr-4">
            <a-dropdown placement="bottomRight">
              <span class="block px-4 text-center h-16 flex items-center cursor-pointer hover:bg-gray-200">
                <a-avatar size="small">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                <span class="ml-2">Admin</span>
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div class="flex items-center" @click="showProfile">
                      <user-outlined />
                      <span class="ml-2">Hồ sơ</span>
                    </div>
                  </a-menu-item>
                  <a-menu-item>
                    <div class="flex items-center" @click="showChangePassword">
                      <user-outlined />
                      <span class="ml-2">Đổi mật khẩu</span>
                    </div>
                  </a-menu-item>
                  <a-menu-item @click="confirmLogout">
                    <div class="flex items-center">
                      <UserOutlined />
                      <span class="ml-2">Đăng xuất</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="!m-4">
        <slot />
      </a-layout-content>
      <a-layout-footer style="text-align: center"> Powered by common - v{{ appVersion }}</a-layout-footer>
    </a-layout>
  </a-layout>
  <Profile ref="profileComponentRef" />
  <ChangePassword ref="changePasswordComponentRef" />
</template>
