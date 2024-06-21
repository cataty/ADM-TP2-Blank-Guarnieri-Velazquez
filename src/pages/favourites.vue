<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="movie in favoritos" :key="movie.id">
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
          <v-btn text @click="quitarFavorito(movie)" color="error">Quitar de Favoritos</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

const favoritos = ref([]);

// Cargar favoritos desde localStorage al iniciar el componente
const cargarFavoritosDesdeLocalStorage = () => {
  const favoritosLocalStorage = localStorage.getItem('favoritos');
  if (favoritosLocalStorage) {
    favoritos.value = JSON.parse(favoritosLocalStorage);
  }
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
import { onMounted } from 'vue';
onMounted(() => {
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

