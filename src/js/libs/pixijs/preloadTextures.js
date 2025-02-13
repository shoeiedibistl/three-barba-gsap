import { Assets } from 'pixi.js';

export async function preloadAssets() {
  // Create an array of asset data to load.
  const assets = [
    {
      alias: 'background',
      src: '../../images/background/floor.jpg',
    },
    { alias: 'TrackAFrame1', src: '../../images/assets/parts/tracks/TrackAFrame1.png' },
    { alias: 'TrackAFrame2', src: '../../images/assets/parts/tracks/TrackAFrame2.png' },
    { alias: 'HeavyHullB', src: '../../images/assets/parts/hulls/HeavyHullB.png' },
    { alias: 'MediumHullA', src: '../../images/assets/parts/hulls/MediumHullA.png' },
    { alias: 'SmallGunA', src: '../../images/assets/parts/guns/SmallGunA.png' },
    { alias: 'MediumGunA', src: '../../images/assets/parts/guns/MediumGunA.png' },
    { alias: 'HeavyGunB', src: '../../images/assets/parts/guns/HeavyGunB.png' },
    { alias: 'GunConnectorD', src: '../../images/assets/parts/gun_connectors/GunConnectorD.png' },
    { alias: 'GunConnectorB', src: '../../images/assets/parts/gun_connectors/GunConnectorB.png' },
    { alias: 'HeavyTowerB', src: '../../images/assets/parts/towers/HeavyTowerB.png' },
    { alias: 'LightShell', src: '../../images/assets/parts/bullets/LightShell.png' },
    { alias: 'explosion1', src: '../../images/assets/explosion/explosion-1.png' },
    { alias: 'explosion2', src: '../../images/assets/explosion/explosion-2.png' },
    { alias: 'explosion3', src: '../../images/assets/explosion/explosion-3.png' },
    { alias: 'explosion4', src: '../../images/assets/explosion/explosion-4.png' },
    { alias: 'explosion5', src: '../../images/assets/explosion/explosion-5.png' },
    { alias: 'explosion6', src: '../../images/assets/explosion/explosion-6.png' },
    // { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
    // {
    //   alias: 'displacement',
    //   src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png',
    // },
  ];

  // Load the assets defined above.
  await Assets.load(assets);
}
