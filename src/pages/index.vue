
<script setup>
  import MovieList from '../components/MovieList.vue'
  import GenreFilters from '../components/GenreFilters.vue'
</script>

<template>
  <GenreFilters @genreSelect="refreshMovieList" />
  <MovieList 
  ref="movieList"/>
</template>

<script>
  export default {
    name:"Home",
    methods:{
        refreshMovieList(selectedGenres){
            this.$refs.movieList.getMovies(selectedGenres);
        }
    }
  }
</script>
