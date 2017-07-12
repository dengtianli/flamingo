<template>
  <div id="login">
    <el-row class="fill" type="flex" justify="start" align="middle">
      <div class="login-left">
        <img class="login-image" src="../assets/login/logo.svg">
        <span class="login-title">四川省行政许可
            <br>数据分析决策平台</span>
      </div>
      <div class="login-right" @keydown="onKeydown($event)">
        <form class="login-form" :model="ruleForm" ref="ruleForm" @keydown="onKeydown($event)">
          <div class="input" id="userDiv" @click="getFocus($event)"><label>用户名</label><input v-model="ruleForm.username" @blur="onBlur($event)" id="username" name="username" type="text" autocomplete="off" />
          </div>
          <div class="error" v-if="validUser">用户名不能为空</div>
          <div class="input" id="passDiv" @click="getFocus($event)"><label>密&nbsp;&nbsp;&nbsp;码</label><input v-model="ruleForm.password" @blur="onBlur($event)" id="password" name="password" type="password" autocomplete="off" /></div>
          <div class="error" v-if="validPass">密码不能为空</div>
          <div class="login-checkbox"><input v-model="remember" id="remember" name="remember" type="checkbox" autocomplete="off" />记住账号</div>
          <button id="submit" class="submit" type="botton" @click="onSubmit($event)"><span>登录</span></button>
        </form>
      </div>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Http from "../common/http.js";
  import Encrypt from "../common/encrypt.js";
  import Cookies from "js-cookie";
  import $ from "jquery";
  const master = Http.url.master;
  export default {
    data() {
      return {
        ruleForm: {
          username: "",
          password: ""
        },
        remember: false,
        validUser: false,
        validPass: false,
        dialogVisible: false,
      }
    },
    beforeMount() {
      if (Cookies.get("rmbUser") == "true") {
        this.remember = false;
        this.ruleForm.username = Cookies.get("username");
        this.ruleForm.password = Cookies.get("password");
      }
    },
    computed: {},
    methods: {
      getFocus(event) {
        // console.log(event.target);
        if (event.target.id == "userDiv") {
          $("#username").focus();
        }
        if (event.target.id == "passDiv") {
          $("#password").focus();
        }
      },
      onBlur(event) {
        // console.log(event.target.value);
        if (event.target.id == "username" && event.target.value == "") {
          this.validUser = true;
          $("#username").focus();
        }
        if (event.target.value) {
          this.validUser = false;
          this.validPass = false;
        }
        if (event.target.id == "password" && event.target.value == "") {
          this.validPass = true;
          $("#password").focus();
        }
      },
      onKeydown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
          this.onSubmit();
        }
      },
      onSubmit(event) {
        event.preventDefault();
        // console.log(this.ruleForm);
        const vm = this;
        if (this.ruleForm.username && this.ruleForm.password) {
          Http.fetch({
            method: "post",
            url: master + "/login",
            data: {
              loginName: Encrypt.sha(vm.ruleForm.username),
              password: Encrypt.sha(vm.ruleForm.password)
            }
          }).then(
            function(result) {
              if (result && result.data) {
                let head = result.data.head;
                switch (head.status) {
                  case 200:
                    {
                      if (vm.remember) {
                        var str_username = vm.ruleForm.username;
                        var str_password = vm.ruleForm.password;
                        Cookies.set("rmbUser", "true", {
                          expires: 7
                        }); //存储一个带7天期限的cookie
                        Cookies.set("username", str_username, {
                          expires: 7
                        });
                        Cookies.set("password", str_password, {
                          expires: 7
                        });
                      } else {
                        Cookies.set("rmbUser", "false", {
                          expire: -1
                        });
                        Cookies.set("username", "", {
                          expires: -1
                        });
                        Cookies.set("password", "", {
                          expires: -1
                        });
                      }
                      Encrypt.token.set(head.token);
                      vm.$router.push("/layout/dashboard");
                    }
                    break;
                  default:
                    {
                      this.$message({
                        type: 'warning',
                        message: head.message
                      });
                    }
                }
              }
            })
        } else if (this.ruleForm.username == "" && this.ruleForm.password) {
          this.validUser = true;
          $("#username").focus();
        } else if (this.ruleForm.password == "" && this.ruleForm.username) {
          this.validPass = true;
          $("#password").focus();
        } else {
          this.validUser = true;
          this.validPass = true;
          $("#username").focus();
        }
      },
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    },
    beforeCreate() {
      Encrypt.token.empty();
    },
  }
</script>

<style lang="less" scoped>
  @import "../common/base.less";
  #login {
    .fill;
    overflow-y: hidden;
    background: @color-backgound-regular;
    .login-left {
      background: @color-backgound-regular url('../assets/login/login.svg') no-repeat;
      background-position: top right;
      background-size: cover;
      width: 60.8%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .login-image {
        margin: 18.31rem 2.5rem 25.63rem 7.38rem;
        width: 7.38rem;
        height: 7.38rem;
      }
      .login-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 17.81rem 15% 25.13rem 0;
        font-size: 3rem;
        line-height: 4.19rem;
        color: #FFFFFF;
        width: 24rem;
        height: 8.38rem;
      }
    }
    .login-right {
      width: 39.2%;
      height: 100%;
      display: flex; // align-items: center;
      // justify-content: center;
      .login-form {
        width: 18.75rem;
        height: 23.2%;
        margin-bottom: 18.25rem;
        margin-left: 2.75rem;
        margin-top: 18.25rem;
        color: #E3E3E3;
        font-size: @size-title-small;
        background-color: @color-backgound-regular;
        .error {
          color: red;
          font-size: @size-text-small;
          margin-top: -2rem;
          margin-bottom: 1.44rem;
        }
        .input {
          font-size: @size-title-small;
          width: 18.75rem;
          padding-bottom: 0.75rem;
          margin-bottom: 2.44rem;
          line-height: 1.38rem;
          border-sizing: border-box;
          border-bottom: 0.06rem solid @color-primary;
          display: inline-flex;
          label {
            font-size: @size-title-small;
            color: #E3E3E3;
            width: 3rem;
          }
          input {
            width: 11.31rem;
            font-size: @size-title-small;
            margin-left: 4.44rem;
            border: none;
            color: #E3E3E3;
            background-color: @color-backgound-regular;
          }
          input:focus {
            outline: 0;
            border: none;
            color: #E3E3E3;
            background-color: @color-backgound-regular;
          }
        }
        .login-checkbox {
          font-size: @size-text-large;
          margin-bottom: 2.5rem;
          margin-top: -1.11rem;
          line-height: 1.25rem;
          color: @color-primary;
          input {
            width: 1.13rem;
            height: 1.13rem;
            margin: 0 0.88rem 0 0;
            border: 1px solid #52547D;
            border-radius: 2px;
          }
        }
        button:hover {
          cursor: pointer;
        }
        .submit {
          width: 18.75rem;
          height: 2.88rem;
          font-size: @size-titile-regular; // padding:0.63rem 8.06rem 0.69rem 8.06rem;
          line-height: 1.56rem;
          color: @white;
          background-image: linear-gradient(-90deg, #6391FF 1%, #6391FF 98%);
          border: none;
          span {
            letter-spacing: 1rem; // width: 2.63rem;
            // height:1.56rem;
          }
        }
      }
    }
  }
</style>
