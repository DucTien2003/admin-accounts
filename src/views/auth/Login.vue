<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons-vue';
import { requiredRule, minLengthRule } from '@/utils';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
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
      <img src="@/assets/images/auth-images/login.svg" alt="background" class="object-contain" />
    </div>
    <div class="login-main">
      <!-- header -->
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl w-full text-left font-bold">Đăng nhập</div>

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
            name="username"
            :rules="[requiredRule('Tài khoản', 'blur', 'string', false, true), minLengthRule('Tài khoản', 6, 'blur')]"
          >
            <label for="basic_username" class="font-medium inline-block my-1">
              Tài khoản <span class="text-red-500">*</span>
            </label>
            <a-input v-model:value="formState.username" placeholder="Nhập tên tài khoản..." />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[requiredRule('Mật khẩu', 'blur', 'string', false, true), minLengthRule('Mật khẩu', 6, 'blur')]"
          >
            <label for="basic_password" class="font-medium inline-block my-1">
              Mật khẩu <span class="text-red-500">*</span>
            </label>
            <a-input-password v-model:value="formState.password" placeholder="Nhập mật khẩu..." />
          </a-form-item>

          <div class="flex items-center justify-between">
            <a-form-item name="remember">
              <a-checkbox v-model:checked="formState.remember">Nhớ tài khoản</a-checkbox>
            </a-form-item>
            <div class="mb-3 cursor-pointer font-semibold text-sky-500">
              <router-link :to="{ name: 'forgot-password' }" class="hover:underline">Quên mật khẩu</router-link>
            </div>
          </div>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="w-full">Đăng nhập</a-button>
          </a-form-item>
        </a-form>

        <div class="my-3 text-center text-base font-semibold text-blue-400">Hoặc</div>

        <div class="flex flex-col items-center justify-between">
          <a-button type="ghost" class="login-google-btn flex items-center justify-center w-full">
            <GoogleOutlined class="text-lg cursor-pointer" />
            <span>Đăng nhập với Google</span>
          </a-button>
          <a-button type="ghost" class="login-facebook-btn flex items-center justify-center w-full mt-4">
            <FacebookOutlined class="text-lg ml-2 cursor-pointer" />
            <span>Đăng nhập với Facebook</span>
          </a-button>
        </div>
      </div>

      <!-- direction -->
      <div class="mt-5">
        Tạo tài khoản mới?
        <span class="ml-1 text-sky-500 cursor-pointer hover:underline">Đăng ký</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
