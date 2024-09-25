<template>
  <div class="notification" v-if="visible">
    <p>{{ message }}</p>
    <button @click="closeNotification" class="close-btn">&times;</button>
    <div class="progress-bar"></div>
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
  props: {
    message: {
      type: String,
      default: 'Action completed!',
    },
    duration: {
      type: Number,
      default: 3000, // Продолжительность отображения в миллисекундах
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        this.closeNotification();
      }, this.duration);
    },
    closeNotification() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2e2e3e;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Убедитесь, что уведомление выше других элементов */
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #00e676;
  animation: progress-animation linear;
  animation-duration: 3s; /* Устанавливается по длительности уведомления */
  width: 100%;
}

@keyframes progress-animation {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>
