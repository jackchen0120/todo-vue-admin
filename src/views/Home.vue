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

    <Footer />

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
import Header from "@/components/Header";  
import Footer from "@/components/Footer";  

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
  	return {
      loading: true,
      total: 2,
      pageNum: 1,
      pageSize: 10,
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
            // console.log(params);
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
