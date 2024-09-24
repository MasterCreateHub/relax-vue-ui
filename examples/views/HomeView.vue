<template>
  <div class="home">
    <div class="abc"></div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      

    }
  },
  methods: {
    mounted() {
      


    }


  }
};
</script>
<style lang="scss" scoped>
$angle: 60deg; // 全局变量定义

.abc {
  width: 100px;
  height: 100px;
  background-color: aqua;
  margin: 0 auto;
  transform: rotate($angle); // 使用全局变量

  &:hover {
    $angle: 30deg; // 重新赋值局部变量
    transform: rotate($angle); // 使用局部变量
  }
}
</style>
