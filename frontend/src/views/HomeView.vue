<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue';
import HeroSection from "@/components/HeroSection.vue";
import FeatureRow from "@/components/FeatureRow.vue";
import ChefQuote from "@/components/ChefQuote.vue";
import vegImg from "@/assets/images/Veggies.jpg";
import beefImg from "@/assets/images/meat1.jpg";
import sauceImg from "@/assets/images/Hot-pot-sauces.jpg"

const features = [
  { title: 'Fresh Veggies', description: 'Placeholder text about veggies.', image: vegImg },
  { title: 'Quality Meats', description: 'Placeholder text about meats.', image: beefImg },
  { title: 'Signature Sauces', description: 'Placeholder text about sauces.', image: sauceImg },
]
</script>

<template>
  <AppHeader />
  <HeroSection />
  <FeatureRow v-for="(feature, index) in features"
              :key="feature.title"
              :title="feature.title"
              :description="feature.description"
              :image="feature.image"
              :reverse="index % 2 === 1"
  />
  <ChefQuote quote="Every bowl is a little different, and that's the point." author="Chef Ming"/>
  <AppFooter />
</template>
