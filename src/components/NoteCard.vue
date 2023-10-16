<template>
  <q-card flat bordered class="q-mb-sm cursor-pointer">
    <q-card-section class="q-pt-xs">
      <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
      <div class="text-caption text-grey">
        {{ description }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
});
  console.log(props)
</script>
