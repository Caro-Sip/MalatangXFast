<script setup>
import vegImg from "@/assets/images/Veggies.jpg";
import beefImg from "@/assets/images/meat1.jpg";
import sauceImg from "@/assets/images/Hot-pot-sauces.jpg";
import FeatureRow from "@/components/FeatureRow.vue";

const features = [
  { title: 'Fresh Veggies', description: 'Placeholder text about veggies.', image: vegImg },
  { title: 'Quality Meats', description: 'Placeholder text about meats.', image: beefImg },
  { title: 'Signature Sauces', description: 'Placeholder text about sauces.', image: sauceImg },
]
</script>

<template>
  <Story title="Components/FeatureRow">
    <FeatureRow v-for="(feature, index) in features"
                :key="feature.title"
                :title="feature.title"
                :description="feature.description"
                :image="feature.image"
                :reverse="index % 2 === 1"
    />
  </Story>
</template>
