<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { Info } from '../../../types/account.ts';

const props = defineProps<{
  listUser: Info[];
}>();

const state = reactive({
  listUser: props.listUser,
});

// Handle modal
const visible = ref<boolean>(false);
const removeIndex = ref<number>(-1);
const showModalRemoveAccount = (index: number) => {
  removeIndex.value = index;
  visible.value = true;
};

const handleOK = () => {
  visible.value = false;
  state.listUser.splice(removeIndex.value, 1);
  message.success('Xóa thành công');
};

const handleCancel = () => {
  visible.value = false;
};

defineExpose({
  showModalRemoveAccount,
});
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Thêm tài khoản"
      :okButtonProps="{ hidden: true }"
      :cancelButtonProps="{ hidden: true }"
      @cancel="handleCancel"
    >
      <div v-if="state.listUser[removeIndex]" class="mt-3">
        Xóa tài khoản "{{ state.listUser[removeIndex].account }}" ?
      </div>
      <a-divider class="!my-3" />
      <div class="flex justify-end">
        <a-button type="primary" @click="handleOK">Xác nhận</a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">Thoát</a-button>
      </div>
    </a-modal>
  </div>
</template>

<style lang="scss"></style>
