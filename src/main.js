import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Импортируем маршрутизатор

Vue.config.productionTip = false;

new Vue({
  router, // Подключаем маршрутизатор
  render: h => h(App),
}).$mount('#app');
