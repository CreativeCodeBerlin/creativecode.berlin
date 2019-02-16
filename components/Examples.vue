<template>
  <div class="examples" :style="{backgroundColor: project.color}">
    <iframe width="640" height="360" frameborder="0" :src="project.url" allowfullscreen></iframe>
    <div class="credit">Made By <a :href="project.author_url">{{this.project.author}}</a></div>
  </div>
</template>
<script>
  import projects from "~/assets/projects";
  export default {
    data() {
      return {
        projects: projects,
        index: 0
      }
    },
    computed: {
      project() {
        return this.projects[this.index];
      }
    },
    methods: {
      setProject(index) {
        this.index = index % projects.length;

        this.$emit("color", this.project.color);

        //setTimeout(this.nextProject, 15 * 1000);
      },
      nextProject() {
        this.index++

        this.setProject(this.index);
      }
    },
    mounted() {
      var rand = Math.floor(Math.random() * this.projects.length);
      this.setProject(rand);
    }
  }
</script>

<style lang="scss" scoped>
  .examples {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: -1;
    pointer-events: none;

    .credit {
      position: absolute;
      top: 0;
      left: 0;
      padding: 12px;
      color: rgba(white, 0.5);
      text-shadow: 1px 1px 0px black;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>