/*
 * @name Noclip
 */

api.onLoad(() => {
  window.gdScene._level.objects = window.gdScene._level.objects.map(
    (object) => {
      delete object.type;
      return object;
    },
  );
});
