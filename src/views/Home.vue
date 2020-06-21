<!--
 描述: 主页模板
 作者: Jack Chen
 日期: 2020-06-15
-->

<template>
  <div class="home-container">
  	<Header />

    <div class="content clearfix">
      <div class="list">
        <h2>任务列表</h2>
        <Button type="primary" icon="md-add" size="large" @click="addTask">添加任务</Button>
      </div>

      <Table :loading="loading" border :columns="columns" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <Button style="margin-right: 10px" @click="edit(row, index)"  v-if="row.status != 2">编辑</Button>
          <Button type="primary" ghost style="margin-right: 10px" @click="complete(row)" v-if="row.status != 2">{{ row.status == 0 ? '完成' : row.status == 1 ? '待办' : null}}</Button>
          <Button type="error" ghost @click="remove(row.id)" v-if="row.status != 2">删除</Button>
        </template>
      </Table>

      <Page
        class-name="pagination"
        show-total
        :total="total"
        @on-change="handleCurrentChange"
        :page-size="pageSize"
        :current="pageNo"
        v-if="!loading && total > 0"
      />
    </div>

    <Footer />

    <Drawer
      :title="title"
      v-model="isShow"
      width="600"
      :styles="styles"
      :mask-closable="false"
    >
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate">
          <Row :gutter="32">
              <Col span="24">
                  <FormItem label="任务名称" prop="title" label-position="top">
                    <Input v-model="formValidate.title" placeholder="请输入任务名称" />
                  </FormItem>
              </Col>
          </Row>
          <Row :gutter="32">
              <Col span="24">
                  <FormItem label="截止日期" prop="date" label-position="top">
                    <DatePicker :editable="false" v-model="formValidate.date" type="date" placeholder="请选择截止日期" style="display: block"></DatePicker>
                  </FormItem>
              </Col>
          </Row>
          <FormItem label="任务内容" prop="content" label-position="top">
            <Input type="textarea" v-model="formValidate.content" :rows="8" placeholder="请输入任务内容" />
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
import Header from '@/components/Header';  
import Footer from '@/components/Footer'; 
import { 
  queryTaskList,
  addTask,
  editTask,
  updateTaskStatus,
  updateMark,
  deleteTask
} from '@/utils/api';

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
  	return {
      loading: true,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      status: null,
      textBtn: '提交',
      type: 1, // 1:添加 2:编辑
      title: '添加任务',
      isShow: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formValidate: {
        title: '',
        date: '',
        content: ''
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        // {
        //   title: 'ID',
        //   key: 'id',
        //   width: 80,
        //   align: 'center'
        // },
        {
          title: '任务名称',
          key: 'title',
          render: (h, params) => {
            // console.log(params);
            const fav = this.tableData[params.index].is_major;
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
                    this.toggleFav(params.row, params.index);
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
          key: 'gmt_expire',
          render: (h, params) => {
            const row = params.row;
            const text = this.$Valid.formatDate(row.gmt_expire);
            return h('div', text);
          }
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
          filterRemote (value, row) {
            let _this = this;
            _this.status = value[0];
            _this.pageNo = 1;
            _this.getTaskList();
          }
        },
        {
          title: '操作',
          width: 300,
          slot: 'action',
          align: 'center'
        }
      ],
      tableData: [],
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
    this.getTaskList();
  },
  methods: {
    // 页码改变的回调，返回改变后的页码
    handleCurrentChange(val) {
      console.log(val)
      this.pageNo = val;
      this.getTaskList();
    },
    // 获取任务列表数据
    getTaskList() {
      this.loading = true;

      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: this.status
      }

      queryTaskList(params)
      .then(res => {
        console.log('任务列表===', res);
        this.loading = false;
        if (res.code == 0 && res.data) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch(() => {
        this.loading = false;
      })
    },
    // 添加任务
    addTask() {
      this.isShow = true;
      this.textBtn = '提交';
      this.title = '添加任务';
      this.type = 1;
      this.$refs['formValidate'].resetFields();
    },
    // 编辑任务
    edit(row, index) {
      this.isShow = true;
      this.textBtn = '保存';
      this.title = '编辑任务';
      this.type = 2;

      this.formValidate = {
        id: row.id,
        title: row.title,
        date: this.$Valid.formatDate(row.gmt_expire),
        content: row.content
      }

    },
    // 完成/待办任务
    complete(row) {
      let status = row.status == 0 ? 1 : row.status == 1 ? 0 : null;

      let data = {
        id: row.id,
        status: status
      }

      updateTaskStatus(data)
      .then(res => {
        console.log('操作状态===', res);
        if (res.code == 0) {
          this.pageNo = 1;
          this.getTaskList();
          this.$Message.success('更新任务状态成功');
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 删除任务
    remove(id) {
      let data = {
        id: id,
        status: 2
      }

      deleteTask(data)
      .then(res => {
        console.log('删除任务===', res);
        if (res.code == 0) {
          this.pageNo = 1;
          this.getTaskList();
          this.$Message.success('任务删除成功');
        } else {
          this.$Message.error(res.msg);
        }
      })
      // this.data.splice(index, 1);
    },
    // 提交添加或编辑
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {

          if (this.type == 1) {

            let data = {
              title: this.formValidate.title,
              gmt_expire: new Date(this.formValidate.date.toString()).getTime(),
              content: this.formValidate.content
            }

            addTask(data)
            .then(res => {
              console.log('添加任务===', res)
              this.isShow = false;
              if (res.code == 0) {
                this.pageNo = 1;
                this.getTaskList();
                this.$Message.success(`${this.title}成功`);
              } else {
                this.$Message.error(res.msg);
              }
            })
            .catch(() => {
              this.isShow = false;
            })
          } else if (this.type == 2) {
            let data = {
              id: this.formValidate.id,
              title: this.formValidate.title,
              gmt_expire: new Date(this.formValidate.date.toString()).getTime(),
              content: this.formValidate.content
            }

            editTask(data)
            .then(res => {
              console.log('编辑任务===', res)
              this.isShow = false;
              if (res.code == 0) {
                this.pageNo = 1;
                this.getTaskList();
                this.$Message.success(`${this.title}成功`);
              } else {
                this.$Message.error(res.msg);
              }
            })
            .catch(() => {
              this.isShow = false;
            })
          }

        } else {
          return false;
        }
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    // 重要或不重要
    toggleFav (row, index) {
      if (row.status == 2) {
        this.$Message.error('数据已删除');
      } else {
        // is_major: 0:不重要 1:重要
        this.tableData[index].is_major = this.tableData[index].is_major === 0 ? 1 : 0;

        let data = {
          id: row.id,
          is_major: this.tableData[index].is_major
        }

        updateMark(data)
        .then(res => {
          console.log('操作标记===', res);
          if (res.code == 0) {
            this.pageNo = 1;
            this.getTaskList();
            this.$Message.success('更新标记成功');
          } else {
            this.$Message.error(res.msg);
          }
        })
      }
    }
  }
  	
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
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

}	
</style>
<style lang="scss">
.ivu-table-tip table td {
  width: 100% !important;
}
/*.ivu-input-icon-validate {
  display: none !important;
}*/
.pagination {
  float: right;
  margin: 20px 0;
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
