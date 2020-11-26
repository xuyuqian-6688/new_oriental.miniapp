<template>
  <div>
    <web-view :src="link"></web-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        link: ''
      }
    },
    mounted() {
      this.link = this.$root.$mp.query.link
      console.log(this.link)
    }
  }
</script>

<style scoped>

</style>