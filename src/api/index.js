import axios from 'axios'

let baseUrl = 'http://music.cpengx.cn'

export function getPlaylistDetail(id) {
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}
//获取歌词
export function getLyric(id) {
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}
//搜索歌曲
export function searchMusic(keyword) {
    return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}
//手机登录
export function phoneLogin(phone, password) {
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`)
}
//获取用户详情
export function userDetail(uid) {
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`)
}
//获取推荐歌单
export function getMusicList(num) {
    return axios.get(`${baseUrl}/personalized?limit=${num}`)
}
//轮播图
// type: 资源类型, 对应以下类型, 默认为 0 即PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
export function getSwiper(type) {
    return axios.get(`${baseUrl}/banner?type=${type}`)
}
export function getMvList(offset) {
    return axios.get(`${baseUrl}/top/mv?limit=${offset}`)
}
export default {
    getPlaylistDetail,
    getLyric,
    searchMusic,
    phoneLogin,
    userDetail,
    getMusicList,
    getSwiper,
    getMvList
}