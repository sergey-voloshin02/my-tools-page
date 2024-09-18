<template>
  <div class="home-page">
    <div class="content">
      <h1>All the tools</h1>
      <div class="tool-grid">
        <div class="tool-card" v-for="tool in tools" :key="tool.title">
          <div class="tool-card-header">
            <font-awesome-icon :icon="tool.icon" class="tool-icon" />
            <span class="favorite-icon">
              <font-awesome-icon :icon="['fas', 'heart']" />
            </span>
          </div>
          <h3>{{ tool.title }}</h3>
          <p>{{ tool.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        { title: 'JSON Validator', description: 'Validate and format your JSON strings...', icon: ['fas', 'code'] },
        { title: 'Token generator', description: 'Generate random tokens with customizable options...', icon: ['fas', 'key'] },
        { title: 'UUIDs generator', description: 'Generate Universally Unique Identifiers (UUIDs)...', icon: ['fas', 'fingerprint'] }
      ]
    };
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  color: #fff;
  /* background-color: #121212; */
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.content h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #eee;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.tool-card {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.tool-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-icon {
  font-size: 24px;
  color: #ccc;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: #666;
}

.favorite-icon:hover {
  color: #f44336;
  cursor: pointer;
}

.tool-card h3 {
  font-size: 18px;
  margin: 10px 0;
  color: #fff;
}

.tool-card p {
  font-size: 14px;
  color: #bbb;
}

.tool-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
