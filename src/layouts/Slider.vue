<script setup lang="ts">
import { computed } from 'vue';
import Logo from './Logo.vue';
import Menu from './Menu.vue';
import { SliderStore } from '@/stores/modules/Slider';

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});
const store = SliderStore();
const isCollapsed = computed(() => store.getIsCollapsed);
const handleSider = () => {
  store.actionCollapse(!isCollapsed.value);
};
// const selectedKeys = ref<string[]>(['1']);
// const collapsed = ref<boolean>(false);
</script>

<template>
  <div>
    <a-layout-sider
      :width="!isCollapsed ? 220 : 80"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      v-model:collapsed="isCollapsed"
      :trigger="null"
      collapsible
      v-if="!isMobile"
    >
      <div class="logo-wrapper mb-3">
        <Logo :width="isCollapsed ? 30 : 120" :type="!isCollapsed ? 'white' : ''" />
      </div>
      <Menu :isMobile="false"></Menu>
    </a-layout-sider>

    <div v-if="isMobile">
      <a-drawer
        :width="256"
        placement="left"
        :closable="false"
        :visible="isCollapsed"
        @close="handleSider"
        :body-style="{ padding: 0 }"
        class="slider-drawer"
      >
        <div class="logo-wrapper mb-3 mt-3">
          <Logo :width="120" type="white" />
        </div>
        <Menu :isMobile="false" />
      </a-drawer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  height: 48px;
  padding-left: 24px;
  display: flex;
  align-items: center;
}

:deep(ant-badge) {
  position: absolute;
  right: 16px;
  top: 12px;

  &:deep(-count) {
    box-shadow: none;
    min-width: 18px;
    height: 18px;
    font-size: 8px;
    line-height: 18px;
  }
}

.layout-sider-pc {
  height: 100vh;
}

.layout-sider-mobile {
  .ant-drawer-body {
    padding: 0;
  }
}
</style>
