<template>
  <div id="app">
    <div class="container">
      <h1>Управление товарами</h1>
      
      <ProductForm />
      
      <ProductTable />
      
      <button 
        @click="saveChanges" 
        :disabled="!hasChanges || loading"
        class="save-btn"
      >
        Сохранить
      </button>

      <AppSpinner v-if="loading" />
      <AppNotification />
    </div>
  </div>
</template>

<script>
import ProductForm from './components/ProductForm.vue'
import ProductTable from './components/ProductTable.vue'
import AppSpinner from './components/AppSpinner.vue'
import AppNotification from './components/AppNotification.vue'

export default {
  name: 'App',
  components: {
    ProductForm,
    ProductTable,
    AppSpinner,
    AppNotification
  },
  computed: {
    loading() {
      return this.$store.state.products.loading
    },
    hasChanges() {
      return this.$store.state.products.hasChanges
    }
  },
  mounted() {
    this.$store.dispatch('products/loadFromLocalStorage')
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('products/saveToLocalStorage')
    }
  }
}
</script>