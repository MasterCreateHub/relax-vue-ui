<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/form">Form</router-link> |
        <router-link to="/table">Table</router-link>|
        <router-link to="/detail">Detail</router-link>|
        <router-link to="/test">Test</router-link>
      </nav>
    </header>
    <aside :style="asideStyle">
      <el-button
        class="aside-button"
        icon="el-icon-s-tools"
        @click="handleToggle"
      ></el-button>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
export default {
  data(){
    return {
      expand: false,
      asideStyle: {
        width: "200px",
      },
    };
  },
  methods: {
    handleToggle() {
      if(this.expand){
        this.expand = false;
        this.asideStyle = {
          width: "80px",
        };
      }else{
        this.expand = true;
        this.asideStyle = {
          width: "200px",
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  & header {
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    background-color: azure;
  }
  & aside {
    width: 80px;
    height: calc(100% - 80px);
    box-sizing: border-box;
    background-color: azure;
  }
  & main {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    // box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

nav {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style lang="scss">
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

::-webkit-scrollbar-track {
  border-radius: 30px;
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 30px;
}
</style>
