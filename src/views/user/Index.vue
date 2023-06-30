<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  {
    title: 'Tên người dùng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    key: 'birthday',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Hành động',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'Lê Đức Tiến',
    gender: 'Nam',
    birthday: '01/01/2000',
    phone: '0123456789',
    email: 'ductien@gmail.com',
  },
  {
    key: '2',
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    birthday: '10/04/2003',
    phone: '0585766923',
    email: 'abc@gmail.com',
  },
  {
    key: '3',
    name: 'Nguyễn Thị B',
    gender: 'Nữ',
    birthday: '07/05/1999',
    phone: '0976233451',
    email: 'email@gmail.com',
  },
];

// search
const value = ref<string>('');
const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};
</script>

<template>
  <div class="bg-white">
    <div class="flex items-center justify-between p-4">
      <a-input-search
        v-model:value="value"
        placeholder="Tìm kiếm theo tên người dùng"
        enter-button
        @search="onSearch"
        class="!w-72"
      />
      <a-button type="primary">Thêm người dùng</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column }">
        <!-- actions -->
        <template v-if="column.key === 'action'">
          <span class="w-32 flex">
            <div class="cursor-pointer mr-3 hover:text-green-600">Xem</div>
            <a-divider type="vertical" />
            <div class="cursor-pointer mx-3 hover:text-yellow-500">Sửa</div>
            <a-divider type="vertical" />
            <div class="cursor-pointer ml-3 hover:text-red-600">Xóa</div>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
