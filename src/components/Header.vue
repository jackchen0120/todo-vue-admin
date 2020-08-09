<!--
 描述: 头部header模板
 作者: Jack Chen
 日期: 2020-06-20
-->

<template>
  <div class="header-container">
  	<div class="header">
      <div class="section">
        <img src="../assets/logo.png" alt="logo" class="logo">
        <ul>
          <li>
            <router-link to='/home' class="active">首页</router-link>
          </li>
          <li>
            <a href="https://jackchen0120.github.io/vueDataV/" target="_blank">大数据可视化平台</a>
          </li>
          <li>
            <a href="https://juejin.im/user/5eafd5fff265da7be959f56a" target="_blank">掘金·博文</a>
          </li>
          <li>
            <a href="https://blog.csdn.net/qq_15041931" target="_blank">CSDN·博文</a>
          </li>
        </ul>
      </div>

      <Dropdown trigger="hover" @on-click="changeMenu">
        <a class="dropdown-link" href="javascript:void(0)">
          <span class="username">{{ username }}</span>
          <img class="avatar" src="../assets/avatar.jpg" alt="">
          <Icon type="ios-arrow-down" size="14"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem name="a">修改密码</DropdownItem>
            <DropdownItem name="b">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <a href="https://github.com/jackchen0120" target="_blank" class="github-corner">
      <svg width="82" height="82" viewBox="0 0 250 250">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path> 
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" class="octo-arm"></path> 
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>

    <Modal
      title="修改密码"
      v-model="modal"
      @on-ok="ok"
      :loading="modalLoading"
      class-name="vertical-center-modal">
      <Form :model="formItem" :label-width="90" ref="formItem">
        <FormItem label="旧密码" prop="oldPassword">
            <Input v-model="formItem.oldPassword" type="password" maxlength="20" placeholder="请输入旧密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
            <Input v-model="formItem.newPassword" type="password" maxlength="20" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="confirmPassword">
            <Input v-model="formItem.confirmPassword" type="password" maxlength="20" placeholder="请再次确认新密码"></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
import { resetPwd } from '@/utils/api';

export default {
  name: 'Header',
  components: {},
  data() {
  	return {
  		modal: false,
      modalLoading: true,
      username: this.$store.state.userInfo.data.userData.username,
      formItem: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
  	}
  },
  computed: {
  	
  },
  created() {},
  mounted() {
    
  },
  methods: {
    // 点击头像下拉菜单选择
    changeMenu(name) {
      if (name == 'a') {
        this.modal = true;
        this.$refs['formItem'].resetFields();
      } else if (name == 'b') {
        this.$store.dispatch('userInfo/logout')
      }
    },
    // 提交修改密码
    ok() {
      setTimeout(() => {
        this.modalLoading = false;
        this.$nextTick(() => {
          this.modalLoading = true;
        });
      }, 100);

      if (!this.$Valid.validPass(this.formItem.oldPassword)) {
        this.$Message.error("旧密码应为8到20位字母或数字！");
        return false;
      } else if (!this.$Valid.validPass(this.formItem.newPassword)) {
        this.$Message.error("新密码应为8到20位字母或数字！");
        return false;
      } else if (!this.$Valid.validPass(this.formItem.confirmPassword)){
        this.$Message.error("确认密码有误");
        return false;
      } else if (this.formItem.confirmPassword !== this.formItem.newPassword){
        this.$Message.error("两次密码不一致");
        return false;
      }

      let data = {
        username: this.$store.state.userInfo.data.userData.username,
        oldPassword: this.formItem.oldPassword,
        newPassword: this.formItem.confirmPassword
      }

      resetPwd(data)
      .then(res => {
        if (res.code == 0) {
          this.modal = false;
          this.$Message.success('修改密码成功');
        } else {
          this.$Message.error(res.msg);
        }
      })
    }

  }
  	
}
</script>

<style lang="scss" scoped>
.header-container {
  .header {
    width: 100%;
    background: #17174c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 70px 20px 40px;
    box-sizing: border-box;
    .section {
      display: flex;
      ul {
        display: flex;
        align-items: center;
        margin-left: 60px;
        li {
          margin-right: 40px;
          a {
            color: #fff;
            opacity: .5;
            &:hover, &.active {
              opacity: 1;
            };
          }
        }
      }
    }
    .dropdown-link {
      color: #fff; 
      .username {
        padding-right: 10px;
      }
      .ivu-icon {
        margin-left: 5px;
      }
    }
    img {
      outline: none;
      &.logo {
        height: 40px;
      }
      &.avatar {
        border-radius: 50%;
        width: 42px;
        height: 42px;
        vertical-align: middle;
        background: #eee;
      }
    }

  }

  .github-corner {
    svg {
      fill: #42b983; 
      color: #fff; 
      position: absolute; 
      top: 0; 
      border: 0; 
      right: 0;
    }
    .octo-arm {
      transform-origin: 130px 106px;
    }
    &:hover {
      .octo-arm {
        -webkit-animation: octocat-wave .56s ease-in-out;
        animation: octocat-wave .56s ease-in-out;
      }
    }

  }

  @-webkit-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }

}	
</style>
<style lang="scss">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
      top: 0;
  }
}

</style>
