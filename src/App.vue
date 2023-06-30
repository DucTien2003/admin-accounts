<script setup lang="ts">
import { useMeta } from 'vue-meta';
import { useRoute } from 'vue-router';
import { PUBLIC_LAYOUT } from '@/constants';
import { computed } from 'vue';

useMeta({
  title: 'Hệ thống Inventory CMS',
  description: 'Hệ thống Inventory CMS',
  htmlAttrs: { lang: 'en', amp: true },
});

const route = useRoute();
const layout = computed(() => `${route.meta.layout || PUBLIC_LAYOUT}-layout`);
</script>

<template>
  <AConfigProvider :locale="'vi'">
    <metainfo>
      <template #title="{ content }">
        {{ content ? `${content} | Inventory CMS` : `Inventory CMS` }}
      </template>
    </metainfo>
    <component :is="layout">
      <router-view />
    </component>
  </AConfigProvider>
</template>
