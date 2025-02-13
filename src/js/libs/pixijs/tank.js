import { Container, Sprite, Texture } from 'pixi.js';
import { createAnimatedSprite } from './createAnimatedSptrite';
import { createSprite } from './createSprite';

export class Tank {
  constructor() {
    this._view = new Container();

    //left track
    this._tracksLeft = createAnimatedSprite(['TrackAFrame1', 'TrackAFrame2'], { x: 0, y: -80 });
    this._tracksRight = createAnimatedSprite(['TrackAFrame1', 'TrackAFrame2'], { x: 0, y: 80 });
    this._tracksLeft.animationSpeed = 0.15;
    this._tracksRight.animationSpeed = 0.15;

    this._hull = new Sprite(Texture.from('HeavyHullB'));
    this._hull.anchor.set(0.5);

    this._bodyContainer = new Container();
    this._towerContainer = new Container();
    this._heavyGun = new Container();
    this._bullet = new Container();

    this._bullet.addChild(createSprite('LightShell', { x: 215, y: 29 }));

    this._view.addChild(this._bodyContainer);

    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight, this._hull);

    this._view.addChild(this._towerContainer);

    this._heavyGun.addChild(this._bullet, createSprite('HeavyGunB', { x: 160, y: 29 }));
    // this._towerContainer.addChild(createSprite('SmallGunA', { x: 120, y: -27 }));
    this._towerContainer.addChild(this._heavyGun, createSprite('SmallGunA', { x: 120, y: -27 }));

    this._towerContainer.addChild(createSprite('GunConnectorD', { x: 80, y: 0 }));
    this._towerContainer.addChild(createSprite('HeavyTowerB'));

    // this._isMoving = false;

    // new AnimatedSprite([
    //   Texture.from('TrackCFrame1'),
    //   Texture.from('TrackCFrame2'),
    // ]);

    // this._tracksLeft.animationSpeed = 0.1;
    // this._tracksLeft.position.set(0, -80);
    // this._tracksLeft.anchor.set(0.5);

    // this._view.addChild(this._tracksLeft);

    // //right track
    // this._tracksRight = new AnimatedSprite([
    //   Texture.from('TrackCFrame1'),
    //   Texture.from('TrackCFrame2'),
    // ]);

    // this._tracksRight.animationSpeed = 0.1;
    // this._tracksRight.position.set(0, 80);
    // this._tracksRight.anchor.set(0.5);

    // this._view.addChild(this._tracksRight);
  }

  get view() {
    return this._view;
  }

  set towerDirection(value) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  set bodyDirection(value) {
    this._bodyContainer.rotation = value;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  set x(value) {
    this._view.position.x = value;
  }

  get x() {
    return this._view.position.x;
  }

  set y(value) {
    this._view.position.y = value;
  }

  get y() {
    return this._view.position.y;
  }

  set bulletPositionX(value) {
    this._bullet.x += value;
  }

  get bulletPositionX() {
    return this._bullet.position.x;
  }

  set bulletPositionY(value) {
    this._bullet.position.y += value;
  }

  reloadGun() {
    this._bullet.x = 0;
  }

  get getGunWidth() {
    // return this._view.width - this._bodyContainer.width / 2;
    return (this._towerContainer.width - this._heavyGun.width) / 2 + this._heavyGun.width;
  }

  //   shoot() {
  //     this._bullet.position.x += 200;
  //   }

  startTracks() {
    this._tracksLeft.play();
    this._tracksRight.play();
  }

  stopTracks() {
    this._tracksLeft.stop();
    this._tracksRight.stop();
  }
}
