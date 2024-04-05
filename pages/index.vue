<template>
  <section class="links">
    <h2>Links</h2>
    <ul>
      <template v-for="redirect in redirects" :key="redirect.path">
        <a :href="redirect.target">
          <li class="redirect">
            <main>{{ redirect.title }}</main>
            <aside>{{ redirect.path }} </aside>
          </li>
        </a>
      </template>
    </ul>
  </section>
</template>

<script setup>
import redirects from 'assets/redirects';
</script>

<style lang="scss" scoped>
.links {
  padding: var(--pad2);

  .redirect {
    background: var(--primary);
    margin: var(--pad) 0;
    padding: var(--pad) var(--pad2);
    color: white;
    border-radius: 2px;
    transition: 0.2s ease-in-out;

    aside {
      font-size: 0.8em;
      opacity: 0.5;
      padding-left: var(--pad);
    }

    &:hover {
      transform: translateX(10px);
      mix-blend-mode: difference;

      .white & {
        filter: invert(1);
      }
    }
  }
}
</style>