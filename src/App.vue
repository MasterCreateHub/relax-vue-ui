<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/form">Form</router-link> |
        <router-link to="/tool">Tool</router-link> |
        <router-link to="/table">Table</router-link>
      </nav>
    </header>
    <aside>

    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
*{
  margin: 0px;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  & header{
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    background-color: azure;
  }
  & aside{
    width: 80px;
    height: calc(100% - 80px);
    box-sizing: border-box;
    background-color: azure
  }
  & main{
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    padding: 20px;
    box-sizing: border-box;
    background-color: azure
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
