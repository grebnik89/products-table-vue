export interface IProduct {
  id: number
  name: string
  category: Category
  price: number
  quantity: number
}

export enum Category {
  Electronics = 'Электроника',
  Clothing = 'Одежда', 
  Food = 'Еда'
}

export interface ProductForm {
  name: string
  category: Category | ''
  price: number | null
  quantity: number | null
}