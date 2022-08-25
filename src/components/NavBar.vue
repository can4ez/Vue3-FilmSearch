<template>
    <nav class="navbar p-0" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBlock"
                @click="toggleActive">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBlock" class="navbar-menu">
            <div class="navbar-start">
                <router-link :to="{ name: 'home'}" class="navbar-item">
                    Главная
                </router-link>
                <router-link :to="{ name: 'top'}" class="navbar-item">
                    ТОП-250
                </router-link>
                <router-link :to="{ name: 'favorites'}" class="navbar-item">
                    Избранное
                </router-link>
                <router-link :to="{ name: 'search'}" class="navbar-item">
                    Поиск
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input
                                class="input"
                                type="search"
                                placeholder="Найти фильмец..."
                                v-model="searchTxt"/>
                        </p>
                        <div class="control">
                            <button class="button is-primary"
                            v-on:click="doSearch">
                                <font-awesome-icon icon="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      searchTxt: null
    }
  },
  components: {},
  computed: {},
  methods: {
    toggleActive: function (event) {
      const targetID = event.target.dataset.target
      const target = document.getElementById(targetID)
      event.target.classList.toggle('is-active')
      target.classList.toggle('is-active')
    },
    doSearch: function (event) {
      if (this.$router.currentRoute.value.name === 'search') {
        this.$router.replace({ name: 'search', query: { q: this.searchTxt } })
      } else {
        this.$router.push({ name: 'search', query: { q: this.searchTxt } })
      }
    }
  },
  mounted () { }
}
</script>

<style lang="scss">
</style>
