<template>
    <div id="favoritesView">
     <div class="container p-3">
       <section v-if="films == null">
        Идет загрузка данных...
      </section>
      <section v-else-if="films.length == 0">
        Список избранного пуст
      </section>
      <section v-else>
        <MoviesList :filmsArray="films"/>
      </section>
     </div>
    </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'

export default {
  name: 'FavoritesView',
  components: {
    MoviesList
  },
  computed: {
    films: function () {
      return this.$store.getters.getFavorites
    }
  },
  methods: { },
  mounted () { }
}
</script>

<style lang="scss">
</style>
