import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    authenticated: [],
    userDetails: {},
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', path: '/home', color: 'primary' },
      { title: 'Employee', icon: 'mdi-account', path: '/employee', color: 'primary' },
      { title: 'Projects', icon: 'mdi-playlist-check', path: '/project', color: 'primary' },
      { title: 'Hours', icon: 'mdi-clock', path: '/hours', color: 'primary' },
      { title: 'View Profile', icon: 'mdi-account-edit', path: '/viewProfile', color: 'primary' },
      { title: 'List', icon: 'mdi-account-edit', path: '/list', color: 'primary' },
      { title: 'List1', icon: 'mdi-account-edit', path: '/list1', color: 'primary' },
      { title: 'List2', icon: 'mdi-account-edit', path: '/list2', color: 'primary' },
      { title: 'List3', icon: 'mdi-account-edit', path: '/list3', color: 'primary' },
      { title: 'Members', icon: 'mdi-account-multiple-plus', path: '/members', color: 'primary' },
      { title: 'Activity', icon: 'mdi-clock-out', path: '/activity', color: 'primary' },
      { title: 'Calender', icon: 'mdi-calendar', path: '/calender', color: 'primary' },
      { title: 'Quiz', icon: 'mdi-calendar', path: '/quiz', color: 'primary' }
    ]
  },
  mutations: {
    curUserDetais (state, payload) {
      state.userDetails = payload
    }
  },
  getters: {
    userDetails (state) {
      return state.userDetails
    },
    hideList (state) {
      let Listitem = []
      if (state.userDetails.admin === false) {
        Listitem = state.items.filter(item => item.title === 'Home' || item.title === 'Projects' || item.title === 'View Profile' || item.title === 'Activity' || item.title === 'Calender')
        return Listitem
      } else {
        Listitem = state.items.filter(item => item.title !== 'View Profile')
        return Listitem
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
