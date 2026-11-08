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
  padding: 2rem;
}

.feature-row.reverse{
  flex-direction: row-reverse;
}

.feature-image {
  width: 40%;
  max-width: 100%;
  border-radius: 1rem;
  object-fit: cover;
}

.feature-text {
  flex: 1;
}

/* stack vertically on phones */
@media (max-width: 600px) {
  .feature-row,
  .feature-row.reverse {
    flex-direction: column;
  }

  .feature-image {
    width: 100%;
  }
}
</style>
