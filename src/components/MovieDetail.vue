<template>
    <div>
        <img v-bind:src="poster" v-bind:alt="title">
        <h3>{{title}}</h3>
        <p>{{overview}}</p>
    </div>
</template>

<script setup>
</script>

<script>
export default {
    name: "MovieDetail",
    data(){
        return{
            title: "",
            overview: "",
            poster: "",
            releaseDate:"",
            originalLanguage:"",
            genres: [],
            rating:"",
            voteCount:"",
        }
    },
    created(){
        this.getMovie();
    },
    methods:{
        getMovie(){
            let movieId = this.$route.params.id;
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
            });
        }
    }
}
</script>

<style scope>
img{
    max-width: 100%;
}
</style>