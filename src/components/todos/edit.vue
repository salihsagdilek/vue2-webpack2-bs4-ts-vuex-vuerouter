<template>
  <div>
    <form class="form-signin" @submit.prevent="updateTodo">
      <h1 class="display-1 text-center">Edit Todo</h1>
      <hr>
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" placeholder="Just Do It." :value="todo.title" required>
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
          <textarea class="form-control" id="description" placeholder="Description" cols="10"
                    required>{{todo.description}}</textarea>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <router-link :to="{ name: 'home' }" class="btn btn-lg btn-danger btn-block">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  export default {
    name: 'edit-todo',
    data(){
      return {}
    },
    methods: {
      updateTodo(){
        this.$store.commit('editTodo', {
          todo: this.todo,
          newValue: {
            title: this.$el.querySelector('#title').value,
            description: this.$el.querySelector('#description').value
          }
        });
        this.$router.push({name: 'home'});
      }
    },
    computed: {
      ...mapState({
        todo: state => state.todos.filter(todo => todo.id === state.route.params.todoId)[0],
      })
    }
  }
</script>