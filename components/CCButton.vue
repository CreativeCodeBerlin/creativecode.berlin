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
}
</style>
<script>
export default {
  props: ["href"]
};
</script>
