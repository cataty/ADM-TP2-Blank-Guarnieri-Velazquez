<template>
    <div class="movie-detail">
        <img :src="posterUrl" :alt="title" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">{{ title }}</h3>
            <p class="movie-overview">{{ overview }}</p>
            <div class="movie-data">
                <p><strong>Fecha de estreno:</strong> <span>{{ releaseDate }}</span></p>
                <p><strong>Idioma original:</strong> <span>{{ originalLanguage }}</span></p>
                <p><strong>Géneros:</strong> <span v-for="genre in genres" :key="genre.id">{{ genre.name }} </span></p>
                <p><strong>Calificación:</strong> <span>{{ rating }} ({{ voteCount }} votos)</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MovieDetail",
    data() {
        return {
            title: "",
            overview: "",
            poster: "",
            releaseDate: "",
            originalLanguage: "",
            genres: [],
            rating: "",
            voteCount: "",
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
            console.log(movieId);
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
                    console.log(movie);
                    this.title = movie.title;
                    this.overview = movie.overview;
                    this.poster = movie.poster_path;
                    this.releaseDate = movie.release_date;
                    this.originalLanguage = movie.original_language;
                    this.genres = movie.genres;
                    this.rating = movie.vote_average;
                    this.voteCount = movie.vote_count;
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        }
    }
};
</script>

<style scoped>
.movie-detail {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    background:#f8f8fc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-poster {
    max-width: 100%;
    border-radius: 8px;
    margin-right: 20px;
}

.movie-info {
    text-align: left;
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

.movie-data{
    margin-top:2rem;
    padding: 1rem;
    background:#fff;
}

.movie-data p span{
color: #0D47A1;
}

</style>
