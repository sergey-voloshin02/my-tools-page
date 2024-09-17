<template>
  <div>
    <MainNavbar @open-search="openSearch" @toggle-menu="toggleMenu" />

    <SearchBar ref="searchBar" />

    <div class="main-container">
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
      const leftMenu = document.querySelector('.left-menu');
      leftMenu.classList.toggle('collapsed');
    },
  },
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}

button {
  font-family: 'Poppins', sans-serif;
}

input,
select,
textarea {
  font-family: 'Poppins', sans-serif;
}

.main-container {
  display: flex;
  height: calc(100vh - 50px);
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
}

.left-menu {
  background-color: #f4f4f4;
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
  transition: width 0.3s ease;
}

.left-menu.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
}

</style>
