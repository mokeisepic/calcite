<p align="center">
  <img src="./assets/full.png" alt="Calcite" />
</p>

---

A simple mod loader for Geometry Dash's web port.

## Usage

Mods are written in JavaScript and have access to `window.gdGame` (the
`Phaser.Game` object) and `window.gdScene` (the main `Phaser.Scene` object).

Mods can optionally contain a `// @name My Mod Name` comment to dictate the
naming of mods, otherwise mods will be added with the name "Untitled mod".

Uploading a mod with the same file name as a pre-existing mod will update the
contents of the mod.

---

## Disclaimer

This project is not affiliated with RobTop Games or Geometry Dash. This is a
community project containing none of the original code.
