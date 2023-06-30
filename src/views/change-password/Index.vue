<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message, Form } from 'ant-design-vue';
import { requiredRule, minLengthRule, confirmPassword } from '@/utils';

// Handle Change Password
interface ChangePassFormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePassFormState = reactive<ChangePassFormState>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const onFinish = (values: any) => {
  message.success('Đổi mật khẩu thành công', 3);
  visible.value = false;
  resetModal();
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  message.error('Đổi mật khẩu thất bại', 3);
  console.log('Failed:', errorInfo);
};

// Handle modal
const visible = ref<boolean>(false);
const showModalChangePassword = () => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
  resetModal();
};

defineExpose({
  showModalChangePassword,
});

// Reset modal
const formRef = ref<InstanceType<typeof Form> | null>(null);
const resetModal = () => {
  changePassFormState.oldPassword = '';
  changePassFormState.newPassword = '';
  changePassFormState.confirmPassword = '';
  if (formRef.value) {
    (formRef.value as any).clearValidate();
  }
};
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="Đổi mật khẩu"
    :okButtonProps="{ hidden: true }"
    :cancelButtonProps="{ hidden: true }"
    @cancel="resetModal"
    width="500px"
  >
    <a-form
      :model="changePassFormState"
      ref="formRef"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="oldPassword"
        :rules="[requiredRule('Mật khẩu', 'blur', 'string', false, true), minLengthRule('Mật khẩu', 6, 'blur')]"
      >
        <label for="basic_oldPassword" class="font-medium inline-block my-1">
          Mật khẩu cũ <span class="text-red-500">*</span>
        </label>
        <a-input-password v-model:value="changePassFormState.oldPassword" placeholder="Mật khẩu cũ..." />
      </a-form-item>

      <a-form-item
        name="newPassword"
        :rules="[requiredRule('Mật khẩu', 'blur', 'string', false, true), minLengthRule('Mật khẩu', 6, 'blur')]"
      >
        <label for="basic_newPassword" class="font-medium inline-block my-1">
          Mật khẩu mới <span class="text-red-500">*</span>
        </label>
        <a-input-password v-model:value="changePassFormState.newPassword" placeholder="Mật khẩu mới..." />
      </a-form-item>

      <a-form-item
        name="confirm-password"
        :rules="[confirmPassword(changePassFormState.newPassword, changePassFormState.confirmPassword, 'blur')]"
      >
        <label for="basic_confirm-password" class="font-medium inline-block my-1">
          Xác nhận mật khẩu <span class="text-red-500">*</span>
        </label>
        <a-input-password v-model:value="changePassFormState.confirmPassword" placeholder="Nhập lại mật khẩu mới..." />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="w-full mt-5">Đổi mật khẩu</a-button>
        <a-button @click="handleCancel" class="w-full mt-4">Thoát</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="scss"></style>
