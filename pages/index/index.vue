<template>
  <div>
      <div class="bg">
          <img class="backgroundImage" mode="aspectFill" src="/static/images/home_bg_shadow.png" alt="">
      </div>
      <div class="content">
          <div class="title-group text-center">
              <div class="title mb-2">
                  <p class="cn">{{ cn_tit ? cn_tit : '' }}</p>
                  <p class="en">{{ en_tit ? en_tit : '' }}</p>
              </div>
              <div class="mb-3">
                  权威 | 专业 | 诚信
              </div>
          </div>
          <div class="btn-group text-center">
            <div class="btn b-btn btn-md" @click="goToTab" data-tab="/pages/schoolDatabase/main">
                <div style="display: inline">热门国际学校资料库</div>
                <img class="icon" src="/static/images/arrow.png" alt="">
            </div>
            <div class="btn b-btn btn-md" @click="goToTab" data-tab="/pages/internationalSchoolRankings/main">
                <div style="display: inline">热门国际学校排行榜</div>
                <img class="icon" src="/static/images/arrow.png" alt="">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { systemInfo } from '@/api/api.js'

export default {
    data () {
        return {
            cn_tit: '',
            en_tit: ''
        }
    },
    onLoad() {
        this.getLandingList()
    },
    methods: {
        getLandingList() {
            systemInfo().then(res => {
                this.cn_tit = res.data.list.find(val => val.key === 'landing_tit_cn').value
                this.en_tit = res.data.list.find(val => val.key === 'landing_tit_en').value
            })
        },
        goToTab(e) {
            console.log(e)
            uni.switchTab({url: e.currentTarget.dataset.tab})
        }
    },

    created () {
        // let app = getApp()
    }
}
</script>

<style scoped lang="scss">
    @import "../../acsset/style/common";
    .backgroundImage {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -100;
    }
    .content {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-group {
            color: #ffffff;
            .title{
                letter-spacing: 0.2em;
                font-weight: bold;
                font-size: $fontSize-xl;
                .en {
                    font-style: italic;
                    font-family: "Arial Narrow";
                }
            }
        }
        .b-btn {
            background-color: #010101;
            color: #fff;
            font-weight: 600;
            letter-spacing: 0.2em;
            display: flex;
            align-items: center;
            border-radius: 5px;
            margin-bottom: 10px;
            .icon{
                width: 1.2em;
            }
        }
    }
</style>
