<template>
    <div>
        <navigation-bar></navigation-bar>
        <div
            class="m_container"
            :style="{ 'padding-top': menuButton.bottom + 10 + 'px' }"
        >
            <div class="pb-1 p-lr-1 bg-fff">
                <span class="title">国际学校排行</span>
            </div>
            <div class="flex-row p-lr-1 bg-fff">
                <div class="flex-1">
                    <search-input
                        @input="handleSearchSchool"
                        :placeholder="placeholder"
                    ></search-input>
                </div>
            </div>
            <div
                class="classify-area bg-fff"
                :class="{ fixed: isFixedTop ? true : false }"
                :style="{ top: menuButton.bottom + 10 + 'px' }"
            >
                <div class="btn-area">
                    <div
                        class="conditions"
                        @click="handleConditionChange('意向国家')"
                    >
                        <span>{{
                            currCountryObj.name
                                ? currCountryObj.name
                                : "意向国家"
                        }}</span>
                        <span class="triangle"></span>
                    </div>
                    <div
                        class="conditions"
                        @click="handleConditionChange('招生年级')"
                    >
                        <span>{{
                            currRecruitObj.name
                                ? currRecruitObj.name
                                : "招生年级"
                        }}</span>
                        <span class="triangle"></span>
                    </div>
                    <div
                        class="conditions"
                        @click="handleConditionChange('开设课程')"
                    >
                        <span>{{
                            currMajorObj.name ? currMajorObj.name : "开设课程"
                        }}</span>
                        <span class="triangle"></span>
                    </div>
                    <div
                        class="conditions"
                        @click="handleConditionChange('学费')"
                    >
                        <span>{{
                            currPriceObj.text ? currPriceObj.text : "学费"
                        }}</span>
                        <span class="triangle"></span>
                    </div>
                </div>

                <div class="drop-area" v-show="dropAreaShow">
                    <div
                        class="drop-content"
                        v-show="dropAreaStatus === '意向国家'"
                    >
                        <div class="tag-btn-box">
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active': currCountryObj.city_id
                                        ? false
                                        : true,
                                }"
                                @click="countryBtnChange({})"
                            >
                                全部
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currCountryObj.city_id === item.city_id,
                                }"
                                v-for="(item, index) in countryTags"
                                :key="index"
                                @click="countryBtnChange(item)"
                            >
                                {{ item.name }}
                            </div>
                            <picker
                                class="tag-btn"
                                header-text="国家选择"
                                @change="countryPickerChange"
                                :value="currCountryIndex"
                                :range="countryData"
                                range-key="name"
                            >
                                更多国家
                            </picker>
                        </div>
                    </div>
                    <div
                        class="drop-content"
                        v-show="dropAreaStatus === '招生年级'"
                    >
                        <div class="tag-btn-box">
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active': currRecruitObj.id
                                        ? false
                                        : true,
                                }"
                                @click="recruitBtnChange({})"
                            >
                                全部
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currRecruitObj.id === item.id,
                                }"
                                v-for="(item, index) in recruitTags"
                                :key="index"
                                @click="recruitBtnChange(item)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="drop-content"
                        v-show="dropAreaStatus === '开设课程'"
                    >
                        <div class="tag-btn-box">
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active': currMajorObj.id
                                        ? false
                                        : true,
                                }"
                                @click="majorBtnChange({})"
                            >
                                全部
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currMajorObj.id === item.id,
                                }"
                                v-for="(item, index) in majorTags"
                                :key="index"
                                @click="majorBtnChange(item)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="drop-content"
                        v-show="dropAreaStatus === '学费'"
                    >
                        <div class="tag-btn-box">
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active': currPriceObj.text
                                        ? false
                                        : true,
                                }"
                                @click="priceBtnChange({})"
                            >
                                全部
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currPriceObj.min_price === 0,
                                }"
                                @click="
                                    priceBtnChange({
                                        min_price: 0,
                                        max_price: 100000,
                                        text: '10万以下',
                                    })
                                "
                            >
                                10万以下
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currPriceObj.min_price === 100000,
                                }"
                                @click="
                                    priceBtnChange({
                                        min_price: 100000,
                                        max_price: 200000,
                                        text: '10-20万',
                                    })
                                "
                            >
                                10-20万
                            </div>
                            <div
                                class="tag-btn"
                                :class="{
                                    'tag-btn-active':
                                        currPriceObj.min_price === 200000,
                                }"
                                @click="
                                    priceBtnChange({
                                        min_price: 200000,
                                        max_price: 300000,
                                        text: '20-30万',
                                    })
                                "
                            >
                                20-30万
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-list" v-if="schools.length">
                <div
                    class="wrapper"
                    v-for="(item, index) in schools"
                    :key="index"
                >
                    <button class="userinfo-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" :data-id="item.id"></button>
                    <school-item :item="item" sort="world_sort"> </school-item>
                </div>
            </div>
            <div v-else style="text-align: center">暂无数据</div>
        </div>
    </div>
</template>

<script>
// Use Vuex
import { mapState } from "vuex";
import SearchInput from "../../components/SearchInput";
import SchoolItem from "../../components/SchoolItem";
import NavigationBar from "../../components/NavigationBar";
import {
    login,
    searchAbroad,
    getAreaList,
    hotCity,
    schoolRelation,
} from "@/api/api.js";

export default {
    components: {
        SearchInput,
        SchoolItem,
        NavigationBar,
    },
    data() {
        return {
            placeholder: "搜索学校名称",
            keyword: "",
            type: "2", // 2国际升学榜 其他学校资料库
            schools: [],
            page: 1,
            filterData: {}, // 提交的筛选数据
            // 筛选
            dropAreaShow: false,
            dropAreaStatus: "",
            countryTags: [],
            countryData: [],
            majorTags: [],
            recruitTags: [],
            currCountryIndex: 0,
            currCountryObj: {},
            currMajorObj: {},
            currPriceObj: {},
            currRecruitObj: {},
            // filter 吸顶
            isFixedTop: false, //是否固定顶部
        };
    },
    computed: {
        ...mapState(["menuButton", "hasUserInfo"]),
    },
    mounted() {
        this.handleSearchSchool(this.keyword, 1);
        // 获取地区列表/专业/专业
        this.getAreaRelation();
    },
    // 下拉刷新
    onPullDownRefresh() {
        uni.stopPullDownRefresh(); // 解决无法回弹
        this.handleSearchSchool(this.keyword, 1);
    },
    // 上拉加载，拉到底部触发
    onReachBottom() {
        this.handleSearchSchool(this.keyword, this.page + 1);
    },
    /**
     * 监听页面滑动事件
     */
    onPageScroll(e) {
        let scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度

        //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
        let isSatisfy = scrollTop >= this.menuButton.bottom + 10 ? true : false;
        //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
        if (this.menuButton.bottom + 10 === isSatisfy) {
            return false;
        }
        this.isFixedTop = isSatisfy;
    },
    methods: {
        handleSearchSchool(val, page = 1) {
            this.keyword = val;
            uni.showLoading({
                title: "加载中",
            });
            searchAbroad({
                page,
                type: this.type,
                keyword: this.keyword,
                ...this.filterData,
            })
                .then((res) => {
                    uni.hideLoading()
                    if (page === 1) {
                        this.schools = res.data.data;
                    } else {
                        if (res.data.data.length) {
                            this.schools = this.schools.concat(res.data.data);
                            this.page = page;
                        } else {
                            uni.showToast({
                                title: "没有更多数据了",
                                icon: "none",
                                duration: 2000,
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goTo(val, id) {
            
        },
        // 获取筛选条件数据
        getAreaRelation() {
            getAreaList()
                .then((res) => {
                    this.countryData = res.data.en;
                })
                .catch((err) => {
                    console.log(err);
                });
            schoolRelation()
                .then((res) => {
                    this.majorTags = res.data.major;
                    this.recruitTags = res.data.recruit_students;
                })
                .catch((err) => {
                    console.log(err);
                });
            hotCity({
                type: this.type,
            })
                .then((res) => {
                    if (res.data.length) {
                        this.countryTags = res.data;
                    } else {
                        this.countryTags = this.countryData.filter(
                            (item) =>
                                item.name === "美国" ||
                                item.name === "英国" ||
                                item.name === "法国" ||
                                item.name === "德国"
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleConditionChange(conditions) {
            if (this.dropAreaStatus === conditions) {
                this.dropAreaShow = !this.dropAreaShow;
            } else {
                this.dropAreaShow = true;
            }
            this.dropAreaStatus = conditions;
        },
        // tag-btn选择国家
        countryBtnChange(item) {
            this.currCountryObj = item;
            this.currCountryIndex = this.countryData.findIndex(
                (v) => v.city_id === item.city_id
            );
            this.filterData.city_id = item.city_id;
            this.handleSearchSchool(this.keyword, 1);
            this.dropAreaShow = false;
        },
        // picker国家
        countryPickerChange(e) {
            this.currCountryIndex = e.mp.detail.value;
            this.currCountryObj = this.cityData[e.mp.detail.value];
            this.filterData.city_id = this.currCountryObj.city_id;
            this.handleSearchSchool(this.keyword, 1);
            this.dropAreaShow = false;
        },
        // tag-btn选择专业
        majorBtnChange(item) {
            this.currMajorObj = item;
            this.filterData.major = item.id;
            this.handleSearchSchool(this.keyword, 1);
            this.dropAreaShow = false;
        },
        // tag-btn选择招生年级
        recruitBtnChange(item) {
            this.currRecruitObj = item;
            this.filterData.recruit_students = item.id;
            this.handleSearchSchool(this.keyword, 1);
            this.dropAreaShow = false;
        },
        // tag-btn选择学费
        priceBtnChange(item) {
            this.currPriceObj = item;
            this.filterData.min_price = item.min_price;
            this.filterData.max_price = item.max_price;
            this.handleSearchSchool(this.keyword, 1);
            this.dropAreaShow = false;
        },
        getUserInfo(e) {
            const that = this
            uni.login({
                success (res) {
                    if (res.code) {
                        if (e.mp.detail.userInfo) {
                            // 用户按了允许授权按钮
                            const userInfo = e.mp.detail.userInfo
                            if (that.hasUserInfo) {
                                uni.navigateTo({ url: "/pages/schoolDetail/main?id=" + e.currentTarget.dataset.id });
                            } else {
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
                                    uni.navigateTo({ url: "/pages/schoolDetail/main?id=" + e.currentTarget.dataset.id });
                                }).catch( err => {
                                    console.log(err)
                                })
                            }
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
        }
    },
};
</script>

<style scoped>
.wrapper {
    position: relative;
}
.userinfo-btn {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
}

.m_container {
    background: #f5f5f5;
}
.bg-fff {
    background: #fff;
}
.p-lr-1 {
    padding-left: 1em;
    padding-right: 1em;
}
.classify-area {
    width: 100%;
    border-bottom: 1px solid #dedede;
    left: 0;
    z-index: 999;
}
.classify-area.fixed {
    position: fixed;
}
.classify-area .btn-area {
    display: flex;
    padding: 10px 0;
}
.classify-area .conditions {
    font-size: 14px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.classify-area .triangle {
    width: 0;
    height: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid #000;
    margin-left: 5px;
}
.classify-area .drop-area {
    padding: 10px 10px 0;
}
.classify-area .tag-btn {
    display: inline-block;
    padding: 0px 8px;
    margin-right: 10px;
    border: 1px solid #333;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 14px;
}
.tag-btn-active {
    background-color: #333;
    color: #fff;
}
</style>
