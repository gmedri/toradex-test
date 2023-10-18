import { defineStore } from 'pinia';
import axios from 'axios';

export const useRouteStore = defineStore({
  id: 'route',
  state: () => ({
    start: '49.62127,6.06479',  // example of start coordinate (taken from google)
    end: '48.998014,8.367462',  // example of end coordinate (taken from google as well)
    routeData: null,
    updateInterval: localStorage.getItem('updateInterval') || 3000,
  }),
  actions: {
    async fetchData(apiKey) {
      if (this.start && this.end) {
        try {
          const response = await axios.get(`https://api.myptv.com/routing/v1/routes?waypoints=${this.start}&waypoints=${this.end}&apiKey=${apiKey}`);
          this.routeData = response.data;
        } catch (error) {
          console.error('API Error:', error);
        }
      }
    },
    setUpdateInterval(interval) {
      this.updateInterval = interval;
      localStorage.setItem('updateInterval', interval);
    }
  }
});
