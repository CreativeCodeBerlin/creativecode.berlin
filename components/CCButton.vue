<template>
  <a class="button" :href="href">
    <slot />
  </a>
</template>

<style lang="postcss" scoped>
.button {
  background: var(--maincolor);
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  color: white;
  padding: 12px;
  margin: 12px auto;
  text-align: center;
  max-width: 250px;
  span {
    opacity: 0.5;
    font-weight: normal;
    display: block;
    word-spacing: 0px;
    &:before {
      content: " ";
    }
  }
}
</style>
<script>
export default {
  props: ["href"]
};
</script>
