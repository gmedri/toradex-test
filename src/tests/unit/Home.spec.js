import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

const mockRouteData = {
  distance: 100,
  trafficDelay: 10,
  travelTime: 90,
  violated: false
};

const mockUseRouteStore = {
  start: 'start',
  end: 'end',
  updateInterval: 5000,
  fetchData: jest.fn(),
  routeData: null
};

jest.mock('@/store/storeRouter', () => ({
  useRouteStore: () => mockUseRouteStore
}));

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home);
  });

  it('input elements', () => {
    expect(wrapper.findAll('input').length).toBe(2);
  });

  it('update interval', () => {
    expect(wrapper.text()).toContain('Updating every 5 seconds');
  });

  it('function fetchRouteData when input changes', async () => {
    const input = wrapper.find('input');
    await input.setValue('new value');
    expect(mockUseRouteStore.fetchData).toHaveBeenCalled();
  });

  it('route data when available', async () => {
    mockUseRouteStore.routeData = mockRouteData;
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Distance: 100');
    expect(wrapper.text()).toContain('Traffic Delay: 10');
    expect(wrapper.text()).toContain('Travel Time: 90');
    expect(wrapper.text()).toContain('Violated: No');
  });
});
