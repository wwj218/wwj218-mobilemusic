import { createStore } from 'vuex'
import api from '@/api/index'


export default createStore({
    state: {
        playlist: [{
            name: '楼顶上的小斑鸠',
            id: 1872132205,
            al: {
                id: 85144971,
                name: "查无此人",
                pic: 109951166314523220,
                picUrl: "http://p4.music.126.net/jbdB1pF_LVYgMn5zBL7Qdg==/109951166314523218.jpg",
                pic_str: "109951166314523218"
            }
        }],
        playCurrentIndex: 0,
        lyric: '',
        currentTime: 0,
        intervalId: 0,
        // 用户的信息
        user: {
            isLogin: false,
            account: {},
            detail: {}
        }
    },
    getters: {
        lyricList: function(state) {
            let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
                let min = parseInt(item.slice(1, 3))
                let sec = parseInt(item.slice(4, 6))
                let mill = parseInt(item.slice(7, 10))
                return {

                    min,
                    sec,
                    mill,
                    lyric: item.slice(11, item.length),
                    content: item,
                    time: mill + sec * 1000 + min * 60 * 1000
                }
            })
            arr.forEach((item, i) => {
                if (i == 0) {
                    item.pre = 0
                } else {
                    item.pre = arr[i - 1].time
                }
            })

            return arr
        }
    },

    mutations: {
        setPlaylist: function(state, value) {
            state.playlist = value
        },
        pushPlaylist: function(state, value) {
            state.playlist.push(value)
        },
        setPlayIndex(state, value) {
            state.playCurrentIndex = value
        },
        setLyric(state, value) {
            state.lyric = value
        },
        setCurrentTime(state, value) {
            state.currentTime = value
        },
        setUser(state, value) {
            state.user = value
        }

    },
    actions: {
        async reqLyric(content, payload) {
            let { data: res } = await api.getLyric(payload.id)
            content.commit('setLyric', res.lrc.lyric)
        },
        // 获取登录信息
        async Login(content, payload) {
            let { data: res } = await api.phoneLogin(payload.phone, payload.password)
            if (res.code == 200) {
                content.state.user.isLogin = true
                content.state.user.account = res.account
                let userDetail = await api.userDetail(content.state.user.account.id)
                content.state.user.detail = userDetail.data
                localStorage.userData = JSON.stringify(content.state.user)
                content.commit('setUser', content.state.user)
            }
            return res
        },
    },
    modules: {}
})