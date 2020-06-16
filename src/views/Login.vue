<!--
 描述: 登录模板
 作者: Jack Chen
 日期: 2020-06-13
-->

<template>
  <div class="login-container">
      <div class="pageHeader">
        <img src="../assets/logo.png" alt="logo">
        <span>TODO区块链管理平台</span>
      </div>

      <div class="login-box">
        <div class="login-text" v-if="typeView != 2">
          <a href="javascript:;" :class="typeView == 0 ? 'active' : ''" @click="handleTab(0)">登录</a>
          <b>·</b>
          <a href="javascript:;" :class="typeView == 1 ? 'active' : ''" @click="handleTab(1)">注册</a>
        </div>
        <!-- 登录模块 -->
        <div class="right-content" v-show="typeView == 0">
          <div class="input-box">
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="userName"
              maxlength="11"
              @keyup="handleInput($event)"
              placeholder="请输入登录邮箱/手机号"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="userPwd"
              maxlength="20"
              @keyup.enter="login"
              placeholder="请输入登录密码"
            />
          </div>
          <Button
            class="loginBtn"
            type="primary"
            :disabled="isDisabled"
            :loading="isLoading"
            @click.stop="login">
            立即登录
          </Button>

          <div class="option">
            <Checkbox class="remember" v-model="checked" @on-change="checkChange">
              <span class="checked">记住我</span>
            </Checkbox>
            <span class="forget-pwd" @click.stop="forgetPwd">忘记密码?</span>
          </div>
        </div>

        <!-- 注册模块 -->
        <div class="right_content" v-show="typeView == 1">
          <div class="input-box">
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="userName"
              placeholder="请输入注册邮箱/手机号"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="userPwd"
              @keyup.enter="register"
              placeholder="请输入密码"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="userPwd2"
              @keyup.enter="register"
              placeholder="请再次确认密码"
            />
          </div>
          <Button 
            class="loginBtn" 
            type="primary" 
            :disabled="isRegAble" 
            :loading="isLoading" 
            @click.stop="register">
            立即注册
          </Button>
         <!--  <div class="option">
            <Checkbox class="remember" v-model="checked" @on-change="checkChange">
              <span class="checked">我已阅读并接受</span>
            </Checkbox>
            <label class="protocol">《用户协议》</label>
          </div> -->
        </div>

        <!-- 重置密码 -->
        <div class="right-content" v-show="typeView == 2">
          <div class="title">重置密码</div>
          <div class="input-box">
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="userName"
              placeholder="请输入登录邮箱/手机号"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="userPwd"
              @keyup.enter="reset"
              placeholder="请输入密码"
            />
            <input
              autocomplete="off"
              type="password"
              class="input"
              v-model="userPwd2"
              @keyup.enter="reset"
              placeholder="请再次确认密码"
            />
          </div>
          <Button 
            class="loginBtn" 
            type="primary" 
            :disabled="isRegAble" 
            :loading="isLoading" 
            @click.stop="reset">
            确认重置
          </Button>
          <div class="option">
            <span class="goback" @click.stop="selectLogin">返回登录注册</span>
          </div>
        </div>

      </div>


  </div>
</template>

<script>

export default {
  name: 'login',
  components: {

  },
  data() {
    return {
      userName: '',
      userPwdOld: '',
      userPwd: '',
      userPwd2: '',
      typeView: 0, //显示不同的view
      checked: false, // 记住登录
      isLoading: false,
    };
  },
  computed: {
    // 登陆按钮状态
    isDisabled() {
      return !(this.userName && this.userPwd);
    },
    // 注册，重置密码按钮状态
    isRegAble() {
      return !(this.userName && this.userPwd && this.userPwd2);
    }
  },
  mounted() {

  },
  methods: {
    // 登录注册tab切换
    handleTab(type) {
      this.typeView = type;
      this.clearInput();
    },
    // 是否勾选记住密码
    checkChange(status) {
      this.checked = status;
    },
    handleInput(e) {
      this.userName = e.target.value.replace(/[^\d]/g, '');
    },
    // 输入框焦点样式
    focusInput(index) {
      if (index === 1)
        this.$refs.loginVerifyCode.style.borderBottomColor = '#0f52e0';
      else this.$refs.resetVerifyCode.style.borderBottomColor = '#0f52e0';
    },
    blurInput(index) {
      if (index === 2)
        this.$refs.resetVerifyCode.style.borderBottomColor = '#e7e7e7';
      else this.$refs.loginVerifyCode.style.borderBottomColor = '#e7e7e7';
    },
    // 返回登录界面
    selectLogin() {
      this.typeView = 0;
      this.clearInput();
    },
    // 重置密码界面
    forgetPwd() {
      this.typeView = 2;
      this.clearInput();
    },
    //立即登录
    login() {
      if (this.isDisabled || this.isLoading) {
        return false;
      }

      if (!(this.$Valid.validUserName(this.userName))) {
        this.$Message.error('请输入正确的邮箱/手机号');
        return false;
      }

      if (!this.$Valid.validPass(this.userPwd)) {
        this.$Message.error('密码应为8到20位字母或数字！');
        return false;
      }

      this.isLoading = false;

      this.$router.push('/home');

      // let form = {
      //   user: this.userName,
      //   password: Md5(this.userPwd)
      // };

      // login(form)
      // .then(res => {
      //   // console.log('login=',res);
      //   this.isLoading = false;
      //   if (res.success) {
      //     this.$Message.success('登录成功');
      //     this.saveInfo(res.data);
      //     //this.saveAutoLogin(this.isLogin);
      //     this.$router.push('/home');
      //   }

      // })
      // .catch(() => {
      //   this.isLoading = false;
      // });
    },
    //重置密码
    reset() {
      if (this.isRegAble || this.isLoading) {
        return false;
      }

      if (!this.$Valid.validUserName(this.userName)) {
        this.errorTips("请输入正确的邮箱/手机号");
        return false;
      } else if (!this.$Valid.validPass(this.userPwd)) {
        this.errorTips("输入的密码格式不正确");
        return false;
      } else if (!this.$Valid.validPass(this.userPwd2)){
        this.errorTips("确认密码有误");
        return false;
      } else if (this.userPwd2 !== this.userPwd){
        this.errorTips("两次密码不一致");
        return false;
      }
      
      this.isLoading = true;

      // let data = {
      //   password: Md5(this.userPwd2),
      //   oncePassword: this.userCode,
      //   user: this.userName
      // }

      // resetPwd(data)
      // .then(res => {
      //   this.isLoading = false;
      //   if (res.success) {
      //     this.typeView = 0;
      //     this.$Message.success('密码修改成功');
      //     this.clearInput();
      //     this.selectLogin();
      //   } else {
      //     this.$Message.error('请求数据失败');
      //   }
      // })
      // .catch(() => {
      //   this.isLoading = false;
      // })
    },
    // 清空输入框
    clearInput() {
      this.userName = '';
      this.userPwd = '';
      this.userPwd2 = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url('../assets/bg.png');
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;

  .pageHeader {
    padding-top: 30px;
    padding-left: 40px;

    img {
      vertical-align: middle;
      display: inline-block;
      margin-right: 15px;
    }

    span {
      font-size: 18px;
      display: inline-block;
      vertical-align: -4px;
      color: rgba(255, 255, 255, 1);
    }
  }

  .login-box {
    position: absolute;
    left: 64vw;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    /*margin: 100px auto 0;*/
    width: 420px;
    background: #fff;
    padding: 45px 35px;
    .option {
      text-align: left;
      margin-top: 18px;
      .checked {
        padding-left: 5px;
      }
      .forget-pwd, .goback {
        float: right;
        font-size: 14px;
        font-weight: 400;
        color: #4981f2;
        line-height: 20px;
        cursor: pointer;
      }
      .protocol {
        color: #4981f2;
        cursor: pointer;
      }
    }

    .login-text {
      width: 100%;
      text-align: center;
      padding: 0 0 30px;
      font-size: 24px;
      letter-spacing: 1px;
      a {
        padding: 10px;
        color: #969696;
        &.active {
          font-weight: 600;
          color: rgba(73, 129, 242, 1);
          border-bottom: 2px solid rgba(73, 129, 242, 1);
        }
        &:hover {
          border-bottom: 2px solid rgba(73, 129, 242, 1);
        }
      }
      b {
        padding: 10px;
      }
    }
    .title {
      font-weight: 600;
      padding: 0 0 30px;
      font-size: 24px;
      letter-spacing: 1px;
      color: rgba(73, 129, 242, 1);
    }

    .input-box {
      .input {
        &:nth-child(1) {
          /*margin-top: 10px;*/
        }
        &:nth-child(2),
        &:nth-child(3) {
          margin-top: 20px;
        }
      }
    }

    .loginBtn {
      width: 100%;
      height: 45px;
      margin-top: 40px;
      font-size: 15px;
    }

    .input {
      padding: 10px 0px;
      font-size: 15px;
      width: 350px;
      color: #2c2e33;
      outline: none; // 去除选中状态边框
      border: 1px solid #fff;
      border-bottom-color: #e7e7e7;
      background-color: rgba(0, 0, 0, 0); // 透明背景
    }

    input:focus {
      border-bottom-color: #0f52e0;
      outline: none;
    }
    .button {
      line-height: 45px;
      cursor: pointer;
      margin-top: 50px;
      border: none;
      outline: none;
      height: 45px;
      width: 350px;
      background: rgba(216, 216, 216, 1);
      border-radius: 2px;
      color: white;
      font-size: 15px;
    }
  }

  // 滚动条样式
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.4);
  }

  //设置更改input 默认颜色
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #bebebe;
    font-size: 16px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #bebebe;
    font-size: 16px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #bebebe;
    font-size: 16px;
  }

  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 1) inset;
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 1) inset;
    -webkit-text-fill-color: #2c2e33;
  }

  .ivu-checkbox-wrapper {
    margin-right: 0;
  }

}
</style>
