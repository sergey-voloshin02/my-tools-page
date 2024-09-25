<template>
  <div class="uuid-generator">
    <h2>UUIDs generator</h2>
    <p class="description">
      A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems.
      The number of possible UUIDs is 2<sup>128</sup> or about 3.4×10^38 (which is a lot!).
    </p>

    <!-- Компонент уведомления -->
    <AppNotification v-if="showNotification" message="UUIDs copied to clipboard!" />

    <div class="version-selection">
      <span>UUID version</span>
      <button
        v-for="version in versions"
        :key="version"
        @click="setUUIDVersion(version)"
        :class="{ active: version === uuidVersion }"
        class="btn version-btn"
      >
        {{ version }}
      </button>
    </div>

    <div class="quantity-selection">
      <span>Quantity</span>
      <div class="quantity-wrapper">
        <input v-model.number="uuidCount" readonly />
        <div class="quantity-buttons">
          <button @click="decreaseCount" class="btn">-</button>
          <button @click="increaseCount" class="btn">+</button>
        </div>
      </div>
    </div>

    <textarea v-model="uuidsText" readonly class="uuid-textarea"></textarea>

    <div class="actions">
      <button @click="copyToClipboard" class="btn">Copy</button>
      <button @click="refreshUUIDs" class="btn">Refresh</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import AppNotification from './AppNotification.vue'; // Импортируем компонент уведомления

export default {
  name: 'UUIDGenerator',
  components: {
    AppNotification,
  },
  data() {
    return {
      versions: ['NIL', 'v1', 'v4'],
      uuidVersion: 'v4',
      uuidCount: 1,
      uuids: [],
      uuidsText: '',
      showNotification: false, // Для отображения уведомления
    };
  },
  mounted() {
    this.generateUUIDs();
  },
  methods: {
    setUUIDVersion(version) {
      this.uuidVersion = version;
      this.generateUUIDs();
    },
    generateUUIDs() {
      this.uuids = [];
      for (let i = 0; i < this.uuidCount; i++) {
        let uuid = '';
        if (this.uuidVersion === 'NIL') {
          uuid = '00000000-0000-0000-0000-000000000000';
        } else if (this.uuidVersion === 'v1') {
          uuid = uuidv1();
        } else if (this.uuidVersion === 'v4') {
          uuid = uuidv4();
        } 
        this.uuids.push(uuid);
      }
      this.uuidsText = this.uuids.join('\n');
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.uuidsText).then(() => {
        this.showNotification = true; // Показываем уведомление
        setTimeout(() => {
          this.showNotification = false; // Скрываем через 3 секунды
        }, 3000);
      });
    },
    refreshUUIDs() {
      this.generateUUIDs();
    },
    increaseCount() {
      this.uuidCount++;
      this.generateUUIDs();
    },
    decreaseCount() {
      if (this.uuidCount > 1) {
        this.uuidCount--;
        this.generateUUIDs();
      }
    },
  },
};
</script>

<style scoped>
/* Оставляем стили как есть */
.uuid-generator {
  width: 650px;
  margin: auto;
  color: #fff;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 400;
}

.description {
  font-size: 16px;
  color: #a1a1a1;
  margin-bottom: 20px;
}

.version-selection, .quantity-selection {
  margin-bottom: 20px;
}

.version-selection span, .quantity-selection span {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.btn {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #555555;
}

.version-btn {
  margin-right: 10px;
}

.version-btn.active {
  background-color: rgb(0 123 255 / 65%);
  color: white;
}

.quantity-selection input {
  width: 60px;
  text-align: center;
  border: none;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.quantity-buttons {
  display: flex;
  gap: 10px;
}

.quantity-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.uuid-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: #333;
  border-radius: 5px;
  color: white;
  resize: none;
  border: none;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
