<template>
    <div class="token-generator">
      <h2>Token Generator</h2>
      <div class="generator-container">
        <label for="length">Token Length: </label>
        <input v-model.number="length" type="number" min="1" max="64" />
        <button @click="generateToken">Generate Token</button>
      </div>
      <input v-model="token" readonly />
      <button @click="clearToken">Clear</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TokenGenerator',
    data() {
      return {
        length: 16, // Длина токена по умолчанию
        token: '',  // Сгенерированный токен
      };
    },
    methods: {
      generateToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < this.length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        this.token = result;
      },
      clearToken() {
        this.token = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .token-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .generator-container {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  input[type="number"] {
    width: 100px;
    margin-right: 10px;
    padding: 5px;
  }
  
  input[readonly] {
    margin-top: 10px;
    padding: 5px;
    width: 300px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  button + input {
    margin-top: 20px;
  }
  </style>
  