<template>
    <div v-if="isActive" class="search-overlay" @click.self="closeSearch">
      <div class="search-container">
        <transition name="slide-fade">
          <div class="search-bar">
            <input
              ref="searchInput"
              type="text"
              v-model="query"
              @input="performSearch"
              placeholder="Type to search a tool or a command..."
              @keydown.esc="closeSearch"
            />
            <button @click="closeSearch" class="close-btn">X</button>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="search-results" v-if="results.length">
            <ul>
              <li
                v-for="result in results"
                :key="result.name"
                class="search-result"
                @click="navigateTo(result.path)"
              >
                <div class="result-icon">
                  <i class="fas fa-cog"></i>
                </div>
                <div class="result-info">
                  <div class="result-name">{{ result.name }}</div>
                  <div class="result-description">{{ result.description }}</div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isActive: false,
        query: '',
        results: [],
        tools: [
          {
            name: 'JSON Validator',
            path: '/json-validator',
            description: 'Validate and format JSON data.',
            keywords: ['json', 'validator', 'валидация', 'проверка'],
          },
          {
            name: 'UUID Generator',
            path: '/uuid-generator',
            description: 'Generate universally unique identifiers (UUIDs).',
            keywords: ['uuid', 'идентификатор', 'генератор'],
          },
          {
            name: 'Token Generator',
            path: '/token-generator',
            description: 'Generate random tokens for your applications.',
            keywords: ['token', 'токен', 'генератор', 'строка'],
          },
        ],
      };
    },
    methods: {
      openSearch() {
        this.isActive = true;
        this.$nextTick(() => {
          // Устанавливаем фокус на поле ввода
          this.$refs.searchInput.focus();
        });
        document.addEventListener('click', this.closeSearchOnClickOutside);
      },
      closeSearch() {
        this.isActive = false;
        this.query = '';
        this.results = [];
        document.removeEventListener('click', this.closeSearchOnClickOutside);
      },
      closeSearchOnClickOutside(event) {
        const searchContainer = this.$refs.searchContainer;
        if (searchContainer && !searchContainer.contains(event.target)) {
          this.closeSearch();
        }
      },
      navigateTo(path) {
        this.$router.push(path);
        this.closeSearch();
      },
      performSearch() {
        const queryLower = this.query.toLowerCase();
        this.results = this.tools.filter((tool) =>
          tool.keywords.some((keyword) => keyword.toLowerCase().includes(queryLower))
        );
      },
      handleKeydown(event) {
        if (event.altKey && event.code === 'KeyK') {
          event.preventDefault();
          this.openSearch();
        }
      },
    },
    mounted() {
      document.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.handleKeydown);
    },
  };
  </script>
  
  <style scoped>
  /* Анимация появления и исчезновения */
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.4s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }
  
  .search-container {
    margin-top: 100px; /* Опустили поиск чуть ниже */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }
  
  .search-bar {
    background: #2b2b2b;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    width: 600px;
    max-width: 90%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  }
  
  .search-bar input {
    flex: 1;
    padding: 10px;
    border: none;
    background-color: #444;
    color: white;
    border-radius: 5px;
  }
  
  .search-bar input::placeholder {
    color: #888;
  }
  
  .close-btn {
    margin-left: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .search-results {
    margin-top: 10px;
    background: #333;
    padding: 10px;
    border-radius: 8px;
    max-height: 400px;
    overflow-y: auto;
    width: 600px;
    max-width: 90%;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  }
  
  .search-results ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .search-result {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #444;
    cursor: pointer;
  }
  
  .search-result:hover {
    background-color: #444;
  }
  
  .result-icon {
    margin-right: 10px;
    font-size: 20px;
    color: #0fbf3a; /* Иконки могут быть разного цвета */
  }
  
  .result-info {
    flex: 1;
  }
  
  .result-name {
    font-size: 16px;
    color: #fff;
  }
  
  .result-description {
    font-size: 12px;
    color: #aaa;
  }
  </style>
  