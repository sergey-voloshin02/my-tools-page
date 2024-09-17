<template>
    <nav class="navbar">
      <!-- Строка поиска -->
      <div class="center-section">
        <div class="search-input" @click="openSearch">
          <i style="padding-left: 6px;" class="fas fa-search"></i>
          <input type="text" placeholder="Search" readonly />
          <div class="shortcut">
            <span class="key">⌘</span>
            <span class="plus-sign">+</span>
            <span class="key">K</span>
          </div>
        </div>
      </div>
  
      <!-- Настройки: язык, тема и соцсети -->
      <div class="right-section">
        <select v-model="selectedLanguage" @change="changeLanguage">
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="uk">Українська</option>
        </select>
        <button @click="toggleTheme" class="theme-btn">
          <i class="fas" :class="isDarkMode ? 'fa-moon' : 'fa-sun'"></i>
        </button>
        <a href="https://github.com/" class="icon-btn" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://twitter.com/" class="icon-btn" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "MainNavbar",
    data() {
      return {
        selectedLanguage: "en",
        isDarkMode: false,
      };
    },
    methods: {
      openSearch() {
        this.$emit("open-search");
      },
      changeLanguage() {
        console.log(`Language changed to ${this.selectedLanguage}`);
      },
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle("dark-mode", this.isDarkMode);
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    padding: 15px 20px 10px 20px;
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  
  .left-section {
    display: flex;
    align-items: center;
  }
  
  .right-section {
    display: flex;
    align-items: center;
    gap: 15px; /* Отступы между элементами справа */
  }
  
  .center-section {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .menu-btn,
  .home-btn,
  .theme-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 20px;
  }
  
  .search-input {
    display: flex;
    align-items: center;
    background-color: #333;
    border-radius: 5px;
    padding: 5px 10px;
    width: 60%; /* Увеличено для более широкого поиска */
  }
  
  .search-input i {
    margin-right: 10px;
    color: #ccc;
  }
  
  .search-input input {
    background: none;
    border: none;
    color: white;
    flex: 1;
    cursor: pointer;
  }
  
  .search-input input::placeholder {
    color: #888;
  }
  
  .shortcut {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  
  .key {
    background-color: #3333336e;
    color: #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    margin-left: 5px;
    font-size: 11px;
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .plus-sign {
    margin-left: 5px;
    font-size: 14px;
    color: #ccc;
  }
  
  .right-section select {
    background-color: #333;
    color: white;
    border: none;
    padding: 7px;
    border-radius: 5px;
    font-size: 13px;
  }
  
  .icon-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
  }
  
  .theme-btn {
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
    }
  
    .center-section {
      width: 100%;
      order: 2;
      margin-top: 10px;
    }
  
    .search-input {
      width: 100%;
    }
  
    .right-section {
      width: 100%;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  </style>
  