<template>
  <a class="button" :href="href">
    <slot />
  </a>
</template>

<style lang="scss" scoped>
  .button {
    background: $maincolor;
    display: block;
    color: white;
    padding: 12px;
    margin: 12px auto;
    text-align: center;
    max-width: 250px;
  }
</style>
<script>
  export default {
    props: ['href']
  }
</script>