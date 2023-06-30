<script setup lang="ts">
// import { defineProps } from 'vue';

defineProps({
  width: {
    type: Number,
    default: () => 150,
  },
  type: {
    type: String,
    default: 'default', //default|white|icon-only
  },
});
</script>

<template>
  <div style="line-height: 1" :class="type === 'white' ? 'mt-1' : ''">
    <img v-if="type === 'white'" :width="width" src="@/assets/images/vue.svg" alt="" />

    <img v-else :width="width" src="@/assets/images/vue.svg" alt="" />
  </div>
</template>
