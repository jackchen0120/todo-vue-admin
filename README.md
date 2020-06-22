# 前言
NodeJS全栈开发之前端技术栈基于Vue+iViewUI构建的用户后台管理系统，功能包括：登录，注册，记住密码，忘记密码，修改密码，退出登录，todoList增删改查CRUD，查询条件筛选，点亮红星标记等。本项目场景虽然简单，但涵盖功能比较齐全，适合初学前端开发的小伙伴。如果觉得不错的话，请大大们给个:heart:star，也欢迎大家一起交流学习。

[在线DEMO演示](http://106.55.168.13:8082/)


# 部分截图

## 登录/注册

<img src="https://raw.githubusercontent.com/jackchen0120/todo-vue-admin/master/public/frontend_1.png" width="900" alt="登录/注册" />

## 首页

<img src="https://raw.githubusercontent.com/jackchen0120/todo-vue-admin/master/public/frontend_2.png" width="900" alt="首页" />

## 新增任务

<img src="https://raw.githubusercontent.com/jackchen0120/todo-vue-admin/master/public/frontend_3.png" width="900" alt="新增任务" />

## 修改密码

<img src="https://raw.githubusercontent.com/jackchen0120/todo-vue-admin/master/public/frontend_4.png" width="900" alt="修改密码" />


# 目录结构
```
│  package.json                      // npm包管理所需模块及配置信息
│  vue.config.js                     // webpack配置
├─public
│      favicon.ico                   // 图标
│      index.html                    // 入口html文件
└─src
    │  App.vue                       // 根组件
    │  main.js                       // 程序入口文件
    ├─assets                         // 存放公共图片文件夹
    ├─components
    │      Footer.vue                // 页面底部公用组件
    │      Header.vue                // 页面头部公用组件
    ├─router
    │      index.js                  // 单页面路由注册组件 
    ├─store
    │  │  index.js                   // 状态管理仓库入口文件
    │  └─modules
    │          userInfo.js           // 用户模块状态管理文件
    ├─styles
    │      base.scss                 // 基础样式文件 
    ├─utils
    │      api.js                    // 统一封装API接口调用方法
    │      network.js                // axios封装与拦截器配置
    │      url.js                    // 自动部署服务器环境
    │      valid.js                  // 统一封装公用模块方法
    └─views
            Home.vue                 // 首页界面
            Login.vue                // 登录界面
```


# 技术栈
 * vue2.6
 * axios
 * webpack
 * ES6/7
 * flex
 * iViewUI
 
# 功能模块
* 登录（登出）
* 注册
* 记住密码
* 忘记密码（修改密码）
* todo增删改查
* 点亮红星标记
* 查询条件筛选

# 下载安装依赖
```
git clone https://github.com/jackchen0120/todo-vue-admin.git
cd todo-vue-admin
npm install 或 yarn
```

## 开发模式
```
npm run serve
```
运行之后，访问地址：http://localhost:8082

## 生产环境打包
```
npm run build
```

## 获取更多实操经验及项目源码

欢迎关注个人公众号：**懒人码农**

<img src="https://img-blog.csdnimg.cn/20200531011333650.png#pic_center?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE1MDQxOTMx,size_16,color_FFFFFF,t_70" width="200" alt="公众号二维码" />