import { AnimatedSprite, Texture } from 'pixi.js';

export const createAnimatedSprite = (
  textureNames,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 }
) => {
  const textures = textureNames.map((name) => Texture.from(name));
  const animatedSprite = new AnimatedSprite(textures);

  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);

  return animatedSprite;
};
