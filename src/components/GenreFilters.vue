<template>
    <div class="filterbar">
        <v-chip-group selected-class="text-primary" multiple>
            <v-chip class="filter text-blue-darken-2" v-for="genre in genres" :key="genre.id" variant="elevated" filter
                @click="selectGenre(genre.id)">
                {{ genre.name }}
            </v-chip>
        </v-chip-group>
    </div>
</template>

<style scoped>
.filterbar {
    margin: 2.5rem 0;
    display: flex;
    justify-content: center;
}

.filter {
    background: #f8f8fc !important;
}
</style>


<script>
export default {
    name: 'GenreFilters',
    data() {
        return {
            genres: [],
            selectedGenres: []
        }
    },
    created() {
        this.getGenres();
    },
    methods: {
        async getGenres() {
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
                    this.genres.push(genre);
                }))
                .catch(err => console.error(err));
        },
        selectGenre(genreId) {
            if (this.selectedGenres.find((genre) => genre === genreId)) {
                this.selectedGenres.splice(this.selectedGenres.find((genre) => genre === genreId).index, 1);
            } else {
                this.selectedGenres.push(genreId);
            }
            this.$emit('genreSelect', this.selectedGenres)
        }
    }
}
</script>

<style scoped></style>