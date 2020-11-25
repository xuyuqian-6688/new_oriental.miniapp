<template>
    <div class="search-input flex-row align-center">
        <img style="margin-right: 0.5em" class="icon" src="/static/images/search.png" alt="">
        <input
            class="flex-1"
            results="s" type="search"
            :placeholder='placeholder'
            v-model="keyword"
            @blur="confirm"
        />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String
    },
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        confirm() {
            this.$emit('input', this.keyword)
        }
    }
}
</script>

<style scoped>
    .search-box{

    }
</style>
