<script>
export default {
  data() {
    return {
      isIphone: false
    }
  },
  mounted() {
    if (navigator.userAgent.match(/Android/i)) {
      this.isIphone = true;
    }
  }
}
</script>

<template>
  <svg v-if="!isIphone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
    className="w-6 h-6" style="stroke-width: 1.5px;">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <div v-else style="font-size: 100px;">
    🟢
  </div>
</template>