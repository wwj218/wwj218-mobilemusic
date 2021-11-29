import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Icon, Tab, Tabs, NavBar, Swipe, SwipeItem, Search, Dialog } from 'vant';

const app = createApp(App)
app.use(store).use(router).use(NavBar).use(Icon).use(Tab).use(Tabs).use(Swipe)
    .use(SwipeItem).use(Search).use(Dialog).mount('#app')