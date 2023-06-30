import { defineAsyncComponent } from 'vue';

export function registerGlobalComponent(app: any) {
  app.component(
    'PublicLayout',
    defineAsyncComponent(() => import('@/layouts/PublicLayout.vue'))
  );
  app.component(
    'DefaultLayout',
    defineAsyncComponent(() => import('@/layouts/DefaultLayout.vue'))
  );
  app.component(
    'AuthLayout',
    defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
  );
}
