import Vue from 'vue';
import Router from 'vue-router';
import JSONValidator from './components/JSONValidator.vue';
import UUIDGenerator from './components/UUIDGenerator.vue';
import TokenGenerator from './components/TokenGenerator.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // это позволит убрать хэш (#) из URL
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/json-validator', // Перенаправляем на JSON Validator по умолчанию
    },
    {
      path: '/json-validator',
      name: 'JSONValidator',
      component: JSONValidator,
    },
    {
      path: '/uuid-generator',
      name: 'UUIDGenerator',
      component: UUIDGenerator,
    },
    {
      path: '/token-generator',
      name: 'TokenGenerator',
      component: TokenGenerator,
    },
  ],
});
