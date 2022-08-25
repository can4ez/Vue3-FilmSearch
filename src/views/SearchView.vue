<template>
  <!-- Вьюшка поиска фильмов -->
  <!--
    При поиске убрать баннер, текстовый блок и
    вывести список поиска (при не найденных результатах - заглушка).
    Возможность добавить фильм в список избранного и провалиться
    на страницу описания фильма.
  -->
  <div id="searchView">
     <div class="container p-3">
    <section v-if="loading == true">
      Идет загрузка данных...
    </section>
    <section v-else-if="searchResult == null">
      Для просмотра ничего не найдено
    </section>
    <section v-else>
      <MoviesList :filmsArray="searchResult.films"/>
    </section>
    </div>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'

import axios from 'axios'

export default {
  name: 'SearchView',
  data () {
    return {
      searchResult: null,
      loading: false
    }
  },
  components: {
    MoviesList
  },
  computed: {
  },
  methods: {
    async searchFilms (query) {
      const apiKey = process.env.VUE_APP_KAU_KEY

      if (this.loading) { return }

      this.searchResult = null

      if (query === undefined) { return }

      this.loading = true

      try {
        const apiSection = 'v2.1/films/search-by-keyword'
        const apiUrl = `https://kinopoiskapiunofficial.tech/api/${apiSection}`
        const apiHeaders = {
          headers: { 'X-API-KEY': apiKey },
          params: { keyword: query, page: '1' }
        }
        const response = await axios.get(apiUrl, apiHeaders)
        this.searchResult = response.data
      } catch (err) {
        if (err.response) {
          console.log('Server Error:', err)
        } else if (err.request) {
          console.log('Network Error:', err)
        } else {
          console.log('Client Error:', err)
        }
      } finally {
        this.loading = false
      }
    }
  },
  setup () {
  },
  mounted () {
    this.searchFilms(this.$route.query.q)
  },
  beforeRouteUpdate (to, from, next) {
    next((instance) => {
      instance.$router.replace({
        name: from.name,
        params: from.params,
        query: to.query
      })
    })

    this.searchFilms(to.query.q)
  }
}
</script>

<style lang="scss">
</style>
