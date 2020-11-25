<template>
    <div>
        <navigation-bar
            :back-to-index="false"
            :back-to-last-page="true"
        ></navigation-bar>
        <div
            class="m_container p-1"
            :style="{'padding-top':(menuButton.bottom + 10)+'px'}"
        >
            <div class="contact">
                <button
                    class="contact-btn"
                    open-type="contact"
                    @contact="handleContact"
                >
                    <img
                        src="/static/images/contact.png"
                        alt=""
                    >
                </button>
            </div>
            <div class="school-img mb-1">
                <swiper
                    style="width: 100%; height: 15em;"
                    :indicator-dots="true"
                >
                    <block
                        v-for="(item, index) in detailList.image_url"
                        :key="index"
                    >
                        <swiper-item>
                            <img
                                mode="aspectFill"
                                :src="item.url"
                                alt=""
                            >
                        </swiper-item>
                    </block>
                </swiper>
            </div>
            <div class="title mb-1">
                <div class="title-middle black-highlight">
                    {{ detailList.cn_name ? detailList.cn_name : '' }}
                </div>
                <div class="color-grey">{{ detailList.en_name ? detailList.en_name : '' }}</div>
            </div>
            <div
                class="content color-grey mb-1"
                style="text-indent: 0;padding-bottom: 0.5em;"
            >
                <text space="ensp">{{ ellipsis === 'null' ? content :  ellipsis ? contentShow : content }}</text>
                <div
                    class="ellipsis_text flex-row align-center"
                    v-if="ellipsis === 'null' ? false : true"
                    @click="handleEllipsis"
                >
                    <text>{{ ellipsis ? '展开全文' : '收起全文' }}</text>
                    <img
                        class="icon"
                        :style="ellipsis ? 'transform: rotate(-90deg)' : 'transform: rotate(90deg)'"
                        src="/static/images/back.png"
                        alt
                    />
                </div>
                <div v-else style=""></div>
            </div>
            <div class="price mb-1">
                <div class="black-highlight">学费</div>
                <div
                    class="color-grey"
                    v-if="detailList.min_price"
                >{{ detailList.max_price ? detailList.min_price/10000 + ' - ' + detailList.max_price/10000 + '万/年' : detailList.min_price/10000 + '万/年' }}
                </div>
                <div
                    class="color-grey"
                    v-else
                >暂无
                </div>
            </div>
            <div class="flex-row mb-1">
                <div class="mr-1 mw-50">
                    <div class="black-highlight">户籍要求</div>
                    <div class="color-grey">
                        <template v-if="detailList.census_register && detailList.census_register.length">
                            <text v-for="(item, index) in detailList.census_register" :key="index">{{ detailList.census_register.length>1&&index!==0 ? '，' : '' }}{{ item.name }}</text>
                        </template>
                        <text v-else>暂无</text>
                    </div>
                </div>
                <div class="mw-50">
                    <div class="black-highlight">招收国籍</div>
                    <div class="color-grey">
                        <template v-if="detailList.nationality && detailList.nationality.length">
                            <text v-for="(item, index) in detailList.nationality" :key="index">{{ detailList.nationality.length>1&&index!==0 ? '，' : '' }}{{ item.name }}</text>
                        </template>
                        <text v-else>暂无</text>
                    </div>
                </div>
            </div>
            <div class="characteristic mb-1">
                <div class="black-highlight">办学特色</div>
                <div class="tag-box">
                    <div
                        class="btn btn-tag"
                        v-for="(tag, index) in detailList.tags"
                        :key="index"
                    >
                        {{ tag.name }}
                    </div>
                </div>
            </div>
            <div
                class="case-list characteristic mb-1"
                v-if="detailList.sch_case !== undefined && detailList.sch_case.length"
            >
                <div class="mb-1 black-highlight">成功案例</div>
                <div
                    class="case-item mb-2"
                    v-for="(item, index) in detailList.sch_case"
                    :key="index"
                >
                    <div class="flex-row">
                        <div class="head-img mr-1">
                            <img
                                mode="aspectFill"
                                :src="item.head_img"
                                alt=""
                            >
                        </div>
                        <div class="flex-1">
                            <div class="font-bold mb-1">
                                {{ item.title }}
                            </div>
                            <div class="color-grey">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="article-list"
                v-if="detailList.sch_gzh_article !== undefined && detailList.sch_gzh_article.length"
            >
                <div class="mb-1 black-highlight">更多介绍</div>
                <div
                    class="article-item mb-2"
                    v-for="(item, index) in detailList.sch_gzh_article"
                    :key="index"
                    @click="goTweet(item.gzh_link)"
                >
                    <div class="flex-row justify-between">
                        <div class="flex-1 article-title color-grey mr-1">
                            {{ item.title }}
                        </div>
                        <div class="article-img">
                            <img
                                mode="aspectFill"
                                :src="item.article_img"
                                alt=""
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import NavigationBar from '../../components/NavigationBar'
    import { schoolDetail } from '@/api/api.js'

    export default {
        components: {
            NavigationBar,
        },

        data() {
            return {
                detailList: {},
                content: '', // 完整的学校详情
                contentShow: '', // 显示的学校详情
                maxLength: 150, // 收起时最大显示文字长度
                ellipsis: 'null', // 是否收起
            }
        },
        computed: {
            ...mapState(['menuButton']),
        },
        created() {

        },
        mounted() {
            this.resetData()
            this.getDeatil(this.$root.$mp.query.id)
        },
        methods: {
            resetData() {
                this.detailList = {},
                this.content = '', // 完整的学校详情
                this.contentShow = '', // 显示的学校详情
                this.maxLength = 150, // 收起时最大显示文字长度
                this.ellipsis = 'null' // 是否收起
            },
            getDeatil(id) {
                uni.showLoading({
                    title: '加载中',
                })
                schoolDetail({ id: id }).then(res => {
                    uni.hideLoading()
                    this.detailList = res.data
                    let content = res.data.sch_info.introduce ? res.data.sch_info.introduce.replace(/↵/g, '\n') : ''
                    this.content = content
                    if (content && content.length > this.maxLength) {
                        this.ellipsis = true
                        this.contentShow = content.substring(0, this.maxLength) + '...'
                    } else {
                        this.ellipsis = 'null'
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 控制是否展开全文
            handleEllipsis() {
                this.ellipsis = !this.ellipsis
            },
            // 公众号文章跳转
            goTweet(link) {
                uni.navigateTo({ url: '/pages/tweet/main?link=' + link })
            },
        },
    }
</script>

<style>
    .school-img img {
        width: 100%;
        border-radius: 0.2em;
    }

    .mw-50 {
        max-width: 50%;
    }
    .black-highlight {
        color: black;
        font-weight: bold;
    }
    .content {
        text-indent: 2em;
        /* padding-bottom: 1em; */
        border-bottom: 1px solid #dedede;
    }

    .tag-box {
        margin-top: 0.3em;
    }

    .ellipsis_text {
        text-indent: 0;
        color: #000000;
        width: 100%;
        justify-content: center;
    }

    .ellipsis_text text {
        margin-right: 0.3em;
    }

    .characteristic {
        border-bottom: 1px solid #dedede;
    }

    .head-img {
        width: 5em;
        height: 5em;
        border-radius: 2.5em;
        overflow: hidden;
    }

    .head-img img {
        width: 100%;
        height: 100%;
    }

    .article-title {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .article-img {
        width: 5em;
        height: 3em;
        overflow: hidden;
    }

    .article-img img {
        width: 100%;
        height: 100%;
    }

    .contact {
        position: fixed;
        right: 0.5em;
        top: 75%;
        transform: translateY(-50%);
        z-index: 999;
    }

    .contact-btn {
        width: 2em;
        height: 2em;
        border-radius: 50%;
        background-color: #000000;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .contact-btn img {
        width: 70%;
        height: 70%;
    }
</style>
