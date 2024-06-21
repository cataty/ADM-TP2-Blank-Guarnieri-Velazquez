<template>
  <div>
    <h2>Mis Películas Favoritas</h2>
    <ul>
      <li v-for="movie in favoritos" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favoritos = ref([]);

// Método para cargar los favoritos desde localStorage
const cargarFavoritosDesdeLocalStorage = () => {
  const favoritosLocalStorage = localStorage.getItem('favoritos');
  if (favoritosLocalStorage) {
    favoritos.value = JSON.parse(favoritosLocalStorage);
  }
};

// Cargar favoritos al montar el componente
onMounted(() => {
  cargarFavoritosDesdeLocalStorage();
});
</script>

<style scoped>
/* Estilos opcionales para la lista de favoritos */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
