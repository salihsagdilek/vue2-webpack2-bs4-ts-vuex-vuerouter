import {STORAGE_KEY} from './config'

export const localStoragePlugin = store => {
  store.subscribe((mutation, {todos}) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
};