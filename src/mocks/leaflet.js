export default {
  map() {
    return {
      setView: jest.fn(),
    };
  },
  icon() {
    jest.fn();
  },
  tileLayer() {
    return {
      addTo: jest.fn(),
    };
  },
  marker() {
    return {
      addTo: jest.fn(),
    };
  }
};
