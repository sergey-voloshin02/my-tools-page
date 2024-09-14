<template>
  <div class="uuid-generator">
    <h2>UUIDs Generator</h2>

    <div class="version-selection">
      <span>UUIDs version:</span>
      <button
        v-for="version in versions"
        :key="version"
        @click="setUUIDVersion(version)"
        :class="{ active: version === uuidVersion }"
      >
        {{ version }}
      </button>
    </div>

    <div class="quantity-selection">
      <span>Quantity:</span>
      <input v-model.number="uuidCount" readonly />
      <div class="quantity-buttons">
        <button @click="decreaseCount">-</button>
        <button @click="increaseCount">+</button>
      </div>
    </div>

    <textarea v-model="uuidsText" readonly class="uuid-textarea"></textarea>

    <div class="actions">
      <button @click="copyToClipboard">Copy</button>
      <button @click="refreshUUIDs">Refresh</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

export default {
  name: 'UUIDGenerator',
  data() {
    return {
      versions: ['NIL', 'v1', 'v4', 'v7'],
      uuidVersion: 'v4', // По умолчанию v4
      uuidCount: 1, // По умолчанию 1 UUID
      uuids: [], // Массив для хранения UUID
      uuidsText: '', // Строка для отображения UUID в textarea
    };
  },
  mounted() {
    this.generateUUIDs(); // Генерация UUID при загрузке страницы
  },
  methods: {
    setUUIDVersion(version) {
      this.uuidVersion = version;
      this.generateUUIDs(); // Перегенерация при смене версии
    },
    generateUUIDs() {
      this.uuids = [];
      for (let i = 0; i < this.uuidCount; i++) {
        let uuid = '';
        if (this.uuidVersion === 'NIL') {
          uuid = '00000000-0000-0000-0000-000000000000'; // NIL UUID
        } else if (this.uuidVersion === 'v1') {
          uuid = uuidv1();
        } else if (this.uuidVersion === 'v4') {
          uuid = uuidv4();
        } else if (this.uuidVersion === 'v7') {
          uuid = this.generateUUIDv7(); // Пример для UUID v7
        }
        this.uuids.push(uuid);
      }
      this.uuidsText = this.uuids.join('\n'); // Объединение UUID в строку
    },
    generateUUIDv7() {
      return 'f7b1cf80-e88b-7dc4-8000-000000000000'; // Пример UUID v7
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.uuidsText).then(() => {
        alert('UUIDs copied to clipboard!');
      });
    },
    refreshUUIDs() {
      this.generateUUIDs(); // Обновление UUID при нажатии Refresh
    },
    increaseCount() {
      this.uuidCount++;
      this.generateUUIDs(); // Перегенерация при изменении количества
    },
    decreaseCount() {
      if (this.uuidCount > 1) {
        this.uuidCount--;
        this.generateUUIDs(); // Перегенерация при уменьшении количества
      }
    },
  },
};
</script>

<style scoped>
.uuid-generator {
  width: 650px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 10px;
}

.version-selection {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.version-selection button {
  padding: 5px 15px;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  cursor: pointer;
}

.version-selection .active {
  background-color: #007bff;
  color: white;
}

.quantity-selection {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.quantity-buttons {
  display: flex;
  margin-right: 5px;
}

.quantity-selection input {
  text-align: center;
  width: 50px;
  padding: 5px;
}

.uuid-textarea {
  width: 100%;
  max-width: 500px;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  resize: none;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #0056b3;
}
</style>
