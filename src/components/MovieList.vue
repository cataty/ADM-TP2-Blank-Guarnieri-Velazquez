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

                fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-Es&page=1&sort_by=popularity.desc', options)
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
        <v-row>
            <v-col cols="12" sm="6" md="4"  v-for="movie in movies" v-bind:key="movie.id">
                <v-card hover class="list-card">
                    <v-card-item >
                        <img class="list-img" v-bind:src="('https://image.tmdb.org/t/p/w500'+movie.backdrop_path)" v-bind:alt="movie.title">
                    <v-card-title>
                        {{movie.title}}
                    </v-card-title>
                
                    <v-card-subtitle>
                        {{movie.release_date}}
                    </v-card-subtitle>
                    </v-card-item>
                
                    <v-card-text>
                        {{movie.overview}}
                    </v-card-text>
                    <v-card-item>
                        <RouterLink :to="{path: '/movie/'+ movie.id}"> <v-btn text="Ver Más"></v-btn></RouterLink>
                    </v-card-item>

                </v-card>
            </v-col>
        </v-row>
</template>

<style>

</style>