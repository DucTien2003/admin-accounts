<script setup lang="ts">
import { reactive } from 'vue';
import { requiredRule, requiredTypeRule } from '@/utils';
import { useRouter } from 'vue-router';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';

interface FormState {
  email: string;
}

const formState = reactive<FormState>({
  email: '',
});

const route = useRouter();

const onFinish = (values: any) => {
  route.push({ name: 'reset-password' });
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="flex items-center justify-center bg-white">
    <div class="flex-1 flex justify-center hide-on-mobile">
      <img src="@/assets/images/auth-images/forgot-password.svg" alt="background" class="object-cover" />
    </div>
    <div class="login-main">
      <!-- header -->
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl w-full text-left font-bold">Quên mật khẩu</div>

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
            name="email"
            :rules="[requiredRule('Email', 'blur', 'string', false, true), requiredTypeRule('Email', 'email', 'blur')]"
          >
            <label for="basic_email" class="font-medium inline-block my-1">
              Nhập email của bạn <span class="text-red-500">*</span>
            </label>
            <a-input v-model:value="formState.email" placeholder="Username@gmail.com" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="w-full mt-5">Đặt lại mật khẩu</a-button>
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
