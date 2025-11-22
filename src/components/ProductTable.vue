<template>
  <div class="product-table">
    <h2>Список товаров</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.quantity > 0 ? 'В наличии' : 'Нет в наличии' }}</td>
          <td class="actions">
            <button 
              @click="moveProductUp(product.id)" 
              :disabled="index === 0"
              class="move-btn"
              title="Переместить вверх"
            >
              ↑
            </button>
            <button 
              @click="moveProductDown(product.id)" 
              :disabled="index === products.length - 1"
              class="move-btn"
              title="Переместить вниз"
            >
              ↓
            </button>
            <button 
              @click="deleteProduct(product.id)" 
              class="delete-btn"
              title="Удалить"
            >
              ✕
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="products.length === 0" class="empty-state">
      Нет товаров для отображения
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
  computed: {
    products() {
      return this.$store.state.products.products
    }
  },
  methods: {
    deleteProduct(id) {
      if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        this.$store.dispatch('products/deleteProduct', id)
      }
    },
    moveProductUp(id) {
      this.$store.dispatch('products/moveProduct', { id, direction: 'up' })
    },
    moveProductDown(id) {
      this.$store.dispatch('products/moveProduct', { id, direction: 'down' })
    }
  }
}
</script>

<style scoped>
.product-table {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #e9ecef;
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.move-btn, .delete-btn {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.move-btn {
  background-color: #6c757d;
  color: white;
}

.move-btn:hover:not(:disabled) {
  background-color: #5a6268;
}

.move-btn:disabled {
  background-color: #ced4da;
  cursor: not-allowed;
  opacity: 0.5;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-style: italic;
}
</style>