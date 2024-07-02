<template>
    <div class="movie-detail">
      <img :src="posterUrl" :alt="title" class="movie-poster">
      <div class="movie-info">
        <h3 class="movie-title">{{ title }}</h3>
        <p class="movie-overview">{{ overview }}</p>
        <div class="movie-data">
          <p><strong>Fecha de estreno:</strong> <span>{{ releaseDate }}</span></p>
          <p><strong>Idioma original:</strong> <span>{{ originalLanguage }}</span></p>
          <p><strong>Géneros:</strong> 
            <v-chip-group class="d-inline">
              <v-chip v-for="genre in genres" :key="genre.id">{{ genre.name }}</v-chip>
            </v-chip-group>
          </p>
          <p><strong>Calificación:</strong> <span>{{ rating }} ({{ voteCount }} votos)</span></p>
          <v-btn text @click="toggleFavorito(movie)" :color="esFavorito(movie) ? 'error' : 'success'">
            {{ esFavorito(movie) ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}
          </v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: "MovieDetail",
    data() {
      return {
        movie: null,
        title: "",
        overview: "",
        poster: "",
        releaseDate: "",
        originalLanguage: "",
        genres: [],
        rating: "",
        voteCount: "",
        favoritos: []
      };
    },
    computed: {
      posterUrl() {
        return this.poster ? `https://image.tmdb.org/t/p/w500${this.poster}` : '';
      }
    },
    created() {
      this.getMovie();
    },
    methods: {
      getMovie() {
        const movieId = this.$route.params.id;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
          }
        };
  
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-ES&append_to_response=videos,images`, options)
          .then(response => response.json())
          .then(movie => {
            this.movie = movie;
            this.title = movie.title;
            this.overview = movie.overview;
            this.poster = movie.poster_path;
            this.releaseDate = movie.release_date;
            this.originalLanguage = movie.original_language;
            this.genres = movie.genres;
            this.rating = movie.vote_average;
            this.voteCount = movie.vote_count;
            this.cargarFavoritosDesdeLocalStorage();
          })
          .catch(error => {
            console.error('Error fetching movie details:', error);
          });
      },
      toggleFavorito(movie) {
        const index = this.favoritos.findIndex(m => m.id === movie.id);
        if (index !== -1) {
          this.favoritos.splice(index, 1);
        } else {
          this.favoritos.push(movie);
        }
        this.guardarFavoritosEnLocalStorage();
      },
      esFavorito(movie) {
        return this.favoritos.some(fav => fav.id === movie.id);
      },
      guardarFavoritosEnLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
      },
      cargarFavoritosDesdeLocalStorage() {
        const favoritosLocalStorage = localStorage.getItem('favoritos');
        if (favoritosLocalStorage) {
          this.favoritos = JSON.parse(favoritosLocalStorage);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .movie-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: #f8f8fc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .movie-poster {
    max-width: 100%;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
  
  .movie-info {
    text-align: center;
  }
  
  .movie-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #0D47A1;
  }
  
  .movie-overview {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .movie-info p {
    margin: 5px 0;
  }
  
  .movie-info strong {
    font-weight: bold;
  }
  
  .movie-data {
    margin-top: 2rem;
    padding: 1rem;
    background: #fff;
    border-radius: 4px;
  }
  
  .movie-data p span {
    color: #0D47A1;
  }
  
  /* Media Queries for responsive design */
  @media (min-width: 768px) {
    .movie-detail {
      flex-direction: row;
      align-items: flex-start;
    }
  
    .movie-info {
      text-align: left;
      margin-left: 1.5rem;
    }
  
    .movie-poster {
      margin-bottom: 0;
      margin-right: 1.5rem;
    }
  }
  </style>
  