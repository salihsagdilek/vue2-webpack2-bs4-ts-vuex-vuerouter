<style>
  body {
    padding: 5rem;
  }
</style>

<template>
  <div>
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button class="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link :to="{ name: 'home' }" class="navbar-brand">Todo App</router-link>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <router-link :to="{ name: 'home' }" class="nav-item" tag="li" exact>
            <a class="nav-link">Todo Lists</a>
          </router-link>

        </ul>
      </div>
      <div class="form-inline mt-2 mt-md-0">
        <router-link :to="{ name: 'new-todo' }" class="btn btn-success btn-sm btn-white-color">
          <a class="nav-link">New</a>
        </router-link>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div><!-- /.container -->
  </div>
</template>

<script>
  export default {
    name: 'TodoApp'
  }
</script>