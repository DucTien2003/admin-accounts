<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

import AddAccountModal from './AddAccountModal.vue';
import EditAccountModal from './EditAccountModal.vue';
import ViewAccountModal from './ViewAccountModal.vue';
import RemoveAccountModal from './RemoveAccountModal.vue';
import { Info } from '../../../types/account.ts';

// Handle Time
// const addZero = (number: number) => {
//   return number < 10 ? '0' + number : number;
// };
// const getTime = () => {
//   let cd = new Date();
//   let getDate = addZero(cd.getDate());
//   let getMonth = addZero(cd.getMonth() + 1);
//   let getFullYear = cd.getFullYear();
//   let getHours = addZero(cd.getHours());
//   let getMinutes = addZero(cd.getMinutes());

//   return `${getDate}/${getMonth}/${getFullYear} ${getHours}:${getMinutes}`;
// };

// Form
const columns = [
  {
    title: 'Tên tài khoản',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Thời gian hoạt động gần nhất',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Hành động',
    key: 'action',
  },
];

const data = reactive<Info[]>([]);
const getListAccounts = () => {
  axios
    .get<Info[]>('https://649958fb79fbe9bcf83f0f2f.mockapi.io/test/api/accounts')
    .then(function (response) {
      // handle success
      data.splice(0, data.length, ...response.data.reverse());
      console.log(response);
    })
    .catch(function (error: any) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

getListAccounts();

// Handle show modals
const addAccountComponentRef = ref<InstanceType<typeof AddAccountModal> | null>(null);
const showAddAccountModal = () => {
  if (addAccountComponentRef.value !== null) {
    addAccountComponentRef.value.showModalAddAccount();
  }
};

const editAccountComponentRef = ref<InstanceType<typeof EditAccountModal> | null>(null);
const showEditAccountModal = (record: Info) => {
  if (editAccountComponentRef.value !== null) {
    editAccountComponentRef.value.showModalEditAccount(record);
  }
};

const viewAccountComponentRef = ref<InstanceType<typeof ViewAccountModal> | null>(null);
const showViewAccountModal = (record: Info) => {
  if (viewAccountComponentRef.value !== null) {
    viewAccountComponentRef.value.showModalViewAccount(record);
  }
};

const removeAccountComponentRef = ref<InstanceType<typeof RemoveAccountModal> | null>(null);
const showRemoveAccountModal = (index: number) => {
  if (removeAccountComponentRef.value !== null) {
    removeAccountComponentRef.value.showModalRemoveAccount(index);
  }
};

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
        placeholder="Tìm kiếm theo tên tên tài khoản"
        enter-button
        @search="onSearch"
        class="!w-72"
      />
      <a-button type="primary" @click="showAddAccountModal">Thêm tài khoản</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record, index }">
        <!-- time -->
        <template v-if="column.key === 'status'">
          <a-badge :color="record.status === 'Đang hoạt động' ? 'green' : 'red'" :text="record.status" />
        </template>
        <!-- actions -->
        <template v-if="column.key === 'action'">
          <span class="w-32 flex">
            <div class="cursor-pointer mr-3 hover:text-green-600" @click="showViewAccountModal(record)">Xem</div>
            <a-divider type="vertical" />
            <div class="cursor-pointer mx-3 hover:text-yellow-500" @click="showEditAccountModal(record)">Sửa</div>
            <a-divider type="vertical" />
            <div class="cursor-pointer ml-3 hover:text-red-600" @click="showRemoveAccountModal(index)">Xóa</div>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <AddAccountModal ref="addAccountComponentRef" :listUser="data" />
  <EditAccountModal ref="editAccountComponentRef" />
  <ViewAccountModal ref="viewAccountComponentRef" />
  <RemoveAccountModal ref="removeAccountComponentRef" :listUser="data" />
</template>
