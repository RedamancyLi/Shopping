<template>
<div><h1>您访问的页面不存在 </h1>
  <p>您将在{{times}}秒跳回主页</p></div>
  
</template>

<script>
export default {
  data() {
    return {
      times: 5,
      timerId: null
    };
  },
  created() {
    this.timerId = setInterval(() => {
      if (this.times <= 1) {
        clearInterval(this.timerId);
        this.$router.push("/home");
      }
      this.times--;
    }, 1000);
  }
};
</script>

<style>
</style>
