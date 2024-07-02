<template>
    <v-text-field
      v-model="searchTerm"
      label="Buscar películas"
      @input="onSearch"
      clearable
    />
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const searchTerm = ref('');
  
  const emit = defineEmits(['search']);
  
  const onSearch = async () => {
    if (searchTerm.value.trim()) {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
          }
        };
  
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm.value}&language=es-ES&page=1&include_adult=false`, options);
        const data = await response.json();
  
        emit('search', data.results);
      } catch (error) {
        console.error('Error al buscar las películas:', error);
      }
    } else {
      emit('search', []);
    }
  };
  
  watch(searchTerm, onSearch);
  </script>

<style>
.searchbar{
  width: 75%;
  margin-top:4rem;
}

.searchbar .v-input__control{
  height: 4rem;
}
</style>
  