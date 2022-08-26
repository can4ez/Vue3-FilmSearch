<template>
  <!-- Главная страница -->
  <div id="homeView">
    <!-- Баннер любого фильма -->
    <div class="container is-fluid  p-0" v-if="film !== null">
      <!--  -->
      <section class="hero is-fullheight" @click="handleClickBanner">
        <a class="hero-body home">
          <p class="title">
            {{ film['nameRu'] }}
          </p>
          <p class="">
            Предназначение сервиса — помочь пользователю выбрать фильм для просмотра.<br />
            Сервис поможет легко и быстро найти российские или зарубежные фильмы для взрослых и детей в интересующих
            жанрах.
          </p>
        </a>
        <div class="poster">
          <img :src="film['posterUrl']" alt="" class="poster-shadow">
          <img :src="film['posterUrl']" alt="" class="poster-img">
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
const apiKey = process.env.VUE_APP_KAU_KEY

export default {
  /* eslint-disable */
  name: 'HomeView',
  data() {
    return {
      film: null
    }
  },
  components: {
  },
  computed: {},
  methods: {
    async loadRandomFilm() {
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
        console.log(this.film)
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
    handleClickBanner() {
      this.$router.push({ name: 'movie', query: { id: this.film.filmId } })
    }
  },
  mounted() {
    this.loadRandomFilm()
  }
}
</script>

<style lang="scss" scoped>
#homeView .hero {
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: space-around;
  align-items: stretch;
  padding: 25px;
  cursor: pointer;
}

#homeView .hero .hero-body {
  // justify-content: center;
  // background: #00000063;
}

#homeView .hero .hero-body .title {
  color: #000;
  font-size: 400%;
}

.text-block {
  font-size: 130%;
}

.hero-body.home {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background: linear-gradient(to right, #000 60%, #00000063) !important;
  color: #000;
  max-width: 50%;
}

@media screen and (max-width:1280px) {
  #homeView .hero {
    flex-wrap: wrap-reverse;
  }

  .hero-body.home {
    max-width: 100%;
  }
}

.hero-body.home p {
  // max-width: 60%;
}

.poster {
  position: relative;
  max-width: 80%;
  min-width: 30%;
  max-height: 80vh;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.poster img {
  width: auto;
  max-height: 100%;
  border-radius: 9px;
}

img.poster-shadow {
  position: absolute;
  transform: scale(1.02);
  filter: blur(10px);
}

img.poster-img {
  position: relative;
}
</style>
