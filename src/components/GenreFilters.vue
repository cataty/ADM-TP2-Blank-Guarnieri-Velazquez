<template>
    <v-chip-group selected-class="text-primary" multiple>
        <v-chip 
        v-for="genre in genres"
        variant="elevated"
        filter
        @click="selectGenre"
        >
            {{genre.name}}
        </v-chip>
      </v-chip-group>
</template>

<script>
export default {
    name: 'GenreFilters',
    data (){
        return {
            genres: []
        }
    },
    created(){
        this.getGenres();
    },
    methods: {
        async getGenres(){
            this.genres = [];
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE5NDMxNDU0YTYyNmQ1MDdjODVkNGVhNzg4OWUwYSIsInN1YiI6IjY2NmM4OTdkMjA1YjFlMzhjNDUyMjZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XM9hLMfonKvb3Io18086kWxrXpmZMFlksss9MPVnf6g'
                }
            };

            fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
            .then(response => response.json())
            .then(response => response.genres.forEach(genre => {
                    console.log(genre);
                    this.genres.push(genre);
            }))
            .catch(err => console.error(err));
        },
        selectGenre(){

        }
    }
}
</script>