<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Form } from 'ant-design-vue';
import { requiredRule, requiredNumber, requiredTypeRule, extend } from '@/utils';

// Handle profile
interface InfoUser {
  name: string;
  account: string;
  gender: 'Nam' | 'Nữ';
  birthday: string;
  phone: string;
  email: string;
}

const infoUser = reactive<InfoUser>({
  name: 'User Name',
  account: 'accountUser',
  gender: 'Nam',
  birthday: '01-11-2004',
  phone: '0123456789',
  email: 'useremail@gmail.com',
});

const infoUserCurrent = reactive<InfoUser>({
  ...infoUser,
});

const onFinish = (values: any) => {
  extend(infoUserCurrent, infoUser);
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

// Handle modal
const visible = ref<boolean>(false);
const showModalProfile = () => {
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
  showModalProfile,
});
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Hồ sơ"
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
        <a-form-item name="name" :rules="[requiredRule('Họ và tên', 'blur', 'string', true, true)]">
          <label for="basic_name">Họ và tên</label>
          <a-input v-model:value="infoUser.name" />
        </a-form-item>

        <a-form-item name="account" :rules="[]">
          <label for="basic_account">Tên tài khoản</label>
          <a-input disabled="true" v-model:value="infoUser.account" />
        </a-form-item>

        <a-form-item name="gender" :rules="[]">
          <label for="basic_gender">Giới tính</label>
          <a-select v-model:value="infoUser.gender">
            <a-select-option value="Nam">Nam</a-select-option>
            <a-select-option value="Nữ">Nữ</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="birthday" :rules="[]">
          <label for="basic_birthday" class="">Ngày sinh</label>
          <a-date-picker
            v-model:value="infoUser.birthday"
            class="w-full"
            value-format="DD-MM-YYYY"
            format="DD-MM-YYYY"
          />
        </a-form-item>

        <a-form-item
          name="phone"
          :rules="[
            requiredRule('Số điện thoại', 'blur', 'string', false, true),
            requiredNumber('Số điện thoại', 'blur'),
          ]"
        >
          <label for="basic_phone">Số điện thoại</label>
          <a-input v-model:value="infoUser.phone" />
        </a-form-item>

        <a-form-item
          name="email"
          :rules="[requiredRule('Email', 'blur', 'string', false, true), requiredTypeRule('Email', 'email', 'blur')]"
        >
          <label for="basic_email">Email</label>
          <a-input v-model:value="infoUser.email" />
        </a-form-item>

        <a-form-item></a-form-item>

        <div class="text-end">
          <a-button type="primary" html-type="submit">Cập nhật</a-button>
          <a-button style="margin-left: 10px" @click="handleCancel">Thoát</a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss"></style>
