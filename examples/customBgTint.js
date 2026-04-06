// @name Custom Background Tint

const customTint = 0xff0000;

api.onLoad(() => {
  const originalSetTint = window.gdScene._bg.setTint;
  window.gdScene._bg.setTint = () => {};
  originalSetTint.call(window.gdScene._bg, customTint);
});
