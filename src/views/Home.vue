<template>
  <div class="container">
    <input v-model="start" placeholder="Initial coordinate" @input="fetchRouteData" />
    <input v-model="end" placeholder="Final coordinate" @input="fetchRouteData" />
    <p>Updating every {{ routeStore.updateInterval / 1000 }} seconds (change it at /settings page)</p>

    <div v-if="routeStore.routeData" class="data-container">
      <p>Distance: {{ routeStore.routeData.distance }} meters</p>
      <p>Traffic Delay: {{ routeStore.routeData.trafficDelay }} seconds</p>
      <p>Travel Time: {{ routeStore.routeData.travelTime }} seconds</p>
      <p>Violated: {{ routeStore.routeData.violated ? 'Yes' : 'No' }}</p>
    </div>
    <div v-else>
      <p>Loading data...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouteStore } from '@/store/storeRouter';
import { API_KEY } from '@/config';

export default {
  setup() {
    const routeStore = useRouteStore();
    const start = ref(routeStore.start);
    const end = ref(routeStore.end);
    let intervalId;

    const fetchRouteData = () => {
      routeStore.start = start.value;
      routeStore.end = end.value;
      routeStore.fetchData(API_KEY);
    };

    onMounted(() => {
      if (routeStore.start && routeStore.end) {
        intervalId = setInterval(() => {
          fetchRouteData();
        }, routeStore.updateInterval);
      }
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      start,
      end,
      fetchRouteData,
      routeStore,
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.data-container {
  margin-top: 20px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
}

input {
  display: block;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
