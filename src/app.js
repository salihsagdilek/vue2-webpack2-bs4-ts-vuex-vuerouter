/**
 * Setup
 */
import 'babel-polyfill'
import Vue from 'vue';
import VueRouter from 'vue-router';
import {sync} from 'vuex-router-sync'
Vue.use(VueRouter);

/**
 * Stores
 */
import {store} from './stores/';

/**
 * Components
 */
import App from './components/App.vue';
import ListTodo from './components/todos/list.vue';
import NewTodo from './components/todos/new.vue';
import EditTodo from './components/todos/edit.vue';

/**
 * Routes
 */
const routes = [
  {path: '/', name: 'home', component: ListTodo},
  {path: '/new', name: 'new-todo', component: NewTodo},
  {path: '/edit/:todoId', name: 'edit-todo', component: EditTodo}
];

/**
 * Router instance
 */
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

sync(store, router);
/**
 * Initialize
 */
const app = new Vue({
  store,
  router,
  render: h => h(App)
});
app.$mount('#app');