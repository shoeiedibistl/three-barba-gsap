import { Tank } from './tank';
import { TweenManager } from './tween';
import { createAnimatedSprite } from './createAnimatedSptrite';

export const runGame = (app) => {
  // const size = {
  //   x: 10,
  //   y: 10,
  //   radius: 10,
  // };
  const tweenManager = new TweenManager(app.ticker);

  function add(object) {
    app.stage.addChild(object);
  }

  function remove(object) {
    app.stage.removeChild(object);
  }

  // Добавляем графику на сцену

  // marker.x = -size.x / 2;
  // marker.y = -size.y / 2;

  // window['RECTANGLE'] = marker;

  const addExplosion = (coordX = 0, coordY = 0) => {
    const explosion = createAnimatedSprite(
      ['explosion1', 'explosion2', 'explosion3', 'explosion4', 'explosion5', 'explosion6'],
      {
        x: coordX,
        y: coordY,
      }
    );
    explosion.loop = false;
    explosion.animationSpeed = 0.175;
    add(explosion);
    explosion.play();
    explosion.onComplete = () => {
      remove(explosion);
    };
  };

  const width = app.renderer.width;
  const height = app.renderer.height;

  app.stage.position.set(width / 2, height / 2);

  const tank = new Tank();

  window['TANK'] = tank;

  add(tank.view);

  let isMoving = false;

  const moveTank = (e) => {
    if (Boolean(isMoving) == true) return;

    const distanceToCenter = e.getLocalPosition(app.stage);
    const distanceToTank = e.getLocalPosition(tank.view);
    const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

    // console.log(e.clientX);

    const shootDistance = Math.abs(
      Math.floor(Math.sqrt(distanceToTank.x ** 2 + distanceToTank.y ** 2))
    );
    console.log('shootDistance', shootDistance);

    let callAmount = 2;
    const move = () => {
      callAmount -= 1;
      if (callAmount <= 0) {
        tweenManager.createTween(
          tank,
          3000,
          { x: distanceToCenter.x, y: distanceToCenter.y },
          {
            onStart: () => {
              tank.startTracks();
              // tank.isMoving(true);
            },
            onFinish: () => {
              tank.stopTracks();
              isMoving = false;
            },
          }
        );
      }
    };

    const shoot = () => {
      const targetX = Math.floor(Math.abs(tank._bullet.x) + shootDistance - tank.getGunWidth);

      console.log('targetX', targetX);

      if (targetX < 100) return;

      tweenManager.createTween(
        tank._bullet,
        700,
        { x: targetX },
        {
          onStart: () => {},
          onFinish: () => {
            addExplosion(distanceToCenter.x, distanceToCenter.y);
            tank.reloadGun();
          },
        }
      );
    };

    tweenManager.createTween(
      tank,
      1000,
      { towerDirection: angle },
      {
        onStart: () => {
          isMoving = true;
        },
        onFinish: () => {
          shoot();
          move();
        },
      }
    );
    tweenManager.createTween(
      tank,
      2000,
      { bodyDirection: angle },
      {
        onStart: () => {
          tank.startTracks();
        },
        onFinish: () => {
          tank.stopTracks();
          move();
        },
      }
    );
  };

  app.stage.interactive = true;
  app.stage.on('pointerdown', moveTank);
};
