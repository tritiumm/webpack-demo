import './index.less'
import './assets/bg2.jpg'
import Vue from 'vue';
import App from './app.vue';
const b = new Set()
console.log('main')
new Vue({
  render: h=> h(App)
}).$mount('#app');
