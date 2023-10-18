<template>
    <div>
      <input type="number" v-model="updateInterval" placeholder="Interval Update (ms)" />
      <button @click="saveSettings">Save</button>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouteStore } from '@/store/storeRouter';
  
  const routeStore = useRouteStore();
  const updateInterval = ref(routeStore.updateInterval);
  
  const saveSettings = () => {
    routeStore.setUpdateInterval(updateInterval.value);
  };
</script>
  