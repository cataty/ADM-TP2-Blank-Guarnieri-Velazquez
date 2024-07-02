<script setup>
import { ref } from 'vue';
import MovieList from '../components/MovieList.vue';
import GenreFilters from '../components/GenreFilters.vue';
import SearchBar from '../components/SearchBar.vue';

const movieListRef = ref(null);

const refreshMovieList = (selectedGenres) => {
  movieListRef.value.getMoviesByGenre(selectedGenres);
};

const handleSearchResults = (searchResults) => {
  movieListRef.value.setMovies(searchResults);
};
</script>

<template>

  <v-parallax
  height="450"
  src="/src/assets/movie-placeholder.jpg"
>
  <div class="d-flex flex-column fill-height justify-center align-center text-white">
    <h1 class="text-h4 text-md-h3 font-weight-bold mb-4 hero-title">
      <img src="/src/assets/mymovieApp-logo.png" alt="logo" class="logo"> MyMovieFavs
    </h1>
    <h4 class="subheading font-weight-regular">
      Una colección de tus pelis favoritas
    </h4>
    <SearchBar @search="handleSearchResults" class="searchbar"/>
  </div>
</v-parallax>

  <h2 class="text-h3 text-center text-blue-darken-4">Lista de Películas</h2>

  <GenreFilters @genreSelect="refreshMovieList" />
  <MovieList ref="movieListRef" />
</template>

<style scoped>
.logo {
position:relative;
display: inline-block;
top:4px;
}

h2{
  margin-top:5rem;
}

.hero-title{
  margin:6rem auto;
}

</style>