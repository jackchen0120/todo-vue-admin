<!--
 描述: 主页模板
 作者: Jack Chen
 日期: 2020-06-15
-->

<template>
  <div class="home-container">
    	<div class="header">
          <div class="section">
            <img src="../assets/logo.png" alt="logo">
            <ul>
              <li>
                <router-link to='/home' class="active">首页</router-link>
              </li>
              <li>
                <a href="https://github.com/jackchen0120" target="_blank">github</a>
              </li>
              <li>
                <a href="https://blog.csdn.net/qq_15041931" target="_blank">技术博客</a>
              </li>
            </ul>
          </div>

          <Dropdown trigger="hover" @on-click="changeMenu">
              <a class="dropdown-link" href="javascript:void(0)">
                <img class="avatar" src="../assets/avatar.jpg" alt="">
                <Icon type="ios-arrow-down" size="14"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem name="a">修改密码</DropdownItem>
                  <DropdownItem name="b">登出</DropdownItem>
              </DropdownMenu>
          </Dropdown>
      </div>

      <div class="content">
        内容区域
      </div>

      <div class="footer">
        <div class="copyright">
            Copyright@2020-2025 微信公众号懒人码农 湘ICP备19016532号-1
        </div>
      </div>

      <Modal
        title="修改密码"
        v-model="modal"
        @on-ok="ok"
        @on-cancel="cancel"
        class-name="vertical-center-modal">
        <Form :model="formItem" :label-width="90">
          <FormItem label="旧密码">
              <Input v-model="formItem.userPwdOld" placeholder="请输入旧密码"></Input>
          </FormItem>
          <FormItem label="新密码">
              <Input v-model="formItem.userPwd" placeholder="请输入新密码"></Input>
          </FormItem>
          <FormItem label="确认新密码">
              <Input v-model="formItem.userPwd2" placeholder="请再次确认新密码"></Input>
          </FormItem>
          <!-- <FormItem>
            <Button type="primary">Submit</Button>
            <Button style="margin-left: 8px">Cancel</Button>
          </FormItem> -->
        </Form>
      </Modal>

  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
  	return {
  		modal: false,
      formItem: {
        userPwdOld: '',
        userPwd: '',
        userPwd2: ''
      }
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
      } else {
        this.$Message.info('真的要退出登录');
      }
    },
    // 提交修改密码
    ok() {
      this.$Message.info('Clicked ok');
    },
    // 取消修改密码
    cancel() {
      this.$Message.info('Clicked cancel');
    }
  }
  	
}
</script>

<style lang="scss" scoped>
.home-container {
  .header {
    width: 100%;
    background: #17174c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
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
      .ivu-icon {
        margin-left: 5px;
      }
    }
    img {
      outline: none;
      &.avatar {
        border-radius: 50%;
        width: 42px;
        height: 42px;
        vertical-align: middle;
        background: #eee;
      }
    }

  }

  .content {
    padding: 30px 40px;
  }

  .footer {
    .copyright {
      color: #fff;
      font-size: 16px;
      background: #14143f;
      text-align: center;
      padding: 30px 40px;
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
