import { Application } from 'pixi.js';
import { addBackground } from './addBackground';
import { preloadAssets } from './preloadTextures';
import { runGame } from './runGame';

let app;
// Asynchronous IIFE
export const pixiInit = async () => {
  const myCanvas = document.querySelector('[data-pixi-canvas]');

  if (!myCanvas) return;

  await setup(myCanvas);
  await preloadAssets();
  await addBackground(app);
  runGame(app);
};

async function setup(myCanvas) {
  // Create a PixiJS application.
  app = new Application();

  // Intialize the application.
  await app.init({ background: 'beige', resizeTo: myCanvas });

  // Then adding the application's canvas to the DOM body.
  myCanvas.append(app.canvas);
}
