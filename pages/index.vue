<template>
  <div>
    <examples @color="setColor"></examples>
    <header>
      <h1 class="title">Creative<br> Code<br> .berlin</h1>
      <div class="shadow"></div>
    </header>
    <div class="section-items">
      <section>
        <h2>Links</h2>
        <CCButton href="http://stammtisch.creativecode.berlin">
          Stammtisch Doc
        </CCButton>
        <CCButton href="https://creativecodeberlin.github.io/Stammtisch/">
          Stammtisch Log
        </CCButton>
        <CCButton href="http://jam.creativecode.berlin">
          Jam Doc
        </CCButton>
        <CCButton href="http://chat.creativecode.berlin">
          Chat
        </CCButton>
        <CCButton href="https://github.com/Stefterv/creativecode.berlin">
          Website repo
        </CCButton>
      </section>
      <section>
        <h2>Next up</h2>
        <event :key="index" v-bind="event" v-for="event,index in meetup.slice(1,4)">
        </event>
        <pre v-if="false" class="data">
          {{ meetupData() }}
        </pre>
      </section>
    </div>
    <nav>
      <nuxt-link to="/">WTF?</nuxt-link>
    </nav>
  </div>
</template>
<script>
  import CCButton from "~/components/CCButton";
  import Event from "~/components/Event";
  import Examples from "~/components/Examples";
  export default {
    data() {
      return {
        meetup: []
      };
    },
    head: {
      title: "Creative Code Berlin"
    },
    components: {
      CCButton,
      Event,
      Examples
    },
    methods: {
      async grabMeetup() {
        let data = await this.$axios.$get("/meetup/creativeCodeBerlin/events?&sign=true&photo-host=public&page=20");
        for (var ind in data) {
          data[ind].description = "";
        }
        this.meetup = data;
      },
      meetupData() {
        return JSON.stringify(this.meetup, null, 2);
      },
      setColor(color) {
        if (process.server) return;
        console.log("Color: ", color);
        document.querySelector(".section-items").style.backgroundColor = color;
        document.querySelector(".section-items").style.boxShadow = "0 0 200px 100px " + color;
        document.querySelector(".title").style.textShadow = "2px 2px 0 " + color;
        document.querySelector("body").style.backgroundColor = color;
      }
    },
    mounted() {
      this.grabMeetup();
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 2.8em;
    text-align: left;
    display: inline-block;
    animation: pop-in 0.35s 1;
    color: $maincolor;
    text-shadow: 2px 2px 0 rgba(black, 1);
    transition: text-shadow 0.5s;

    @media(min-width: 650px) {
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

    section {
      flex: 1 1 350px;
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
