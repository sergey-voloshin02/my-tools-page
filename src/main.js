import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { create, NNotificationProvider } from 'naive-ui';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Импортируем все иконки из Solid Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas); // добавляешь иконки в библиотеку

const naive = create({
    components: [NNotificationProvider]
  });
  

const app = createApp(App);

app.use(naive); 
app.use(router); // Подключаем маршрутизатор
app.mount('#app'); // Монтируем приложение
app.component('font-awesome-icon', FontAwesomeIcon);
