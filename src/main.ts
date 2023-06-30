import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import App from './App.vue';
import routes from '@/routes';
import { antd } from '@/plugins';

import { registerGlobalComponent } from '@/utils';

import './assets/css/tailwind.css';
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import './assets/css/main.scss';

const app = createApp(App);
registerGlobalComponent(app);
app.use(routes);
app.use(createPinia());
app.use(antd);
app.use(createMetaManager());
await routes.isReady();
app.mount('#app');
