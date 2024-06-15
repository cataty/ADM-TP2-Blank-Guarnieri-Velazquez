<script>
 export default {
        name: 'MovieList',
        props: {
        },
        data () {
            return {
                movies: []
            }
        }, 
        created(){
            this.getMovies();
        },
        methods:{
            async getMovies(){
                this.movies = [];
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
                    }
                };

                fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-Es&page=1&sort_by=popularity.desc&append_to_response=images', options)
                .then(response => response.json())
                .then(response => response.results.forEach(movie => {
                    console.log(movie);
                    this.movies.push(movie);
                }))
                .catch(err => console.error(err));
            }
        },
        expose: []
    };
</script>

<template>
    <ul>
        <li v-for="movie in movies" v-bind:key="movie.id">
            <img class="list-img" v-bind:src="movie.backdrop_path" v-bind:alt="movie.title">
            <h3>{{movie.title}}</h3>
            <p>{{movie.overview}}</p>
            <RouterLink :to="{path: '/movie/'+ movie.id}">Ver detalles</RouterLink>
        </li>
    </ul>
</template>