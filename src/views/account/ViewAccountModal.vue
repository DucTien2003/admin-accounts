<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form } from 'ant-design-vue';

import { Info } from '../../../types/account.ts';

// Handle profile
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

// Handle modal
const visible = ref<boolean>(false);
let recordInfo: Info;
const showModalViewAccount = (record: Info) => {
  recordInfo = reactive<Info>(record);
  visible.value = true;
};

const formRef = ref<InstanceType<typeof Form> | null>(null);
const handleCancel = () => {
  visible.value = false;
};

defineExpose({
  showModalViewAccount,
});
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Sửa thông tin tài khoản"
      :okButtonProps="{ hidden: true }"
      :cancelButtonProps="{ hidden: true }"
      @cancel="handleCancel"
      width="60%"
    >
      <a-form
        :model="recordInfo"
        ref="formRef"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="mt-2 grid gap-2 sm:gap-3 md:gap-3 md:grid-cols-2 md:grid-rows-3"
      >
        <a-form-item name="account">
          <label for="basic_account" class="font-medium inline-block my-1"> Tên tài khoản </label>
          <a-input v-model:value="recordInfo.account" readonly="true" />
        </a-form-item>

        <a-form-item name="password">
          <label for="basic_password" class="font-medium inline-block my-1"> Mật khẩu </label>
          <a-input-password v-model:value="recordInfo.password" readonly="true" />
        </a-form-item>

        <a-form-item name="email">
          <label for="basic_email" class="font-medium inline-block my-1"> Email </label>
          <a-input v-model:value="recordInfo.email" readonly="true" />
        </a-form-item>

        <a-form-item name="status">
          <label for="basic_status" class="font-medium inline-block my-1"> Trạng thái </label>
          <a-input v-model:value="recordInfo.status" readonly="true" />
        </a-form-item>

        <a-form-item name="note">
          <label for="basic_note" class="font-medium inline-block my-1"> Ghi chú </label>
          <a-input v-model:value="recordInfo.note" readonly="true" />
        </a-form-item>

        <a-form-item></a-form-item>
        <a-form-item></a-form-item>

        <div class="text-end">
          <a-button style="margin-left: 10px" @click="handleCancel">Thoát</a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss"></style>
