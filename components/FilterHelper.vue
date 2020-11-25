<template>
    <div class="filter flex-row">
        <div class="flex-1" @click="filterVisible = false"></div>
        <div class="filter-content flex-column justify-between">
            <div class="item-list p-s">
                <div class="filter-item mb-s">
                    <div class="title-middle mb-s">城市</div>
                    <div>
                        <div class="btn-tag btn" :class="{'active' : params.city === 1 }" @click="params.city = 1">北京</div>
                        <div class="btn-tag btn" :class="{'active' : params.city === 2 }" @click="params.city = 2">上海</div>
                        <div class="btn-tag btn" :class="{'active' : params.city === 3 }" @click="params.city = 3">广州</div>
                        <div class="btn-tag btn" :class="{'active' : params.city === 4 }" @click="params.city = 4">深圳</div>
                    </div>
                </div>
                <div class="filter-item mb-s">
                    <div class="title-middle mb-s">年级</div>
                    <div>
                        <div class="btn-tag btn" :class="{'active' : params.class === 1 }" @click="params.class = 1">全部</div>
                        <div class="btn-tag btn" :class="{'active' : params.class === 2 }" @click="params.class = 2">初中</div>
                        <div class="btn-tag btn" :class="{'active' : params.class === 3 }" @click="params.class = 3">高中</div>
                        <div class="btn-tag btn" :class="{'active' : params.class === 4 }" @click="params.class = 4">大学</div>
                    </div>
                </div>
                <div class="filter-item mb-s">
                    <div class="title-middle mb-s">学费区间（年/万元）</div>
                    <div>
                        <div class="btn-tag btn" :class="{'active' : params.price === 1 }" @click="params.price = 1">10万以下</div>
                        <div class="btn-tag btn" :class="{'active' : params.price === 2 }" @click="params.price = 2">10-20万</div>
                        <div class="btn-tag btn" :class="{'active' : params.price === 3 }" @click="params.price = 3">20-30万</div>
                    </div>
                </div>
            </div>
            <div class="p-s flex-row btn-group">
                <div class="btn" @click="resetParams">重置</div>
                <div class="btn btn-confirm" @click="confirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            params: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            resetParams() {

            },
            confirm() {

            }
        }
    }
</script>

<style scoped>
    .filter{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        z-index: 99999;
        box-sizing: border-box;
    }
    .filter-item .title-middle{
        font-weight: 600;
    }
    .filter-content{
        width: 85%;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
    }
    .item-list{
        overflow: scroll;
    }
    .active{
        box-sizing: border-box;
        border: 3px solid #000000;
    }
    .btn-group .btn{
        padding: 0.8em 2em;
        border: 1px solid #000000;
        text-align: center;
        margin-right: 1em;
    }
    .btn-group .btn-confirm{
        background-color: #d1462f;
        color: #fff;
        border: 1px solid #d1462f;
    }
</style>
