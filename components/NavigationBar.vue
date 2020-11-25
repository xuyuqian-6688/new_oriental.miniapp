<template>
    <div class="bar flex-row align-center"
         :style="{'height':(menuButton.bottom + 10)+'px','padding': menuButton.top + 'px 1em 10px 0.5em'}">
        <img v-if="backToLastPage" class="icon mr-s" src="/static/images/back.png" alt="" @click="back">
        <img v-if="backToIndex" class="icon mr-s" src="/static/images/home.png" alt="" @click="goto">
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    props: {
        backToIndex: {
            type: Boolean,
            default: true
        },
        backToLastPage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['menuButton'])
    },
    methods: {
        goto() {
            uni.redirectTo({url:'/pages/index/main'})
        },
        back() {
            uni.navigateBack()
        }
    }
}
</script>

<style scoped>
    .bar{
        background-color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        box-sizing: border-box;
    }
    .mr-s {
        padding: 0.5em 0.5em;
    }
</style>
