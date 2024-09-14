<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">DevTools</div>
      <ul class="navbar-links">
        <li><router-link to="/json-validator">JSON Validator</router-link></li>
        <li><router-link to="/uuid-generator">UUID Generator</router-link></li>
        <li><router-link to="/token-generator">Token Generator</router-link></li>
      </ul>
    </nav>

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
export default {
  name: 'App',
};
</script>

<style scoped>
/* Оставляем стили такие же */
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

.navbar-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 20px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.navbar-links a:hover {
  background-color: #555;
  border-radius: 5px;
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
  padding: 20px;
}
</style>
