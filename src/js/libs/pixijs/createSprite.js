import { Sprite, Texture } from 'pixi.js';

export const createSprite = (
  textureName,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 }
) => {
  const sprite = new Sprite(Texture.from(textureName));

  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);

  return sprite;
};
