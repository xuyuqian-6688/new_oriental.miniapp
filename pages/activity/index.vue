<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="m_container p-1" :style="{'padding-top':(menuButton.bottom + 10)+'px'}">
            <div class="mb-1 flex-row justify-between align-center">
                <div class="title">活动专区</div>
                <div class="classify">
                    <div class="flex-row align-center" @click="dropDownVisible = !dropDownVisible">
                        <div class="mr-1">{{ type === 1 ? '近期活动' : '往期活动' }}</div>
                        <img class="icon" src="/static/images/arrow-bottom.png" alt="">
                    </div>
                    <div v-if="dropDownVisible" class="dropDown">
                        <div class="dropDown-item" @click="checkType(1)">
                            近期活动
                        </div>
                        <div class="dropDown-item" @click="checkType(0)">
                            往期活动
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-1">
                <search-input @input="searchSchool" :placeholder="placeholder"></search-input>
            </div>
            <div v-if="activityList.length" class="activity-list">
                <div v-for="(item, index) in activityList" :key="index" class="activity-item mb-1">
                    <img class="activity-img mb-1" mode="aspectFill" :src="item.image_url ? item.image_url :''" alt="活动封面">
                    <div class="flex-row align-center">
                        <div class="flex-1 mr-1">
                            <div class="sub-title">
                                {{ item.name }}
                            </div>
                            <div class="color-grey">
                                活动时间： {{ item.start_time  }}
                            </div>
                        </div>
                        <div>
                            <button v-if="!hasUserInfo" class="btn btn-primary btn-sm" open-type="getUserInfo" @getuserinfo="getUserInfo" :data-id="item.id">预约</button>
                            <button v-else-if="!item.user.length && type!==0" class="btn btn-primary btn-sm" :id="item.id" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">预约</button>
                            <button v-else class="btn btn-primary btn-sm" :class="{'expired' : type === 0 || item.user.length }">{{ item.user.length ? '已预约' : '已过期' }}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="text-align: center">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from "../../components/NavigationBar";
import SearchInput from '../../components/SearchInput'
import {mapState} from "vuex";
import { searchActivity, activityBooking } from '@/api/api.js'
import { login } from '@/api/api.js'

export default {
    components: {
        SearchInput,
        NavigationBar
    },
    data () {
        return {
            placeholder: '搜索活动名称',
            keyword: '',
            activityList: [],
            dropDownVisible: false,
            type: 1, // 0是往期 其他默认是近期
            page: 1,
        }
    },
    computed: {
        ...mapState(['menuButton', 'hasUserInfo'])
    },
    mounted () {
        this.getList(1, this.type, this.keyword)
    },
    // 下拉刷新
    onPullDownRefresh() {
        uni.stopPullDownRefresh() // 解决无法回弹
        this.getList(1, this.type, this.keyword)
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
        this.getList(this.page+1, this.type, this.keyword)
    },
    methods: {
        getList(page, activity_time, name) {
            uni.showLoading({
                title: '加载中'
            })
            searchActivity({page, activity_time, name: name }).then( res => {
                uni.hideLoading()
                this.type = activity_time
                if (page === 1) {
                    this.activityList = res.data.data.map( item => {
                        item.start_time = new Date(item.start_time*1000).toLocaleDateString()
                        return item
                    })
                } else {
                    if (res.data.data.length) {
                        const temp = res.data.data.map( item => {
                        item.start_time = new Date(item.start_time*1000).toLocaleDateString()
                            return item
                        })
                        this.page = page
                        this.activityList = this.activityList.concat(temp)
                    } else {
                        uni.showToast({
                            title: '没有更多数据了',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            }).catch( err => {
                console.log(err)
            })
        },
        searchSchool(val) {
            this.keyword = val
            this.getList(1, this.type, val)
        },
        getUserInfo(e) {
            const that = this
            uni.login({
                success (res) {
                    if (res.code) {
                        if (e.mp.detail.userInfo) {
                            // 用户按了允许授权按钮
                            const userInfo = e.mp.detail.userInfo
                            uni.showLoading({title: '登录中'})
                            login({
                                code: res.code,
                                nickname: userInfo.nickName,
                                avatar: userInfo.avatarUrl,
                                country: userInfo.country,
                                province: userInfo.province,
                                city: userInfo.city,
                                gender: userInfo.gender,
                                language: userInfo.language
                            }).then( res => {
                                uni.hideLoading()
                                // 保存access_token
                                that.$store.state.access_token = res.data.access_token
                                uni.setStorageSync('access_token', res.data.access_token)
                                that.$store.state.hasUserInfo = true
                                uni.setStorageSync('has_user_info', true)
                            }).catch( err => {
                                console.log(err)
                            })
                        } else {
                            // 用户按了拒绝按钮
                            uni.showModal({
                                title: '提示',
                                content: '为了更好的用户体验，请同意授权！',
                                showCancel: false,
                                confirmText: '返回授权',
                                success: function(res) {
                                    if (res.confirm) {
                                        console.log('用户点击了“返回授权”')
                                    }
                                }
                            })
                        }
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        getPhoneNumber(e) {
            const that = this
            // 判断登录态
            uni.checkSession({
                success () {
                    console.log('session_key 未过期')
                    //session_key 未过期，并且在本生命周期一直有效
                },
                fail () {
                    console.log('session_key 已经失效')
                    // session_key 已经失效，需要重新执行登录流程
                    uni.login({
                        success (res) {
                            if (res.code) {
                                // 保存code
                                that.$store.state.code = res.code
                                uni.setStorageSync('code', res.code)
                                // 登录 更新后端session_key
                                login({ 
                                    code: res.code
                                }).then( res => {
                                    // 保存access_token
                                    that.$store.state.access_token = res.data.access_token
                                    uni.setStorageSync('access_token', res.data.access_token)
                                }).catch( err => {
                                    console.log(err)
                                })
                            } else {
                                console.log('登录失败！' + res.errMsg)
                            }
                        }
                    })
                },
                complete () {
                    if (e.mp.detail.encryptedData) {
                        activityBooking({
                            activity_id: e.mp.target.id,
                            encryptedData: e.mp.detail.encryptedData,
                            iv: e.mp.detail.iv
                        }).then( res => {
                            that.getList(1, that.type, that.keyword)
                            uni.showToast({
                                title: '预约成功',
                                icon: 'success'
                            })
                        }).catch( err => {
                            console.log(err)
                        })
                    } else {
                        // 用户按了拒绝按钮
                        uni.showModal({
                            title: '警告',
                            content: '您点击了拒绝，将无法预约活动，请允许之后再预约!!!',
                            showCancel: false,
                            confirmText: '返回预约',
                            success: function(res) {
                                if (res.confirm) {
                                    console.log('用户点击了“返回预约”')
                                }
                            }
                        })
                    }
                }
            })
        },
        checkType(type) {
            this.dropDownVisible = false
            this.getList(1, type, this.keyword)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../acsset/style/common";

    .activity-img{
        width: 100%;
        border-radius: 0.2em;
        box-shadow: 0 10px 10px rgba(214, 218,221, 0.5);
    }
    .classify{
        position: relative;
    }
    .dropDown{
        position: absolute;
        width: 120%;
        right: 0;
        top: 1.7em;
        background-color: #ffffff;
        box-shadow: 0 10px 10px rgba(214, 218,221, 0.5);
        border-radius: 0.1em;
        padding: 0.5em;
        z-index: 999999;
    }
    .dropDown-item{
        text-align: center;
        padding: 0.7em 0;
    }
    .dropDown-item:nth-child(1) {
        border-bottom: 1px solid $black;
    }
    .expired {
        background: #eee;
        color: #4A4A4A;
        border: 1px solid #4A4A4A;
    }
</style>
