import { createRouter, createWebHistory } from 'vue-router';
import JSONValidator from './components/JSONValidator.vue';
import UUIDGenerator from './components/UUIDGenerator.vue';
import TokenGenerator from './components/TokenGenerator.vue';

// Определяем маршруты
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/json-validator',
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
  }
];

// Создаем маршрутизатор
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
