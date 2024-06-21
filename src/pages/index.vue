<template>
  <GenreFilters />
  <MovieList />
</template>

<script setup>
  import MovieList from '../components/MovieList.vue'
  import GenreFilters from '../components/GenreFilters.vue'
</script>

<script>
  export default {
    name:"Home"
  }
</script>