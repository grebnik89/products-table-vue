<template>
  <div class="product-form">
    <h2>Добавить товар</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Название:</label>
        <input 
          type="text" 
          v-model="form.name" 
          @blur="validateField('name')"
          :class="{ 'error': errors.name }"
        />
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </div>
      
      <div class="form-group">
        <label>Категория:</label>
        <select 
          v-model="form.category" 
          @blur="validateField('category')"
          :class="{ 'error': errors.category }"
        >
          <option value="">Выберите категорию</option>
          <option value="Электроника">Электроника</option>
          <option value="Одежда">Одежда</option>
          <option value="Еда">Еда</option>
        </select>
        <div v-if="errors.category" class="error-message">{{ errors.category }}</div>
      </div>
      
      <div class="form-group">
        <label>Цена:</label>
        <input 
          type="number" 
          v-model.number="form.price" 
          @blur="validateField('price')"
          :class="{ 'error': errors.price }"
          min="0"
          step="0.01"
        />
        <div v-if="errors.price" class="error-message">{{ errors.price }}</div>
      </div>
      
      <div class="form-group">
        <label>Количество:</label>
        <input 
          type="number" 
          v-model.number="form.quantity" 
          @blur="validateField('quantity')"
          :class="{ 'error': errors.quantity }"
          min="0"
        />
        <div v-if="errors.quantity" class="error-message">{{ errors.quantity }}</div>
      </div>
      
      <button 
        type="submit" 
        :disabled="!isFormValid"
        class="submit-btn"
      >
        Добавить товар
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  data() {
    return {
      form: {
        name: '',
        category: '',
        price: null,
        quantity: null
      },
      errors: {
        name: '',
        category: '',
        price: '',
        quantity: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        this.form.name.length >= 3 &&
        this.form.category &&
        this.form.price > 0 &&
        this.form.quantity >= 0
      )
    }
  },
  methods: {
    validateField(field) {
      switch (field) {
        case 'name':
          this.errors.name = this.form.name.length < 3 ? 'Название должно содержать минимум 3 символа' : ''
          break
        case 'category':
          this.errors.category = !this.form.category ? 'Выберите категорию' : ''
          break
        case 'price':
          this.errors.price = !this.form.price || this.form.price <= 0 ? 'Цена должна быть больше 0' : ''
          break
        case 'quantity':
          this.errors.quantity = this.form.quantity === null || this.form.quantity < 0 ? 'Количество должно быть неотрицательным числом' : ''
          break
      }
    },
    submitForm() {
      // Валидация всех полей
      Object.keys(this.form).forEach(field => this.validateField(field))
      
      if (this.isFormValid) {
        this.$store.dispatch('products/addProduct', {
          name: this.form.name,
          category: this.form.category,
          price: this.form.price,
          quantity: this.form.quantity
        })
        
        // Сброс формы
        this.form = { name: '', category: '', price: null, quantity: null }
        this.errors = { name: '', category: '', price: '', quantity: '' }
      }
    }
  }
}
</script>

<style scoped>
.product-form {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input.error,
.form-group select.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover:not(:disabled) {
  background: #0056b3;
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>