<template>
    <div class="moviesList">
        <div class="container p-6">
            <div class="columns is-multiline">

                <MovieCard v-for="f in getFilms" :key="f.filmId" :film="f" />

            </div>
        </div>
    </div>
</template>

<script>
import MovieCard from './MovieCard.vue'

export default {
  name: 'MoviesList',
  props: {
    filmsArray: null,
    isFavorite: Boolean(false)
  },
  components: { MovieCard },
  computed: {
    getFilms () {
      console.dir(this.filmsArray)
      return this.filmsArray
      // .map(item => {
      //   return { ...item, description: item.description.substring(0, 128) + '...' }
      // })
    }
  },
  methods: {
    handleClick: function (e) {
      console.dir(e)
    }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.card {
    box-shadow: -1px 3px 10px 0 rgb(0 0 0 / 6%);
}
</style>
