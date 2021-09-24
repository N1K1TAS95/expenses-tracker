import {createStore} from 'vuex'

export default createStore({
    state: {
        language: 'en'
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('language')) {
                state.language = localStorage.getItem('language')
            } else {
                state.language = 'en'
            }
        },
        setLanguage(state, language) {
            state.language = language
        },
        resetLanguage(state) {
            state.language = 'en'
        }
    },
    actions: {},
    modules: {}
})
