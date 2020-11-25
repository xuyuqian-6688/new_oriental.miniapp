<template>   
    <div class="pb-s mb-1">
        <div class="item-title">{{ item.cn_name }}</div>
        <div class="item-content">
            <div class="block">
                <div class="label">招生年级：</div>
                <div class="describe">
                    <text
                        class="tag"
                        v-for="(tag, idx) in item.recruit_students"
                        :key="idx"
                        >{{ tag.name }}</text
                    >
                </div>
            </div>
            <div class="block">
                <div class="label">开设课程：</div>
                <div class="describe">
                    <text
                        class="tag"
                        v-for="(tag, idx) in item.class"
                        :key="idx"
                        >{{ tag.name }}</text
                    >
                </div>
            </div>
        </div>
        <div class="item-footer">
            <div class="address">
                <span class="iconfont icon-weizhi"></span>
                <span>{{ item.address ? item.address : '暂无地址信息' }}</span>
            </div>
            <div class="btn-area">
                <button
                    class="btn"
                    open-type="contact"
                    @contact="handleContact"
                    catchtap="handleContact"
                >
                    在线咨询
                </button>
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
        sort: {
            type: String,
        },
    },
    data() {
        return {};
    },
    computed: {
        sortValues() {
            return this.item[this.sort] ? `${this.item[this.sort]} 位` : "暂无";
        }
    },
    methods: {},
};
</script>

<style scoped>
.pb-s {
    overflow: hidden;
    padding: 20px 1em;
    background: #fff;
}
.item-title {
    color: #000;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
}
.item-content {
    margin-bottom: 5px;
}
.item-content .block {
    display: flex;
    font-size: 14px;
    margin-bottom: 10px;
}
.block .label {
    color: #888;
    white-space: nowrap;
    font-size: 14px;
}
.block .describe {
    color: #000;
}
.describe .tag {
    margin-right: 8px;
}
.item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    font-size: 12px;
}
.item-footer .icon-weizhi {
    color: #000;
    margin-right: 5px;
}
.item-footer .btn-area {
    display: flex;
    justify-content: center;
}
.item-footer .btn-area .btn {
    background-color: #333;
    color: #fff;
    width: 80px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    border: none;
    margin-left: 10px;
}
</style>
