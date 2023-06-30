declare enum Layout {
  AuthLayout,
  PublicLayout,
  DefaultLayout,
}

declare module 'vue-router' {
  interface RouteMeta {
    isVisible?: boolean;
    icon?: any;
    authority?: string | string[];
    notAuthRequired?: boolean;
    layout?: keyof typeof Layout;
    isSubMenu?: any;
  }
}
