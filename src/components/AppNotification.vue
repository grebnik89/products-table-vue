<template>
  <div class="notifications">
    <div 
      v-for="notification in notifications" 
      :key="notification.id"
      :class="['notification', notification.type]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
  computed: {
    notifications() {
      return this.$store.state.products.notifications
    }
  }
}
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.notification {
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  min-width: 250px;
}

.notification.success {
  background: #4CAF50;
}

.notification.error {
  background: #f44336;
}
</style>