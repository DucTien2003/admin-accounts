<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { requiredRule, minLengthRule, requiredTypeRule, extend } from '@/utils';
import { Info } from '../../../types/account.ts';

// Handle profile

const infoUser = reactive<Info>({
  key: '',
  account: '',
  password: '',
  email: '',
  status: 'Đang hoạt động',
  note: '',
});

const infoUserCurrent = reactive<Info>({
  ...infoUser,
});

const onFinish = (values: any) => {
  extend(infoUserCurrent, infoUser);
  addUser();
  visible.value = false;
  message.success('Thêm tài khoản thành công', 3);
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

// Handle add account

const props = defineProps<{
  listUser: Info[];
}>();

const state = reactive({
  listUser: props.listUser,
});

const addUser = () => {
  state.listUser.unshift({
    key: `${state.listUser.length + 1}`,
    account: `${infoUserCurrent.account}`,
    email: `${infoUserCurrent.email}`,
    status: `${infoUserCurrent.status}`,
    password: `${infoUserCurrent.password}`,
    note: `${infoUserCurrent.note}`,
  });
};

// Handle modal
const visible = ref<boolean>(false);
const showModalAddAccount = () => {
  visible.value = true;
};

const formRef = ref<InstanceType<typeof Form> | null>(null);
const handleCancel = () => {
  if (formRef.value) {
    (formRef.value as any).clearValidate();
  }
  visible.value = false;
  extend(infoUser, infoUserCurrent);
};

defineExpose({
  showModalAddAccount,
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
      width="60%"
    >
      <a-form
        :model="infoUser"
        ref="formRef"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="mt-2 grid gap-2 sm:gap-3 md:gap-3 md:grid-cols-2 md:grid-rows-3"
      >
        <a-form-item
          name="account"
          :rules="[
            requiredRule('Tên tài khoản', 'blur', 'string', true, true),
            minLengthRule('Tên tài khoản', 6, 'blur'),
          ]"
        >
          <label for="basic_account" class="font-medium inline-block my-1">
            Tên tài khoản <span class="text-red-500">*</span>
          </label>
          <a-input v-model:value="infoUser.account" placeholder="Nhập tên tài khoản..." />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[requiredRule('Mật khẩu', 'blur', 'string', true, true), minLengthRule('Mật khẩu', 6, 'blur')]"
        >
          <label for="basic_password" class="font-medium inline-block my-1">
            Mật khẩu <span class="text-red-500">*</span>
          </label>
          <a-input-password v-model:value="infoUser.password" placeholder="Nhập mật khẩu..." />
        </a-form-item>

        <a-form-item
          name="email"
          :rules="[requiredRule('Email', 'blur', 'string', true, true), requiredTypeRule('Email', 'email', 'blur')]"
        >
          <label for="basic_email" class="font-medium inline-block my-1">
            Email <span class="text-red-500">*</span>
          </label>
          <a-input v-model:value="infoUser.email" placeholder="Username@gmail.com" />
        </a-form-item>

        <a-form-item name="status" :rules="[requiredRule('Trạng thái', 'blur', 'string', true, true)]">
          <label for="basic_status" class="font-medium inline-block my-1">
            Trạng thái <span class="text-red-500">*</span>
          </label>
          <a-input v-model:value="infoUser.status" />
        </a-form-item>

        <a-form-item name="note">
          <label for="basic_note" class="font-medium inline-block my-1"> Ghi chú </label>
          <a-input v-model:value="infoUser.note" placeholder="Ghi chú..." />
        </a-form-item>

        <a-form-item></a-form-item>
        <a-form-item></a-form-item>

        <div class="text-end">
          <a-button type="primary" html-type="submit">Xác nhận</a-button>
          <a-button style="margin-left: 10px" @click="handleCancel">Thoát</a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss"></style>
