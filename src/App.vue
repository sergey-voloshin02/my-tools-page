<template>
  <div>
    <MainNavbar @open-search="openSearch" @toggle-menu="toggleMenu" />

    <SearchBar ref="searchBar" />

    <div class="main-container" :class="{ 'menu-hidden': !isMenuVisible }">
      <!-- Левое меню без логотипа -->
      <aside class="left-menu" v-if="isMenuVisible">
        <ul>
          <li><router-link to="/json-validator">JSON Validator</router-link></li>
          <li><router-link to="/uuid-generator">UUID Generator</router-link></li>
          <li><router-link to="/token-generator">Token Generator</router-link></li>
        </ul>
      </aside>

      <main class="content">
        <router-view></router-view>
      </main>
    </div>
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
      isMenuVisible: true,
    };
  },
  methods: {
    openSearch() {
      this.$refs.searchBar.openSearch();
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible; // Переключаем видимость меню
    },
    closeMenu() {
      this.isMenuVisible = false; // Закрываем меню на мобильных устройствах
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        this.isMenuVisible = false; // Автоматически закрываем меню на мобильных устройствах
      } else {
        this.isMenuVisible = true; // Отображаем меню на большом экране
      }
    });
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

.main-container {
  display: flex;
  height: calc(100vh - 50px);
  transition: margin-left 0.3s ease;
}

.left-menu {
  background-color: #f4f4f4;
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
  transition: transform 0.3s ease;
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
  /* font-weight: bold; */
  transition: color 0.3s;
}

.left-menu a:hover {
  color: #007bff;
}

.content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .left-menu {
    position: fixed;
    left: -200px;
    top: 0;
    height: 100%;
    z-index: 999;
    transition: transform 0.3s ease;
  }

  .main-container.menu-hidden .left-menu {
    transform: translateX(-100%);
  }

  .main-container.menu-hidden .content {
    margin-left: 0;
  }
}

.left-menu.collapsed {
  transform: translateX(-100%);
}

.menu-hidden .left-menu {
  transform: translateX(-100%);
}

.menu-hidden .content {
  margin-left: 0;
}
</style>
