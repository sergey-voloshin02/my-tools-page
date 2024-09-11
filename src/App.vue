<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">DevTools</div>
      <ul class="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <div class="main-container">
      <aside class="left-menu">
        <ul>
          <li><a href="#">JSON Validator</a></li>
          <li><a href="#">UUID Generator</a></li>
          <li><a href="#">Token Generator</a></li>
        </ul>
      </aside>

      <main class="content">
        <JSONValidator />
      </main>
    </div>
  </div>
</template>

<script>
import JSONValidator from './components/JSONValidator.vue';

export default {
  components: {
    JSONValidator,
  },
};
</script>

<style scoped>
/* Navbar styles */
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

/* Layout styles */
.main-container {
  display: flex;
  height: calc(100vh - 50px); /* Высота экрана минус высота navbar */
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

/* Content area */
.content {
  flex: 1;
  padding: 20px;
}
</style>
