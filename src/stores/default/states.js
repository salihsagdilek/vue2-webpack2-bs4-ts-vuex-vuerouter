import {STORAGE_KEY} from './config';

export const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
};
