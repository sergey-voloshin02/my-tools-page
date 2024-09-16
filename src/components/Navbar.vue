<template>
    <nav class="navbar">
      <!-- Левая часть навбара -->
      <div class="navbar-left">
        <!-- Кнопка "Home" -->
        <router-link to="/" class="home-btn">
          <i class="fas fa-home"></i>
        </router-link>
  
        <!-- Кнопка для скрытия/показа левого меню -->
        <button @click="toggleMenu" class="menu-btn">
          <i class="fas fa-bars"></i>
        </button>
      </div>
  
      <!-- Строка поиска -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          @click="openSearch"
        />
        <i class="fas fa-search search-icon"></i>
      </div>
  
      <!-- Правая часть навбара -->
      <div class="navbar-right">
        <!-- Выбор языка -->
        <select v-model="selectedLanguage" @change="changeLanguage">
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
  
        <!-- Переключение темы (темная/светлая) -->
        <button @click="toggleTheme" class="theme-btn">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MainNavbar',
    data() {
      return {
        searchQuery: '',
        selectedLanguage: 'en',
        isDarkMode: false,
      };
    },
    methods: {
      openSearch() {
        this.$emit('open-search');
      },
      toggleMenu() {
        this.$emit('toggle-menu');
      },
      changeLanguage() {
        console.log(`Language changed to ${this.selectedLanguage}`);
      },
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .home-btn {
    color: white;
    text-decoration: none;
    margin-right: 20px;
  }
  
  .menu-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 20px;
    position: relative;
  }
  
  .search-container input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #444;
    color: white;
    outline: none;
  }
  
  .search-container .search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .navbar-right select {
    margin-right: 20px;
    padding: 5px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  .theme-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  </style>
  