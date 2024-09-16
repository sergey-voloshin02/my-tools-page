<template>
  <div>
    <!-- Навбар вынесен в отдельный компонент -->
    <MainNavbar @open-search="openSearch" @toggle-menu="toggleMenu" />

    <!-- Компонент поиска -->
    <SearchBar ref="searchBar" />

    <!-- Основной контейнер -->
    <div class="main-container">
      <!-- Левое меню -->
      <aside class="left-menu" v-if="isMenuVisible">
        <ul>
          <li><router-link to="/json-validator">JSON Validator</router-link></li>
          <li><router-link to="/uuid-generator">UUID Generator</router-link></li>
          <li><router-link to="/token-generator">Token Generator</router-link></li>
        </ul>
      </aside>

      <!-- Контент -->
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
// Импортируем компоненты
import MainNavbar from './components/Navbar.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    MainNavbar, // Регистрируем MainNavbar
    SearchBar,
  },
  data() {
    return {
      isMenuVisible: true, // Управляем видимостью левого меню
    };
  },
  methods: {
    openSearch() {
      // Открываем компонент поиска через его ref
      this.$refs.searchBar.openSearch();
    },
    toggleMenu() {
      // Скрываем или показываем левое меню
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style scoped>
/* Стили для навбара и страницы */
.navbar {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .navbar-left,
.navbar .navbar-right {
  display: flex;
  align-items: center;
}

.navbar .home-btn,
.navbar .menu-btn,
.navbar .theme-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-right: 20px;
}

.navbar .home-btn i,
.navbar .menu-btn i,
.navbar .theme-btn i {
  font-size: 20px;
}

.navbar .search-container {
  display: flex;
  flex-grow: 1;
  max-width: 500px;
  position: relative;
}

.navbar .search-container input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: white;
  outline: none;
}

.navbar .search-container .search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.navbar-right select {
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px;
  margin-right: 10px;
}

/* Основные стили для макета страницы */
.main-container {
  display: flex;
  height: calc(100vh - 50px); /* Высота экрана минус высота навбара */
}

.left-menu {
  background-color: #f4f4f4;
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.left-menu ul {
  list-style: none;
  padding: 0;
}

.left-menu li {
  margin-bottom: 10px;
}

.left-menu a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

.left-menu a:hover {
  color: #007bff;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
}

/* Темный режим */
.dark-mode {
  background-color: #1e1e1e;
  color: white;
}

.dark-mode .left-menu {
  background-color: #333;
  border-right-color: #444;
}

.dark-mode .left-menu a {
  color: #ddd;
}

.dark-mode .left-menu a:hover {
  color: #fff;
}

.dark-mode .content {
  background-color: #2c2c2c;
}
</style>
