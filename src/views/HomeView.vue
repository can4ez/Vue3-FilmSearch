<template>
    <!-- Главная страница -->
    <div id="homeView">
        <!-- Баннер любого фильма -->
        <div class="container is-fluid  p-0" v-if="film !== null">
            <!--  -->
            <section
                class="hero is-fullheight"
                :style="{ 'background-image': `url(${film['posterUrl']})` }">
                <a class="hero-body" @click="handleClickBanner">
                    <p class="title">
                    {{film['nameRu']}}
                    </p>
                </a>
            </section>
        </div>
        <!-- Текстовый блок с информацией о сайте -->
        <div class="container is-fluid  p-0 text-block">
            <!--  -->
            <section class="hero   is-info is-fullheight">
              <div class="hero-body">
                <p class="">
                  Предназначение сервиса — помочь пользователю выбрать фильм для просмотра.<br/>
                  Сервис поможет легко и быстро найти российские или зарубежные фильмы для взрослых и детей в интересующих жанрах.
                </p>
              </div>
            </section>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
const apiKey = process.env.VUE_APP_KAU_KEY

export default {
  name: 'HomeView',
  data () {
    return {
      film: null
    }
  },
  components: {
  },
  computed: {},
  methods: {
    async loadRandomFilm () {
      if (this.film !== null) { return }

      try {
        const apiSection = 'v2.2/films/top'
        const apiUrl = `https://kinopoiskapiunofficial.tech/api/${apiSection}`
        const apiHeaders = {
          headers: { 'X-API-KEY': apiKey },
          params: { type: '', page: '1' }
        }
        const response = await axios.get(apiUrl, apiHeaders)
        this.film = response.data.films[response.data.films.length * Math.random() | 0]
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
      }
    },
    handleClickBanner () {
      this.$router.push({ name: 'movie', query: { id: this.film.filmId } })
    }
  },
  mounted () {
    this.loadRandomFilm()
  }
}
</script>

<style lang="scss" scoped>
#homeView .hero{
    background-repeat: no-repeat;
    background-size: cover;
}
#homeView .hero .hero-body{
    // justify-content: center;
 background: #00000063;
}
#homeView .hero .hero-body .title{
    color: #fff;
    font-size: 400%;
}
.text-block{
    font-size: 200%;
}
</style>
