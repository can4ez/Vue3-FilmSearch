<template>
    <div class="movieCard column is-3" v-on:click="handleClick">

        <div class="card p-0">
            <div class="card-image">
                <figure class="image is-4by5">
                    <img :src="film.posterUrlPreview" alt="">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <!-- <div class="media-left">
                    </div> -->
                    <div class="media-content">
                        <p class="title is-4">{{ film.nameRu }}</p>
                        <p class="subtitle is-6">{{ film.year }}</p>
                    </div>
                </div>

                <div class="content description" v-if="film.description !== undefined">
                    {{ film.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    film: null,
    isFavorite: Boolean(false)
  },
  components: {},
  computed: {
  },
  methods: {
    handleClick: function (e) {
      this.$router.push({ name: 'movie', query: { id: this.film.filmId } })
    }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.card {
    box-shadow: -1px 3px 10px 0 rgb(0 0 0 / 6%);
    transition: transform 1s ease;
}
.card:hover{
    transform: scale(1.02);
}
.media{
    height: 5rem;
}
.description{
    height: 15rem;
    overflow: hidden;
}
</style>
