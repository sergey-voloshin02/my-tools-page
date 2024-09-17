<template>
    <div v-if="isRendered" class="search-overlay" @click.self="closeSearch" :class="{'fade-in': isActive, 'fade-out': !isActive}">
      <div class="search-container" :class="{'animated-search-bar': isActive, 'animated-search-bar-leave': !isActive}">
        <div class="search-bar">
          <input
            ref="searchInput"
            type="text"
            v-model="query"
            @input="performSearch"
            placeholder="Type to search a tool or a command..."
            @keydown.esc="closeSearch"
            @keydown.down="moveDown"
            @keydown.up="moveUp"
            @keydown.enter="selectActiveResult"
          />
          <button @click="closeSearch" class="close-btn">X</button>
        </div>
        <div class="search-results" v-if="results.length">
          <ul>
            <li
              v-for="(result, index) in results"
              :key="result.name"
              :class="{ 'search-result': true, active: index === activeIndex }"
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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isActive: false,
        isRendered: false,
        query: '',
        results: [],
        activeIndex: 0,
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
            keywords: ['uuid', 'generator', 'идентификатор', 'генератор'],
          },
          {
            name: 'Token Generator',
            path: '/token-generator',
            description: 'Generate random tokens for your applications.',
            keywords: ['token', 'generator', 'токен', 'генератор', 'строка'],
          },
        ],
      };
    },
    methods: {
      openSearch() {
        this.isRendered = true;
        this.isActive = true;
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      },
      closeSearch() {
        this.isActive = false;
        setTimeout(() => {
          this.isRendered = false;
          this.query = '';
          this.results = [];
          this.activeIndex = 0;
        }, 200); // Задержка перед удалением из DOM
      },
      performSearch() {
        const queryLower = this.query.toLowerCase();
        this.results = this.tools.filter((tool) =>
          tool.keywords.some((keyword) => keyword.toLowerCase().includes(queryLower))
        );
        this.activeIndex = 0;
      },
      navigateTo(path) {
        this.$router.push(path);
        this.closeSearch();
      },
      moveDown() {
        if (this.activeIndex < this.results.length - 1) {
          this.activeIndex++;
        }
      },
      moveUp() {
        if (this.activeIndex > 0) {
          this.activeIndex--;
        }
      },
      selectActiveResult() {
        if (this.results[this.activeIndex]) {
          this.navigateTo(this.results[this.activeIndex].path);
        }
      },
      handleKeydown(event) {
        if ((event.altKey && event.code === 'KeyK') || (event.metaKey && event.code === 'KeyK')) {
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
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  
  @keyframes fadeIn {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  
  @keyframes fadeOut {
    from {
      background-color: rgba(0, 0, 0, 0.5);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }
  
  .animated-search-bar {
    animation: slideDown 0.4s ease forwards;
  }
  
  .animated-search-bar-leave {
    animation: slideUp 0.4s ease forwards;
  }
  
  .fade-in {
    animation: fadeIn 0.4s ease forwards;
  }
  
  .fade-out {
    animation: fadeOut 0.4s ease forwards;
  }
  
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  
  .search-container {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }
  
  .search-bar {
    background: #2b2b2b;
    padding: 10px 10px;
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
    background-color: #333;
    color: white;
    border-radius: 5px;
    font-size: 18px;
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
    border-bottom: 1px solid #1e1e1e;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
    border-radius: 5px;
  }
  
  .search-result:hover, .search-result.active {
    background-color: #1fa54c;
    transform: scale(1.01);
  }
  
  .result-icon {
    margin-right: 10px;
    font-size: 20px;
    color: #ccc;
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
    color: #ccc;
  }
  </style>
  