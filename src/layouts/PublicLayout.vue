<template>
  <div>
    <a-layout>
      <slot></slot>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.ant-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
