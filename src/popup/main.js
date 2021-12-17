import Vue from 'vue'
import App from './App.vue'

console.log('Initializing popup window', window);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});