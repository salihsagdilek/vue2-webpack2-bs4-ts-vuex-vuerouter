<template>
  <div>
    <form class="form-signin" @submit.prevent="addNewTodo">
      <h1 class="display-1 text-center">New Todo</h1>
      <hr>
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="title" placeholder="Just Do It." required>
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
          <textarea class="form-control" id="description" placeholder="Description" cols="10" required></textarea>
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
  export default {
    name: 'new-todo',

    methods: {
      addNewTodo(){
        this.$store.commit('addTodo', {
          title: this.$el.querySelector('#title').value,
          description: this.$el.querySelector('#description').value,
        });
        this.$router.push({name: 'home'})
      }
    }
  }
</script>