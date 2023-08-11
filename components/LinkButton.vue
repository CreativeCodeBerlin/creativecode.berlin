<template>
  <a class="button" :href="href">
    <slot />
  </a>
</template>

<style lang="postcss" scoped>
.button {
  background: var(--maincolor);
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
  props: ["href"],
};
</script>
