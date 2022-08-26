<template>
  <div id="movieView">
    <div class="container p-6">
      <section class="columns is-multiline " v-if="filmData !== null">
        <div class="column is-4">
          <figure class="image is-4by6">
            <img :src="filmData.posterUrlPreview" alt="" class="poster-shadow">
            <img :src="filmData.posterUrlPreview" alt="" class="poster-img">
          </figure>
        </div>
        <div class="column is-8 is-justify-content-left">
          <div class="columns">
            <div class="column ">
              <h2 class="nameRu">{{ filmData.nameRu }} ({{ filmData.year }})</h2>
              <div class="nameOriginal ">{{ filmData.nameOriginal }}</div>
            </div>
            <div class="column is-half">
              <FavoriteBtn :filmData="filmData" />
            </div>
          </div>
          <div class="table-container">
            <h3 class="">О фильме</h3>
            <table class="table">
              <tbody>
                <tr v-if="filmData.year">
                  <td>Год производства</td>
                  <td>{{ filmData.year }}</td>
                </tr>
                <tr v-if="filmData.countries">
                  <td>Страна</td>
                  <td>{{ countries }}</td>
                </tr>
                <tr v-if="filmData.genres">
                  <td>Жанр</td>
                  <td>{{ genres }}</td>
                </tr>
                <!-- v1/staff/{{filmData.filmId}} -->
                <!-- <tr><td>Режиссер</td><td></td></tr>
                        <tr><td>Сценарий</td><td></td></tr>
                        <tr><td>Продюсер</td><td></td></tr>
                        <tr><td>Оператор</td><td></td></tr>
                        <tr><td>Композитор</td><td></td></tr>
                        <tr><td>Художник</td><td></td></tr>
                        <tr><td>Монтаж</td><td></td></tr> -->
                <!-- v2.2/films/{{filmData.filmId}}/box_office -->
                <!-- <tr><td>Бюджет</td><td></td></tr>
                        <tr><td>Маркетинг</td><td></td></tr>
                        <tr><td>Сборы в США</td><td></td></tr>
                        <tr><td>Сборы в мире</td><td></td></tr>
                        <tr><td>Премьера в Росcии</td><td></td></tr>
                        <tr><td>Премьера в мире</td><td></td></tr>
                        <tr><td>Ре-релиз (РФ)</td><td></td></tr>
                        <tr><td>Релиз на DVD</td><td></td></tr>
                        <tr><td>Релиз на Blu-ray</td><td></td></tr> -->
                <!--  -->
                <tr v-if="filmData.ratingAgeLimits">
                  <td>Возраст</td>
                  <td>{{ age }}+</td>
                </tr>
                <tr v-if="filmData.ratingMpaa">
                  <td>Рейтинг MPAA</td>
                  <td>{{ filmData.ratingMpaa.toUpperCase() }}</td>
                </tr>
                <tr v-if="filmData.filmLength">
                  <td>Время</td>
                  <td>{{ filmData.filmLength }} мин.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="description">
            <h3>Обзор</h3>
            {{ filmData.description }}
          </div>
        </div>
      </section>
      <section v-else-if="loading">
        Информация загружается...
      </section>
      <section v-else>
        Фильм не найден...
      </section>
    </div>
  </div>
</template>

<script>
import FavoriteBtn from '@/components/FavoriteBtn.vue'
import axios from 'axios'
/* eslint-disable */
export default {
  name: 'MovieView',
  data() {
    return { filmData: null, loading: Boolean(false) }
  },
  components: {
    FavoriteBtn
  },
  computed: {
    countries: function () {
      return this.filmData.countries.map((e) => { return e.country }).join(', ')
    },
    genres: function () {
      return this.filmData.genres.map((e) => { return e.genre }).join(', ')
    },
    age: function () {
      return this.filmData.ratingAgeLimits.replace('age', '')
    }
  },
  methods: {
    addFavorite: function () {
      this.$store.commit('ADD_FAVORITE', this.filmData)
    },
    removeFavorite: function () {
      this.$store.commit('REMOVE_FAVORITE', this.filmData)
    },
    loadFilmData: async function (filmId) {
      if (this.filmData !== null && this.filmData.filmId === filmId) { return }

      const apiKey = process.env.VUE_APP_KAU_KEY

      if (this.loading) { return }

      this.filmData = null

      if (filmId === undefined) { return }

      this.loading = true

      try {
        const apiSection = `v2.2/films/${filmId}`
        const apiUrl = `https://kinopoiskapiunofficial.tech/api/${apiSection}`
        const apiHeaders = {
          headers: { 'X-API-KEY': apiKey }
        }
        const response = await axios.get(apiUrl, apiHeaders)
        // kinopoiskId => filmId
        response.data.filmId = response.data.kinopoiskId
        this.filmData = response.data
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('Server Error:', err)
        } else if (err.request) {
          // client never received a response, or request never left
          console.log('Network Error:', err)
        } else {
          console.log('Client Error:', err)
        }
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loadFilmData(this.$route.query.id)
  },
  beforeRouteUpdate(to, from, next) {
    this.loadFilmData(to.query.id)
  }
}
</script>

<style lang="scss" scoped>
.table td {
  padding-left: 0;
}

h3,
h2 {
  font-size: 120%;
  font-weight: bold;
}

figure.image.is-4by6 {
  position: relative;
}

figure.image.is-4by6 img {
  border-radius: 9px;
}

.poster img {
  width: auto;
  max-height: 100%;
  border-radius: 9px;
}

img.poster-img {
  position: relative;
}

img.poster-shadow {
  position: absolute;
  transform: scale(1.02);
  filter: blur(10px);
}
</style>
