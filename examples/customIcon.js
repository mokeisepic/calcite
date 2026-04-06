/*
 * @name Custom Icon
 */

const imageURl = "https://picsum.photos/61/60"; // Must be 61x60 (for now)

api.onLoad(() => {
  window.gdScene.load.image("custom_player", imageURl);

  window.gdScene.load.once("complete", () => {
    window.gdScene._player.playerSprite.setTexture("custom_player");
    window.gdScene._player.playerSprite.clearTint();
  });

  window.gdScene.load.start();
});
