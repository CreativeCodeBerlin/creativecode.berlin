<template>
  <nuxt />
</template>

<style lang="postcss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;

  font-family: ocr-b-std, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 1.2;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: var(--maincolor);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: var(--maincolor);
  text-decoration: none;
  border-bottom: 2px solid currentcolor;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(20px);
  }
}
</style>
