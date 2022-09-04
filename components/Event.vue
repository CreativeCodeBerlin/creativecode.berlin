<template>
  <a :href="link" class="event">
    <div class="date">{{ prettyDate + " @ " + local_time }}</div>
    <h3>{{ prettyName }}</h3>
    <p>{{ yes_rsvp_count }} People going</p>
  </a>
</template>
<style scoped>
.event {
  background: var(--maincolor);
  margin: 12px auto;
  color: white;
  padding: 12px;
  max-width: 250px;
  display: block;
}

a h3 {
  color: white;
}
</style>
<script>
export default {
  props: ["name", "link", "local_date", "local_time", "yes_rsvp_count"],
  computed: {
    prettyName() {
      var name = this.name;
      name = name.replace("Creative Code", "");
      name = name.replace("at CO.UP", "");
      return name;
    },
    prettyDate() {
      return new Date(this.local_date).toLocaleDateString();
    }
  }
};
</script>
