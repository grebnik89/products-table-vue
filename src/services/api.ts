import { IProduct } from '@/types/product'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
   async createProduct(product: Omit<IProduct, 'id'>): Promise<{ success: boolean }> {
    console.log('Mock API: Creating product with delay...')
    await delay(500 + Math.random() * 1000)
    if (Math.random() < 0.1) {
      console.log('Mock API: Simulating error for create product')
      throw new Error('API Error: Failed to create product')
    }
    console.log('Mock API: Product created successfully')
    return { success: true }
  },

  async deleteProduct(id: number): Promise<{ success: boolean }> {
    await delay(500 + Math.random() * 1000)
    console.log('Mock API: Delete product with delay...')
    if (Math.random() < 0.1) {
      console.log('Mock API: Simulating error for delete product')
      throw new Error('API Error: Failed to delete product')
    }
    console.log('Mock API: Product delete successfully')
    return { success: true }
  }
}