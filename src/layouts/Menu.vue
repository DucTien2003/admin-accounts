<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons-vue';
import { SliderStore } from '@/stores';

export default defineComponent({
  name: 'MenuLayout',
  components: {
    PieChartOutlined,
    UserOutlined,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const store = SliderStore();
    const isCollapsed = computed(() => store.getIsCollapsed);
    const handleSider = () => {
      if (props.isMobile) {
        store.actionCollapse(!isCollapsed.value);
      }
    };
    const state = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
      handleSider,
    };
  },
});
</script>

<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <router-link to="/">Tổng quan</router-link>
      </a-menu-item>

      <a-menu-item key="2">
        <template #icon>
          <UserOutlined />
        </template>
        <router-link to="/manage-user">Quản lý người dùng</router-link>
      </a-menu-item>

      <a-menu-item key="3">
        <template #icon>
          <UserOutlined />
        </template>
        <router-link to="/manage-account">Quản lý tài khoản</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
