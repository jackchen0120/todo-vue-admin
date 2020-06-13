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

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	  document.title = to.meta.title;
	}
	next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
