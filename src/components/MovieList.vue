<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="movie in movies" :key="movie.id">
      <v-card hover class="list-card">
        <v-card-item>
          <img v-if="movie.backdrop_path" class="list-img" :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" :alt="movie.title">
          <img v-else class="list-img" src="../assets/movie-list-placeholder.jpg" :alt="movie.title + ' - no se encontró la imágen'">
          <v-card-title class="list-card-title text-blue-darken-4">{{ movie.title }}</v-card-title>
          <v-card-subtitle class="text-blue-darken-2">{{ movie.release_date }}</v-card-subtitle>
        </v-card-item>
        <v-card-text class="text-blue-grey-darken-4">{{ movie.overview }}</v-card-text>
        <v-card-actions>
          <router-link :to="{ path: '/movie/' + movie.id }">
            <v-btn text>Ver Más</v-btn>
          </router-link>
          <v-btn text @click="toggleFavorito(movie)" :color="esFavorito(movie) ? 'error' : 'success'">
            {{ esFavorito(movie) ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const movies = ref([]);
const favoritos = ref([]);
const selectedGenres = ref([]);

const getMovies = async (search = '') => {
  const withGenres = selectedGenres.value.length ? '&with_genres=' + selectedGenres.value.join(',') : '';
  const searchQuery = search ? '&query=' + search : '';
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
      }
    };

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-Es${withGenres}${searchQuery}&page=1&sort_by=popularity.desc`, options);
    const data = await response.json();

    movies.value = data.results.map(movie => ({
      ...movie,
      favorito: false
    }));
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  }
};

const getMoviesByGenre = (genres) => {
  selectedGenres.value = genres;
  getMovies();
};

const toggleFavorito = (movie) => {
  const index = movies.value.findIndex(m => m.id === movie.id);
  if (index !== -1) {
    movies.value[index].favorito = !movies.value[index].favorito;
    if (movies.value[index].favorito) {
      agregarFavorito(movie);
    } else {
      quitarFavorito(movie);
    }
  }
};

const esFavorito = (movie) => {
  return favoritos.value.some(fav => fav.id === movie.id);
};

const agregarFavorito = (movie) => {
  favoritos.value.push(movie);
  guardarFavoritosEnLocalStorage();
};

const quitarFavorito = (movie) => {
  const index = favoritos.value.findIndex(fav => fav.id === movie.id);
  if (index !== -1) {
    favoritos.value.splice(index, 1);
    guardarFavoritosEnLocalStorage();
  }
};

const guardarFavoritosEnLocalStorage = () => {
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value));
};

const cargarFavoritosDesdeLocalStorage = () => {
  const favoritosLocalStorage = localStorage.getItem('favoritos');
  if (favoritosLocalStorage) {
    favoritos.value = JSON.parse(favoritosLocalStorage);
  }
};

onMounted(() => {
  getMovies();
  cargarFavoritosDesdeLocalStorage();
});

defineExpose({
  getMovies,
  getMoviesByGenre,
  setMovies(moviesData) {
    movies.value = moviesData;
  }
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

.list-card-title{
  margin-top:1rem;
}
</style>
