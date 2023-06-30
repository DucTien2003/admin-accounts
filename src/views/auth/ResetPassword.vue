<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { requiredRule, minLengthRule, confirmPassword } from '@/utils';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';

interface FormState {
  password: string;
  confirmPassword: string;
}

const formState = reactive<FormState>({
  password: '',
  confirmPassword: '',
});

const route = useRouter();
const onFinish = (values: any) => {
  console.log('Success:', values);
  route.push({ name: 'Dashboard' });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="flex items-center justify-center bg-white">
    <div class="flex-1 flex justify-center hide-on-mobile">
      <img src="@/assets/images/auth-images/reset-password.svg" alt="background" class="object-contain" />
    </div>
    <div class="login-main">
      <!-- header -->
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl w-full text-left font-bold">Đặt lại mật khẩu</div>

        <div class="login-logo my-3">
          <img
            src="https://99designs-start-static.imgix.net/homepage/little-danube-logo.png?auto=format&w=216&115&q=60&dpr=2"
            alt="logo"
            class="w-full"
          />
        </div>
      </div>

      <!-- form -->
      <div>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item
            name="password"
            :rules="[requiredRule('Mật khẩu', 'blur', 'string', false, true), minLengthRule('Mật khẩu', 6, 'blur')]"
          >
            <label for="basic_password" class="font-medium inline-block my-1">
              Mật khẩu <span class="text-red-500">*</span>
            </label>
            <a-input-password v-model:value="formState.password" placeholder="Nhập mật khẩu..." />
          </a-form-item>

          <a-form-item
            name="confirm-password"
            :rules="[confirmPassword(formState.password, formState.confirmPassword, 'blur')]"
          >
            <label for="basic_confirm-password" class="font-medium inline-block my-1">
              Xác nhận mật khẩu <span class="text-red-500">*</span>
            </label>
            <a-input-password v-model:value="formState.confirmPassword" placeholder="Nhập lại mật khẩu..." />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="w-full mt-5">Đổi mật khẩu</a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- direction -->
      <div class="flex flex-col items-center mt-3">
        <router-link :to="{ name: 'login' }" class="w-full mb-5">
          <div class="flex items-center justify-center opacity-95 hover:underline text-xs">
            <ArrowLeftOutlined class="mr-1 mt-1" />
            Quay lại đăng nhập
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
