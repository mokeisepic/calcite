// @name Always Fly

Object.defineProperty(window.gdScene._state, "isFlying", {
  get: () => true,
  set: () => {},
});
