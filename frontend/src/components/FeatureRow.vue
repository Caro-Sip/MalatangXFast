<script setup lang="ts">
defineProps<{
  title: string,
  description: string,
  image: string,
  reverse?: boolean
}>()
</script>

<template>
 <section class="feature-row" :class="{reverse}">
   <img :src="image" :alt="title" class="feature-image" />
   <div class="feature-text">
     <h2>{{title}}</h2>
     <p>{{description}}</p>
   </div>
 </section>
</template>

<style scoped>
.feature-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  max-width: 50rem;
  margin-inline: auto;
  width: 100%;
}

.feature-row.reverse {
  flex-direction: row-reverse;
}

.feature-image {
  width: 320px;
  height: 220px;
  max-width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

/* stack vertically on phones */
@media (max-width: 600px) {
  .feature-row,
  .feature-row.reverse {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }

  .feature-image {
    width: 100%;
    max-width: 220px;
    height: 150px;
  }
}
</style>
