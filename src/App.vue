<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">DevTools</div>
      <div class="search-hint">
        <!-- Строка поиска с иконкой лупы -->
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Press Alt+K or click here to search..." 
            @focus="openSearch" 
          />
        </div>
      </div>
    </nav>

    <SearchBar ref="searchBar" /> <!-- Добавляем ref на компонент поиска -->

    <div class="main-container">
      <aside class="left-menu">
        <ul>
          <li><router-link to="/json-validator">JSON Validator</router-link></li>
          <li><router-link to="/uuid-generator">UUID Generator</router-link></li>
          <li><router-link to="/token-generator">Token Generator</router-link></li>
        </ul>
      </aside>

      <main class="content">
        <router-view></router-view> <!-- Здесь будет отображаться контент -->
      </main>
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
  },
  methods: {
    openSearch() {
      // Открываем поиск при клике на инпут через ref компонента
      this.$refs.searchBar.openSearch();
    },
  },
};
</script>

<style scoped>
/* Навбар и элементы поиска */
.navbar {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 24px;
}

.search-hint {
  margin-left: auto;
}

.search-input {
  display: flex;
  align-items: center;
  width: 50%; /* Строка поиска занимает половину ширины */
  background-color: #444;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  color: white;
}

.search-input i {
  margin-right: 10px;
}

.search-input input {
  width: 100%;
  padding: 5px;
  border: none;
  background-color: transparent;
  color: white;
}

.search-input input::placeholder {
  color: #888;
}

/* Основные стили для макета страницы */
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
  padding: 20px;
}
</style>
