<template>
  <div id="layout">
    <header>
      <navbar></navbar>
    </header>
    <main>
      <container></container>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import navbar from "./navbar";
import sidebar from "./sidebar";
import container from "./container";
export default {
  components: {
    navbar,
    sidebar,
    container
  },
  data() {
    return {}
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../common/base.less";
#layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  >header {
    width: 100%;
  }
  >main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: @color-backgound-deep;
    height: initial;
    padding-bottom: 6.13rem;
  }
  >footer {
    width: 100%;
    height: 5rem;
    background: @color-backgound-regular;
  }
};
</style>
