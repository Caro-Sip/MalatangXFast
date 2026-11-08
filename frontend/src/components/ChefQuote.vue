<script setup lang="ts">
defineProps<{
  quote: string;
  author: string;
}>()
</script>

<template>
  <figure class="chef-quote">
    <blockquote>{{quote}}</blockquote>
    <figcaption>{{author}}</figcaption>
  </figure>
</template>

<style scoped>
.chef-quote {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}
blockquote{
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-style: italic;
}
figcaption{
  font-weight: bold;
}
figcaption::before{
  content: "- ";
}
</style>
