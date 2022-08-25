<template>
    <div id="favoriteBtn">
        <button class="button is-primary"
        @click="addFavorite"
        v-if="!isFavorite()"
        >Добавить в избранное</button>
        <button class="button is-danger"
        @click="removeFavorite"
        v-else
        >Убрать из избранного</button>

    </div>
</template>

<script>
export default {
  name: 'FavoriteBtn',
  props: {
    filmData: null
  },
  components: {
  },
  computed: {
  },
  methods: {
    isFavorite: function () {
      return this.$store.getters.getFavorites.findIndex(item => item.filmId === this.filmData.filmId) !== -1
    },
    addFavorite: function () {
      this.$store.commit('ADD_FAVORITE', this.filmData)
    },
    removeFavorite: function () {
      this.$store.commit('REMOVE_FAVORITE', this.filmData)
    }
  },
  mounted () {
  },
  beforeRouteUpdate (to, from, next) {
  }
}
</script>

<style lang="scss">
</style>
