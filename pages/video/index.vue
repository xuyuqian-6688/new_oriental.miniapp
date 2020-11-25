<template>
    <div>
        <navigation-bar></navigation-bar>
        <div class="m_container p-1" :style="{'padding-top':(menuButton.bottom + 10)+'px'}">
            <div class="mb-1">
                <div class="title">
                    视频专区
                </div>
            </div>
            <div class="mb-1">
                <search-input @input="searchVideo" :placeholder="placeholder"></search-input>
            </div>
            <div v-if="videoList.length" class="video-list">
                <div v-for="(item, index) in videoList"
                     :key="index"
                     :id="item.id">
                    <div class="mb-1">
                        <txv-video 
                            v-if="item.video_link"
                            v-show="idCurrent === item.id"
                            width="100%"
                            height="50vw"
                            :showCenterPlayBtn="false"
                            :vid="item.video_link"
                            :playerid="item.id"
                        >
                            <div v-show="idCurrent !== item.id" class="txv-video-slot cover" @click="bindPlay(item)">
                                <img class="cover-img" :src="item.image_url" mode="aspectFill">
                                <img class="play-btn" src="/static/images/play.png" alt="">
                            </div>
                        </txv-video>
                    </div>
                    <div class="mb-1">
                        <div class="sub-title mb-1">
                            {{ item.title }}
                        </div>
                        <div 
                            class="btn btn-tag"
                            v-for="(tag, idx) in item.tags"
                            :key="idx">
                            {{ tag.name }}
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

import {mapState} from "vuex";
import NavigationBar from "../../components/NavigationBar";
import SearchInput from '../../components/SearchInput'
import { searchVideo } from '@/api/api.js'

export default {
    components: {
        SearchInput,
        NavigationBar
    },

    data () {
        return {
            placeholder: '搜索视频标签关键字',
            keyword: '',
            videoList: [],
            idCurrent: '',
            page: 1
        }
    },
    mounted () {
        this.searchVideo(this.keyword, 1)
    },
    computed: {
        ...mapState(['menuButton'])
    },
    // 下拉刷新
    onPullDownRefresh() {
        uni.stopPullDownRefresh() // 解决无法回弹
        this.searchVideo(this.keyword, 1)
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
        this.searchVideo(this.keyword, this.page+1 )
    },
    methods: {
        searchVideo(val, page=1) {
            this.keyword = val
            uni.showLoading({
                title: '加载中'
            })
            searchVideo({ page, keyword: val }).then( res => {
                uni.hideLoading()
                if (page === 1) {
                    this.videoList = res.data.data
                } else {
                    if (res.data.data.length) {
                        this.videoList = this.videoList.concat(res.data.data)
                        this.page = page;
                    } else {
                        uni.showToast({
                            title: "没有更多数据了",
                            icon: "none",
                            duration: 2000,
                        });
                    }
                }
            }).catch( err => {
                console.log(err)
            })
        },
        bindPlay(item) {
            this.idCurrent = item.id
            const TxvContext = requirePlugin("tencentvideo")
            let txvContext = TxvContext.getTxvContext(item.id)
            txvContext.play()
        }
    }
}
</script>

<style scoped>
    .cover{
        position: relative;
        background: #000;
    }
    .play-btn{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        width: 4em;
        height: 4em;
    }
    .cover-img{
        width: 100%;
        height: 50vw;
        border-radius: 0.2em;
        box-shadow: 0 10px 10px rgba(214, 218,221, 0.5);
    }
</style>
