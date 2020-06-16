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

      <div class="content clearfix">
        <div class="list">
          <h2>任务列表</h2>
          <Button type="primary" icon="md-add" size="large" @click="addTask">添加任务</Button>
        </div>

        <Table :loading="loading" border :columns="columns" :data="tableData">
          <template slot-scope="{ row, index }" slot="action">
            <Button style="margin-right: 10px" @click="edit(index)">编辑</Button>
            <Button type="primary" ghost style="margin-right: 10px" @click="complete(index)">完成</Button>
            <Button type="error" ghost @click="remove(index)">删除</Button>
          </template>
        </Table>

        <Page
          class-name="pagination"
          show-total
          :total="total"
          :page-size="pageSize"
          :current="pageNum"
          v-if="!loading && total > 0"
        />
      </div>

      <div class="footer">
        <div class="copyright">
            Copyright@2020-2025 微信公众号<懒人码农> 湘ICP备19016532号-1
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


      <Drawer
        :title="title"
        v-model="isShow"
        width="600"
        :styles="styles"
      >
        <Form :model="formData" ref="formValidate" :rules="ruleValidate">
            <Row :gutter="32">
                <Col span="24">
                    <FormItem label="任务名称" prop="title" label-position="top">
                      <Input v-model="formData.title" placeholder="请输入任务名称" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="24">
                    <FormItem label="截止日期" prop="date" label-position="top">
                      <DatePicker :editable="false" v-model="formData.date" type="date" placeholder="请选择截止日期" style="display: block"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="任务内容" prop="content" label-position="top">
              <Input type="textarea" v-model="formData.content" :rows="8" placeholder="请输入任务内容" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button type="primary" style="margin-right: 15px" @click="handleSubmit('formValidate')">{{ textBtn }}</Button>
           <Button @click="handleReset('formValidate')" style="margin-right: 15px">重置</Button>
          <Button type="error" ghost @click="isShow = false">取消</Button>
        </div>
      </Drawer>    


  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
  	return {
      loading: true,
      total: 2,
      pageNum: 1,
      pageSize: 10,
  		modal: false,
      formItem: {
        userPwdOld: '',
        userPwd: '',
        userPwd2: ''
      },
      textBtn: '提交',
      title: '添加任务',
      isShow: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        title: '',
        date: '',
        content: ''
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: 80,
          align: 'center'
        },
        {
          title: '任务名称',
          key: 'title',
          render: (h, params) => {
            console.log(params);
            const fav = this.tableData[params.index].fav;
            const style = fav === 0 ? {
              cursor: 'pointer',
              fontSize: '18px'
            } : {
              cursor: 'pointer',
              fontSize: '18px',
              color: '#f50'
            };

            return h('div', [
              h('Icon', {
                style: style,
                props: {
                  type: fav === 0 ? 'ios-star-outline' : 'ios-star'
                },
                nativeOn: {
                  click: () => {
                    this.toggleFav(params.index);
                  }
                }
              }),
              h('span', ' ' + params.row.title)
            ])

          }
        },
        {
          title: '任务内容',
          key: 'content'
        },
        {
          title: '截止日期',
          key: 'date'
        },
        {
          title: '任务状态',
          key: 'status',
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const text = row.status == 0 ? '待办' : row.status == 1 ? '完成' : '删除';
            return h('div', text);
          },
          filters: [
            {
              label: '待办',
              value: 0
            },
            {
              label: '完成',
              value: 1
            },
            {
              label: '删除',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
              if (value === 0) {
                return row.status == value;
              } else if (value === 1) {
                return row.status == value;
              } else if (value === 2) {
                return row.status == value;
              }
          }
        },
        {
          title: '操作',
          width: 300,
          slot: 'action',
          align: 'center'
        }
      ],
      tableData: [
        {
          id: 1,
          title: 'John Brown',
          content: 'New York No. 1 Lake Park',
          status: 0,
          fav: 0,
          date: '2016-10-03'
        },
        {
          id: 2,
          title: 'Jim Green',
          content: 'London No. 1 Lake Park',
          status: 0,
          fav: 0,
          date: '2016-10-01'
        },
        {
          id: 3,
          title: 'Joe Black',
          content: 'Sydney No. 1 Lake Park',
          status: 1,
          fav: 0,
          date: '2016-10-02'
        },
        {
          id: 4,
          title: 'Jon Snow',
          content: 'Ottawa No. 2 Lake Park',
          status: 2,
          fav: 0,
          date: '2016-10-04'
        }
      ],

      ruleValidate: {
        title: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, type: 'date', message: '请选择截止日期', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入任务内容', trigger: 'blur' }
        ]
      }

  	}
  },
  computed: {
  	
  },
  created() {},
  mounted() {
    this.loading = false;
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
    },
    // 添加任务
    addTask() {
      this.isShow = true;
      this.textBtn = '提交';
      this.title = '添加任务';
      this.$refs['formValidate'].resetFields();
    },
    // 编辑任务
    edit(index) {
      this.isShow = true;
      this.textBtn = '保存';
      this.title = '编辑任务';
    },
    // 完成/待办任务
    complete(index) {
      this.$Message.success('设置任务已完成');
    },
    // 删除任务
    remove(index) {
      this.$Message.error('任务删除成功');
      // this.data.splice(index, 1);
    },
    // 提交或保存
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          this.isShow = false;
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    // 重要或不重要
    toggleFav (index) {
      this.tableData[index].fav = this.tableData[index].fav === 0 ? 1 : 0;
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
    .list {
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 20px 0 30px;
      h2 {
        line-height: 36px;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .copyright {
      color: #fff;
      font-size: 14px;
      background: #14143f;
      text-align: center;
      padding: 20px 40px;
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

.pagination {
  float: right;
  margin: 20px 0;

  .ivu-page-total {
    color: #fff;
  }
}

.demo-drawer-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 16px;
  background: #fff;
  display: flex;
  justify-content: space-around;
}
</style>
