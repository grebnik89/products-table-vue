import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

interface State {
  products: {
    loading: boolean
    hasChanges: boolean
    products: any[]
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}