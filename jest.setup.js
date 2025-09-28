// jest.setup.js
import "@testing-library/jest-dom";

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    media: "",
    onchange: null,
  });
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof global.ResizeObserver === "undefined") {
  global.ResizeObserver = ResizeObserver;
}
