<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view/>
  </div>
</template>
<script>
/*
  目标1： 提交登录
  1. 输入手机号，验证码246810，实现提交操作
  2. 在api中创建登录接口
  3. 在api/index.js 统一导出接口
  4. 设置提交方法逻辑
*/
export default {
  name: 'APP'
}
</script>

<style lang="less" scoped>
h1{
  font-size: 30px;
}
</style>
