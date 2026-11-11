<script setup lang="ts">
defineProps<{
  title: string,
  description: string,
  image: string,
  reverse?: boolean
}>()
</script>

<template>
  <section class="feature-row" :class="{ reverse }">
    <img :src="image" :alt="title" class="feature-image" />
    <div class="feature-text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.feature-row {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem 2rem;
  max-width: 72rem; /* Widened from 50rem so it matches the Hero & Navbar width */
  margin-inline: auto;
  width: 100%;
}

.feature-row.reverse {
  flex-direction: row-reverse;
}

/* Aligns text toward the image when the image is on the right */
.feature-row.reverse .feature-text {
  text-align: right;
}

.feature-image {
  width: 58%; /* Stretches the image into a wide banner like Homepage.jpg */
  height: 240px;
  max-width: 100%;
  border-radius: 0.5rem; /* Use 0 if you want sharp corners like the mockup, or keep 1rem */
  object-fit: cover;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

/* stack vertically on phones */
@media (max-width: 768px) {
  .feature-row,
  .feature-row.reverse {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }

  .feature-row.reverse .feature-text {
    text-align: center;
  }

  .feature-image {
    width: 100%;
    max-width: 100%;
    height: 180px;
  }
}
</style>
