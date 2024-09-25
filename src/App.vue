<template>

  <div class="app-layout">
    <!-- Левое меню с логотипом -->
    <aside class="left-menu" :class="{ 'collapsed': !isMenuVisible }">
      <div class="logo" :class="{ 'collapsed': !isMenuVisible }"><router-link to="/">DevTools</router-link></div>
      <!-- Логотип -->
      <ul class="list">
        <li class="list-element" :class="{ 'collapsed': !isMenuVisible }"><router-link to="/json-validator">JSON
            Validator</router-link></li>
        <li class="list-element" :class="{ 'collapsed': !isMenuVisible }"><router-link to="/uuid-generator">UUID
            Generator</router-link></li>
        <li class="list-element" :class="{ 'collapsed': !isMenuVisible }"><router-link to="/token-generator">Token
            Generator</router-link></li>
      </ul>
    </aside>

    <!-- Основной контент -->
    <main class="content">
      <header class="content-header">
        <!-- Кнопка закрытия левого меню и кнопка Home -->
        <button @click="toggleMenu" class="menu-toggle">
          <i class="fas fa-bars"></i> <!-- Иконка открытия/закрытия меню -->
        </button>
        <router-link to="/" class="home-btn">
          <i class="fas fa-home"></i>
        </router-link>
        <MainNavbar @open-search="openSearch" />
      </header>

      <!-- Компонент поиска -->
      <SearchBar ref="searchBar" />

      <!-- Основное содержимое -->
      <div class="content-body">
        <n-notification-provider :max="4" placement="bottom-right">
          <router-view />
        </n-notification-provider>
      </div>
    </main>
  </div>
</template>

<script>
import MainNavbar from './components/Navbar.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    MainNavbar,
    SearchBar,
  },
  data() {
    return {
      isMenuVisible: true, // Управляем видимостью меню
    };
  },
  methods: {
    openSearch() {
      this.$refs.searchBar.openSearch();
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible; // Переключение видимости меню
    },
  },
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
}

main {
  background-color: #222;
}

/* Основная структура */
.app-layout {
  display: flex;
  height: 100vh;
}

/* Левое меню */
.left-menu {
  background-color: #222;
  color: white;
  width: 190px;
  padding: 20px;
  transition: width 0.3s ease;
  overflow: hidden;
}

.left-menu.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

.list-element {
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  border-radius: 5px;
}

.list-element.collapsed,
.logo.collapsed {
  display: none;
}

.left-menu ul {
  list-style: none;
  padding: 0;

}

.left-menu ul li {
  margin-bottom: 15px;

}

.left-menu ul li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* .left-menu ul li a:hover {
  color: #007bff;
} */

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-decoration: none;
}

.logo>a {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-decoration: none;
  color: #ccc;
}


/* Основной контент */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Шапка контента */
.content-header {
  display: flex;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
}

.menu-toggle:hover {
  color: #007bff;
}

.home-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 5px;
}

.home-btn:hover {
  background-color: #333;
}

.list-element:hover {
  background-color: #333;
}

/* Основная часть контента */
.content-body {
  padding: 20px;
  background-color: #1e1e1e;
  color: white;
  flex: 1;
  overflow-y: auto;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .left-menu {
    position: fixed;
    left: -250px;
    top: 0;
    height: 100%;
    z-index: 999;
  }

  .left-menu.collapsed {
    left: 0;
  }

  .content {
    margin-left: 0;
  }
}
</style>
