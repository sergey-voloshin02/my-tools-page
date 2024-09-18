<template>
  <div class="json-validator">
    <h2>JSON Validator</h2>
    <p class="description">
      To format and validate your JSON, just copy + paste it below:
    </p>
    <div class="textarea-wrapper">
      <div class="line-numbers" ref="lineNumbers"></div>
      <textarea v-model="jsonInput" @input="updateLineNumbers" ref="textarea" placeholder="Paste your JSON here..."
        rows="10" cols="50"></textarea>
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

h2 {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 0px;
}

.description {
  font-size: 16px;
  color: #a1a1a1;
  margin-bottom: 40px;
}

.json-validator {
  display: flex;
  
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  width: 90%;
  margin: auto;
}

.textarea-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  height: 60%;
  margin-bottom: 20px;
}

.line-numbers {
  padding-top: 10px;
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
  overflow: hidden;
  height: 60%;
  background: #333;
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
  height: 60%;
  overflow-y: auto;
  overflow-x: scroll;
  background:#444;
  color: white;
  text-wrap: nowrap;
}

textarea:focus-visible{
  outline: none;
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
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* .action-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
} */
.action-button:hover {
  background-color: #555555;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>