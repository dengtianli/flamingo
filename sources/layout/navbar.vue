<template>
  <nav id="layout-navbar">
    <div class="banner">
      <h1 class="title">
        <i class="logo"></i>
        <span class="name">四川省行政许可数据分析决策平台</span>
      </h1>
      <div class="admin">
        <el-dropdown @command="handleCommand" trigger="hover">
          <span class="el-dropdown-link">
            <i class="fa fa-user-o"></i>
            用户
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item divided>修改密码</el-dropdown-item>
            <el-dropdown-item command="quit" divided>
              <i class="fa fa-reply"></i>
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="split">|</span>
        <div class="help">
          <i></i>
          <span>帮助</span>
        </div>
      </div>
    </div>
    <div class="navigator">
      <div class="menu">
        <el-menu theme="dark" default-active="/layout/dashboard" mode="horizontal" router>
          <el-menu-item index="/layout/dashboard">首页</el-menu-item>
          <el-menu-item index="/layout/analysis-case">事项分析</el-menu-item>
          <el-menu-item index="/layout/analysis-transact">办件分析</el-menu-item>
          <el-menu-item index="/layout/analysis-transactor">办件人来源分析</el-menu-item>
        </el-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import Encrypt from "../common/encrypt.js";
export default {
  data() {
    return {}
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  methods: {
    handleCommand(command) {
      const vm = this;
      switch (command) {
        case "quit": {
          vm.$router.push("/login");
          Encrypt.token.empty();
        } break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/base.less";
#layout-navbar {
  display: flex;
  flex-direction: column;
  background-color: @color-primary;
  .banner {
    background-color: @color-primary;
    height: 4.25rem;
    margin: 0 6.3%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .logo {
        height: 2rem;
        width: 2rem;
        margin-right: 1.13rem;
        background: url(../assets/logo.svg) no-repeat;
        background-size: 2rem;
      }
      .name {
        font-size: 1.25rem;
        color: @white;
      }
    }
    .admin {
      width: 10rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .el-dropdown {
        color: @white;
        .el-dropdown-link {
          font-size: 0.88rem;
        }
      }
      .split {
        display: inline-block;
        margin: auto 1.1rem;
        height: 0.38rem;
        color: @white;
        font-size: 0.38rem;
        position: relative;
        top: -0.2rem;
      }
      .help {
        i {
          display: inline-block;
          width: 0.88rem;
          height: 0.88rem;
          background: url(../assets/layout/help.svg) no-repeat;
          margin-right: 0.2rem;
          position: relative;
          top: 0.15rem;
        }
        span {
          color: @white;
          font-size: 0.88rem;
        }
      }
    }
  }
  .navigator {
    display: flex;
    flex-direction: row;
    color: @white;
    height: 4.25rem;
    .menu {
      width: 100%;
      background-color: @color-backgound-regular;
      .el-menu {
        height: 100%;
        margin-left: 6.3%;
        background-color: @color-backgound-regular;
        .el-menu-item {
          height: 100%;
          font-size: 0.88rem;
          color: @color-font-regular;
          &:hover {
            border-bottom-color: @color-primary;
          }
        }
        .is-active {
          color: @color-primary;
          border-bottom-color: @color-primary;
        }
      }
    }
  }
}
</style>
