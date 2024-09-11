<template>
    <div class="json-validator">
      <h2>JSON Validator</h2>
      <div class="textarea-wrapper">
        <div class="line-numbers" ref="lineNumbers"></div>
        <textarea 
          v-model="jsonInput"
          @input="updateLineNumbers"
          ref="textarea"
          placeholder="Paste your JSON here..."
          rows="10"
          cols="50"
        ></textarea>
      </div>
      <div class="actions">
        <button @click="formatJSON" :disabled="!isValid" class="action-button">Format</button>
        <button @click="minifyJSON" :disabled="!isValid" class="action-button">Minify</button>
        <button @click="copyToClipboard" :disabled="!isValid" class="action-button">Copy</button>
        <button @click="clearInput" class="action-button">Clear</button>
      </div>
      <p v-if="isValid === false" class="error">Invalid JSON: {{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jsonInput: '',
        isValid: null,
        errorMessage: ''
      };
    },
    watch: {
      jsonInput() {
        this.validateJSON();
        this.updateLineNumbers();
      }
    },
    methods: {
      validateJSON() {
        if (this.jsonInput.trim() === '') {
          this.isValid = null;
          this.errorMessage = '';
          return;
        }
  
        try {
          JSON.parse(this.jsonInput);
          this.isValid = true;
          this.errorMessage = '';
        } catch (error) {
          this.isValid = false;
          this.errorMessage = error.message;
        }
      },
      formatJSON() {
        if (this.isValid) {
          try {
            const jsonObject = JSON.parse(this.jsonInput);
            this.jsonInput = JSON.stringify(jsonObject, null, 2);
          } catch (error) {
            this.errorMessage = error.message;
          }
        }
      },
      minifyJSON() {
        if (this.isValid) {
          try {
            const jsonObject = JSON.parse(this.jsonInput);
            this.jsonInput = JSON.stringify(jsonObject);
          } catch (error) {
            this.errorMessage = error.message;
          }
        }
      },
      copyToClipboard() {
        navigator.clipboard.writeText(this.jsonInput)
          .then(() => alert("JSON copied to clipboard!"))
          .catch(() => alert("Failed to copy JSON"));
      },
      clearInput() {
        this.jsonInput = '';
        this.isValid = null;
        this.errorMessage = '';
        this.updateLineNumbers();
      },
      updateLineNumbers() {
        const textarea = this.$refs.textarea;
        const lineNumbers = this.$refs.lineNumbers;
        const lines = this.jsonInput.split('\n').length;
  
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
        
        // Match scroll of line numbers with textarea
        lineNumbers.scrollTop = textarea.scrollTop;
      },
      handleKeydown(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { // Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
          event.preventDefault();
          this.formatJSON();
        }
      }
    },
    mounted() {
      this.updateLineNumbers();
      window.addEventListener('keydown', this.handleKeydown);
      
      // Synchronize scrolling
      const textarea = this.$refs.textarea;
      const lineNumbers = this.$refs.lineNumbers;
  
      textarea.addEventListener('scroll', () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      });
    },
    beforeUnmount() { // Changed from beforeDestroy
      window.removeEventListener('keydown', this.handleKeydown);
    }
  };
  </script>
  
  <style scoped>
  .json-validator {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }
  
  .textarea-wrapper {
    display: flex;
    position: relative;
    width: 100%;
    height: 40%;
    margin-bottom: 20px;
  }
  
  .line-numbers {
    background-color: #f0f0f0;
    color: #888;
    text-align: right;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    user-select: none;
    width: 40px;
    font-family: monospace;
    line-height: 1.6;
    box-sizing: border-box;
    overflow: hidden; /* Убираем скролл-бар */
    height: 100%; /* Устанавливаем высоту на 100% от высоты контейнера .textarea-wrapper */
  }
  
  .line-numbers div {
    line-height: 1.6;
  }
  
  textarea {
    width: calc(100% - 40px);
    padding: 10px;
    resize: vertical;
    font-family: monospace;
    line-height: 1.6;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
  }
  
  .actions {
    margin-bottom: 20px;
  }
  
  .actions button {
    margin-right: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  
  .action-button {
    background-color: #007bff;
    color: white;
  }
  
  .action-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  
  