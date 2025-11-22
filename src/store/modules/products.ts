import { IProduct, Category } from '@/types/product'
import { mockApi } from '@/services/api'

const state = {
  products: [] as IProduct[],
  loading: false,
  hasChanges: false,
  notifications: [] as any[]
}

const getters = {
  status: (state: any) => (product: IProduct) => 
    product.quantity > 0 ? 'В наличии' : 'Нет в наличии'
}

const mutations = {
  SET_PRODUCTS(state: any, products: IProduct[]) {
    state.products = products
  },
  SET_LOADING(state: any, loading: boolean) {
    state.loading = loading
  },
  SET_HAS_CHANGES(state: any, hasChanges: boolean) {
    state.hasChanges = hasChanges
  },
  ADD_PRODUCT(state: any, product: IProduct) {
    state.products.push(product)
    state.hasChanges = true
  },
  REMOVE_PRODUCT(state: any, id: number) {
    state.products = state.products.filter((p: IProduct) => p.id !== id)
    state.hasChanges = true
  },
  MOVE_PRODUCT(state: any, payload: { fromIndex: number; toIndex: number }) {
    const product = state.products[payload.fromIndex]
    state.products.splice(payload.fromIndex, 1)
    state.products.splice(payload.toIndex, 0, product)
    state.hasChanges = true
  },
  ADD_NOTIFICATION(state: any, notification: any) {
    state.notifications.push(notification)
  },
  REMOVE_NOTIFICATION(state: any, id: number) {
    state.notifications = state.notifications.filter((n: any) => n.id !== id)
  }
}

const actions = {
  async loadFromLocalStorage({ commit }: any) {
    const stored = localStorage.getItem('products')
    if (stored) {
      commit('SET_PRODUCTS', JSON.parse(stored))
    } else {
      const initialProducts: IProduct[] = [
        { id: 1, name: 'Ноутбук', category: Category.Electronics, price: 1000, quantity: 5 },
        { id: 2, name: 'Футболка', category: Category.Clothing, price: 20, quantity: 10 },
        { id: 3, name: 'Яблоки', category: Category.Food, price: 5, quantity: 0 },
      ]
      commit('SET_PRODUCTS', initialProducts)
    }
    commit('SET_HAS_CHANGES', false)
  },

  async saveToLocalStorage({ commit, state }: any) {
    localStorage.setItem('products', JSON.stringify(state.products))
    commit('SET_HAS_CHANGES', false)
  },

  async addProduct({ commit, state, dispatch }: any, productData: Omit<IProduct, 'id'>) {
    commit('SET_LOADING', true)
    try {
      await mockApi.createProduct(productData)
      const newProduct: IProduct = {
        ...productData,
        id: Math.max(0, ...state.products.map((p: IProduct) => p.id)) + 1
      }
      commit('ADD_PRODUCT', newProduct)
      // Уведомление об успехе
      dispatch('showNotification', {
        type: 'success',
        message: 'Товар успешно добавлен'
      })
    } catch (error: unknown) {
      // Уведомление об ошибке
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Неизвестная ошибка'
      
      dispatch('showNotification', {
        type: 'error',
        message: `Ошибка при добавлении товара: ${errorMessage}`
      })
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteProduct({ commit, dispatch }: any, id: number) {
    commit('SET_LOADING', true)
    try {
      await mockApi.deleteProduct(id)
      commit('REMOVE_PRODUCT', id)
      // Уведомление об успехе
      dispatch('showNotification', {
        type: 'success',
        message: 'Товар успешно удален'
      })
    } catch (error: unknown) {
      // Уведомление об ошибке
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Неизвестная ошибка'
      
      dispatch('showNotification', {
        type: 'error',
        message: `Ошибка при удалении товара: ${errorMessage}`
      })
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async showNotification({ commit }: any, { type, message }: { type: 'success' | 'error'; message: string }) {
    const id = Date.now()
    commit('ADD_NOTIFICATION', { id, type, message })
    
    // Автоскрытие через 3 секунды
    setTimeout(() => {
      commit('REMOVE_NOTIFICATION', id)
    }, 3000)
  },

  async moveProduct({ commit, state }: any, { id, direction }: { id: number; direction: 'up' | 'down' }) {
    const currentIndex = state.products.findIndex((p: IProduct) => p.id === id)
    
    if (currentIndex === -1) return
    
    let newIndex
    if (direction === 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1
    } else if (direction === 'down' && currentIndex < state.products.length - 1) {
      newIndex = currentIndex + 1
    } else {
      return // Нельзя переместить
    }
    
    commit('MOVE_PRODUCT', { fromIndex: currentIndex, toIndex: newIndex })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}