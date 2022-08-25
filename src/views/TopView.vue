<template>
    <div id="topView">
        <div class="container p-3">
            <section v-if="topResult == null">
                Идет загрузка данных...
            </section>
            <section v-else>
                <MoviesList :filmsArray="topResult.films" />
            </section>
        </div>
    </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'

import axios from 'axios'

export default {
  name: 'TopView',
  data () {
    return {
      topResult: null
    }
  },
  components: {
    MoviesList
  },
  computed: {
  },
  methods: {
    async loadFilms () {
      const apiKey = process.env.VUE_APP_KAU_KEY
      this.searchResult = null

      try {
        const apiSection = 'v2.2/films/top'
        const apiUrl = `https://kinopoiskapiunofficial.tech/api/${apiSection}`
        const apiHeaders = {
          headers: { 'X-API-KEY': apiKey },
          params: { type: 'TOP_250_BEST_FILMS', page: '1' }
        }
        const response = await axios.get(apiUrl, apiHeaders)
        this.topResult = response.data
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
    this.loadFilms()
  }
}
</script>

<style lang="scss">
</style>
