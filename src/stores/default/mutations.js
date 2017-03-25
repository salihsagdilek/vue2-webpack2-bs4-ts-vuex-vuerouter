const uuidV4 = require('uuid/v4');

export const mutations = {
  addTodo (state, todo) {
    todo.done = false;
    todo.id = uuidV4();
    state.todos.push(todo)
  },

  deleteTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },

  toggleTodo (state, todo) {
    todo.done = !todo.done
  },

  editTodo (state, {todo, newValue}) {
    todo.title = newValue.title;
    todo.description = newValue.description;
  },

  toggleAll (state, {done}) {
    state.todos.forEach((todo) => {
      todo.done = done
    })
  },

  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
};