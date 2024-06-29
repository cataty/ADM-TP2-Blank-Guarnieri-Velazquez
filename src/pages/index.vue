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
  <SearchBar @search="handleSearchResults" />
  <GenreFilters @genreSelect="refreshMovieList" />
  <MovieList ref="movieListRef" />
</template>
