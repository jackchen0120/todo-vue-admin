import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import Valid from './utils/valid'

import '@/styles/base.scss'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI);

Vue.prototype.$Valid = Valid;

Vue.config.productionTip = false

// 实现全局路由守卫
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	  document.title = to.meta.title;
	}

	if (to.meta.requireAuth) {
		if (store.state.userInfo.data.token) {
			if (to.path == '/login') {
        next('/');
      } else {
        next();
      }
		} else {
			next('/login');
		}
	} else {
		if (store.state.userInfo.data.token) {
			next('/');
		} else {
			next();
		}
	}

})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
