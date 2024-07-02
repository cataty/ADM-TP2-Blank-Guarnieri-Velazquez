<template>
  <h1 class="text-h3 text-center text-blue-darken-4">Lista de Favoritos</h1>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="movie in favoritos" :key="movie.id">
      <v-card hover class="list-card">
        <v-card-item class="list-card-item">
          <img class="list-img" :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" :alt="movie.title">
          <v-card-title class="list-card-title text-blue-darken-4">{{ movie.title }}</v-card-title>
          <v-card-subtitle class="text-blue-darken-2">{{ movie.release_date }}</v-card-subtitle>
        </v-card-item>
        <v-card-text class="list-text">{{ movie.overview }}</v-card-text>
        <v-card-actions class="list-actions">
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
import { ref, onMounted } from 'vue';

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

onMounted(() => {
  cargarFavoritosDesdeLocalStorage();
});
</script>

<style scoped>
h1{
  margin-top:5rem;
}

.list-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}
.list-card:hover {
  transform: scale(1.05);
}

.list-card-item {
  padding: 16px;
  text-align: center;
}

  .list-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  

  .list-card-title{
    margin-top:1rem;
  }
  
  .list-text {
    font-size: 0.95em;
    color: #333;
    margin: 10px 0;
  }
  
  .list-actions {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
  
  .v-btn {
    margin: 0 5px;
  }
</style>
