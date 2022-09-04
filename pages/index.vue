<template>
  <main>
    <header>
      <examples @color="setColor"></examples>
      <h1 class="title">
        Creative<br />
        Code<br />
        .berlin
      </h1>
      <div class="shadow"></div>
    </header>
    <div class="section-items">
      <section>
        <h2>Links</h2>
        <CCButton v-for="link in redirects" :key="link.path" :href="link.path">
          {{ link.title }}<span>{{ link.path }}</span>
        </CCButton>
      </section>
    </div>
  </main>
</template>
<script>
import CCButton from "~/components/CCButton";
import Examples from "~/components/Examples";
import redirects from "~/assets/redirect";

export default {
  data() {
    return {
      redirects
    };
  },
  head: {
    title: "Creative Code Berlin"
  },
  components: {
    CCButton,
    Examples
  },
  methods: {
    setColor(color) {
      if (process.server) return;
      console.log("Color: ", color);
      document.querySelector(".section-items").style.backgroundColor = color;
      document.querySelector(".section-items").style.boxShadow =
        "0 0 200px 100px " + color;
      document.querySelector(".title").style.textShadow = "2px 2px 0 " + color;
      document.querySelector("body").style.backgroundColor = color;
    }
  }
};
</script>

<style lang="postcss" scoped>
main {
  display: flex;
  flex-wrap: wrap;
}

.title {
  font-size: 2.8em;
  text-align: left;
  display: inline-block;
  animation: pop-in 0.35s 1;
  color: var(--maincolor);
  text-shadow: 2px 2px 0 rgba(black, 1);
  transition: text-shadow 0.5s;

  @media (min-width: 650px) {
    font-size: 8em;
  }
}

.section-items {
  display: flex;
  flex-wrap: wrap;
  background: black;
  transition: background 0.5s;
  max-width: 700px;
  margin: 0 auto;
  align-self: center;

  section {
    flex: 1 1 350px;
  }
  h2 {
    text-transform: uppercase;
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0);
  }

  70% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

header {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  position: relative;

  .shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    //background: linear-gradient(0deg, rgba(black, 1) 0%, rgba(black, 0) 100%);
    transition: background 0.5s;
  }
}

section {
  padding: 0 12px;
}

nav {
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;
}
</style>
