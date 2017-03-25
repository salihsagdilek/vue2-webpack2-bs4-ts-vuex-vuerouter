<style scoped>
  a {
    color: #fff;
  }

  .btn-group label {
    cursor: pointer;
  }

  .btn-group input[type=radio] {
    visibility: hidden;
    display: none;
  }

  a:hover {
    text-decoration: none;
  }
</style>

<template>
  <div>
    <h1 class="display-1 text-center">Todos</h1>
    <ul class="list-group" v-if="todos.length">
      <li class="list-group-item justify-content-between"
          @dblclick.prevent="toggleTodo(todo)"
          :class="{'list-group-item-success' : todo.done}"
          v-for="todo in filteredTodos">
        {{todo.title}}
        <span>
        <router-link :to="{ name: 'edit-todo', params : { todoId: todo.id } }" class="badge badge-warning badge-pill">Edit</router-link>
        <a class="badge badge-danger badge-pill" href="#" @click.prevent="deleteTodo(todo)">Delete</a>
      </span>
      </li>
    </ul>
    <h3 class="text-center" v-else>Please add Todo</h3>
    <br>
    <div class="text-center">
      <div class="btn-group">
        <label class="btn" :class="[key == visibility ? 'btn-primary' : 'btn-outline-secondary']"
               v-for="(filter, key) in filters">
          <input type="radio" v-model="visibility" :value="key" autocomplete="off"> {{filter.name}}
        </label>
      </div>
    </div>
    <br>
    <br>
    <router-link :to="{ name: 'new-todo' }" class="btn btn-lg btn-primary btn-block">Add New</router-link>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  const filters = {
    all: {name: 'Show all', action: todos => todos},
    notCompleted: {name: 'Show only not completed', action: todos => todos.filter(todo => !todo.done)},
    completed: {name: 'Show only completed', action: todos => todos.filter(todo => todo.done)}
  };
  export default {
    name: 'default-list',
    data(){
      return {
        visibility: 'all',
        filters: filters
      }
    },
    methods: {
      ...mapMutations([
        'editTodo',
        'toggleTodo',
        'deleteTodo'
      ]),
    },
    computed: {
      ...mapState({
        todos: state => state.todos,
        filteredTodos (state) {
          return filters[this.visibility]['action'](state.todos)
        },
      })
    }
  }
</script>