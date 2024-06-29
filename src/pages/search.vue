<template>
    <v-container>
      <SearchBar @search="performSearch"></SearchBar>
      <MovieList v-if="filteredMovies.length > 0" :movies="filteredMovies"></MovieList>
      <div v-else>
        <p v-if="movies.length === 0">Cargando...</p>
        <p v-else>No se encontraron resultados.</p>
      </div>
    </v-container>
  </template>
  
  <script>
  import SearchBar from '@/components/SearchBar.vue';
  import MovieList from '@/components/MovieList.vue';
  
  export default {
    name: 'SearchPage',
    components: {
      SearchBar,
      MovieList
    },
    data() {
      return {
        movies: [], // Listado completo de películas obtenido de la API
        filteredMovies: [] // Listado de películas filtrado por la búsqueda del usuario
      };
    },
    created() {
      // Cargar listado inicial de películas al cargar la página
      this.getMovies();
    },
    methods: {
      async getMovies() {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer TU_TOKEN_AQUI'
          }
        };
  
        // Llamada a la API para obtener las películas populares
        fetch(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc',
          options
        )
          .then(response => response.json())
          .then(response => {
            this.movies = response.results; // Asignar los resultados al listado completo de películas
            this.filteredMovies = [...this.movies]; // Inicialmente mostrar todas las películas
          })
          .catch(err => console.error(err));
      },
      async performSearch(query) {
        if (!query) {
          this.filteredMovies = [...this.movies]; // Si no hay query, mostrar todas las películas
          return;
        }
  
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer TU_TOKEN_AQUI'
          }
        };
  
        // Llamada a la API para buscar películas por título
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=es-ES&page=1&include_adult=false`,
          options
        )
          .then(response => response.json())
          .then(response => {
            this.filteredMovies = response.results; // Asignar los resultados de la búsqueda al listado filtrado
          })
          .catch(err => console.error(err));
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  