import { createStore } from 'vuex'

export default createStore({
  state: {
    favorites: null
  },
  getters: {
    getFavorites (state) {
      if (state.favorites == null) {
        state.favorites = []
        if (localStorage.getItem('favorites')) {
          try {
            state.favorites = JSON.parse(localStorage.getItem('favorites'))
          } catch (e) {
            localStorage.removeItem('favorites')
          }
        }
      }
      return state.favorites
    }
  },
  mutations: {
    ADD_FAVORITE: function (state, payload) {
      payload.filmId = payload.kinopoiskId
      state.favorites.push(payload)

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    REMOVE_FAVORITE: function (state, payload) {
      state.favorites.splice(state.favorites.indexOf(payload), 1)

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  },
  actions: {
  }
})
