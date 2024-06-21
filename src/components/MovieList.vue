<template>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="movie in movies" :key="movie.id">
        <v-card hover class="list-card">
          <v-card-item>
            <img class="list-img" :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" :alt="movie.title">
            <v-card-title>{{ movie.title }}</v-card-title>
            <v-card-subtitle>{{ movie.release_date }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>{{ movie.overview }}</v-card-text>
          <v-card-actions>
            <router-link :to="{ path: '/movie/' + movie.id }">
              <v-btn text>Ver Más</v-btn>
            </router-link>
            <v-btn text @click="toggleFavorito(movie)">
              {{ esFavorito(movie) ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const movies = ref([]);
  const favoritos = ref([]);
  
  // Método para obtener películas desde la API
  const getMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
        }
      };
  
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-Es&page=1&sort_by=popularity.desc', options);
      const data = await response.json();
  
      movies.value = data.results;
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  };
  
  // Método para agregar o quitar películas de favoritos
  const toggleFavorito = (movie) => {
    if (esFavorito(movie)) {
      quitarFavorito(movie);
    } else {
      agregarFavorito(movie);
    }
  };
  
  // Método para verificar si una película está en favoritos
  const esFavorito = (movie) => {
    return favoritos.value.some(fav => fav.id === movie.id);
  };
  
  // Método para agregar una película a favoritos
  const agregarFavorito = (movie) => {
    favoritos.value.push(movie);
    guardarFavoritosEnLocalStorage();
    console.log('Agregado a favoritos:', movie.title);
  };
  
  // Método para quitar una película de favoritos
  const quitarFavorito = (movie) => {
    const index = favoritos.value.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
      favoritos.value.splice(index, 1);
      guardarFavoritosEnLocalStorage();
      console.log('Quitado de favoritos:', movie.title);
    }
  };
  
  // Método para guardar favoritos en localStorage
  const guardarFavoritosEnLocalStorage = () => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
  };
  
  // Cargar favoritos desde localStorage al iniciar el componente
  const cargarFavoritosDesdeLocalStorage = () => {
    const favoritosLocalStorage = localStorage.getItem('favoritos');
    if (favoritosLocalStorage) {
      favoritos.value = JSON.parse(favoritosLocalStorage);
    }
  };
  
  // Cargar películas al iniciar el componente
  import { onMounted } from 'vue';
  onMounted(() => {
    getMovies();
    cargarFavoritosDesdeLocalStorage();
  });
  </script>
  
  <style scoped>
  .list-card {
    margin-bottom: 20px;
  }
  
  .list-img {
    width: 100%;
    height: auto;
  }
  </style>
   