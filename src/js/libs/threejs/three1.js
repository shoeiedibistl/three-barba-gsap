import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GUI } from 'dat.gui'; // Импортируем dat.GUI
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export const threeInit = () => {
  const myCanvas = document.getElementById('barba-canvas');

  if (!myCanvas) return;

  // 1. Создание сцены
  const scene = new THREE.Scene();

  // 2. Создание камеры
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1.3, -0.15, 1.8);
  camera.lookAt(10, 10, 10);

  // 3. Создание рендерера
  const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xd2e8ed, 1);
  renderer.shadowMap.enabled = true; // Включаем тени
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Мягкие тени
  renderer.physicallyCorrectLights = true; // Физически корректное освещение
  renderer.outputEncoding = THREE.sRGBEncoding; // Коррекция цвета
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // Тонмаппинг для улучшения контраста
  renderer.toneMappingExposure = 1; // Экспозиция

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const axesHelper = new THREE.AxesHelper(5); // 5 — длина осей
  scene.add(axesHelper);

  // Освещение
  const myAmbientLight = new THREE.AmbientLight(0xffffff, 0.5); // Рассеянный свет
  scene.add(myAmbientLight);

  const myDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Направленный свет
  myDirectionalLight.position.set(0, 1, 5);
  myDirectionalLight.castShadow = true; // Источник света отбрасывает тени
  scene.add(myDirectionalLight);

  const myDirectionalLightHelper = new THREE.DirectionalLightHelper(myDirectionalLight, 0.2);
  scene.add(myDirectionalLightHelper);

  const myPointLight = new THREE.PointLight(0xff0000, 5, 10); // Точечный свет
  myPointLight.position.set(2, 2, 2);
  myPointLight.castShadow = true; // Источник света отбрасывает тени
  scene.add(myPointLight);

  // Группы для текста
  const textGroupTitleMain = new THREE.Group();
  const textGroupTextMain = new THREE.Group();
  const textGroupMain = new THREE.Group();
  textGroupMain.position.set(-3.25, 0.5, 0);
  textGroupMain.castShadow = true; // Группа отбрасывает тени
  textGroupMain.receiveShadow = true; // Группа принимает тени
  textGroupMain.add(textGroupTitleMain);
  textGroupMain.add(textGroupTextMain);
  scene.add(textGroupMain);

  // Создаем фоновую плоскость
  const planeGeometry = new THREE.PlaneGeometry(100, 100); // Ширина и высота плоскости
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd2e8ed, // Цвет фона
    metalness: 0, // Металличность (не нужна для фона)
    roughness: 0.5, // Шероховатость для рассеивания света
  });
  const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  backgroundPlane.receiveShadow = true; // Плоскость принимает тени
  backgroundPlane.position.set(-40, 0, -1); // Позиционируем плоскость за текстом по оси Z
  scene.add(backgroundPlane);

  let firstLetterWidth = 0;
  let firstLetterHeight = 0;

  const myFontLoader = new FontLoader();
  /*myFontLoader.load('/fonts/DrukWideCyr_Bold.json', function (font) {
    const myTextGeometry = new TextGeometry('КНЯЗЬ', {
      font: font,
      size: 0.8,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 10,
    });

    myTextGeometry.center();

    const myTextMaterial = new THREE.MeshNormalMaterial();
    const myText = new THREE.Mesh(myTextGeometry, myTextMaterial);
    scene.add(myText);
  });*/

  // Загрузка HDR-окружения
  new RGBELoader()
    .setPath('textures/equirectangular/')
    .load('royal_esplanade_1k.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture; // Устанавливаем окружение
      //scene.background = texture; // Устанавливаем фон
    });

  const params = {
    color: 0xffff00,
    transmission: 0.9,
    opacity: 0.6,
    metalness: 0.1,
    roughness: 0,
    ior: 2.5,
    thickness: 0.01,
    attenuationColor: 0xffff00,
    attenuationDistance: 0.1,
    specularIntensity: 0.9,
    specularColor: 0x000000,
    envMapIntensity: 1,
    lightIntensity: 1,
    exposure: 1,
  };

  myFontLoader.load('/fonts/DrukWideCyr_Bold.json', (font) => {
    const text = 'КНЯЗЬ';
    const letterSpacing = 0.075; // Отступ между буквами
    let offsetX = 0; // Смещение по оси X для каждой буквы

    const glassStandardMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00, // Цвет материала
      transparent: true, // Включаем прозрачность
      opacity: 0.5, // Уровень прозрачности
      roughness: 0.1, // Гладкость поверхности
      metalness: 0.5, // Металличность
      side: THREE.DoubleSide, // Рендерим обе стороны
    });

    ///*
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffff00,
      metalness: 0.1,
      roughness: 0,
      transparent: true,
      opacity: 0.6,
      transmission: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: 1.5,
      side: THREE.DoubleSide, // Рендерим обе стороны
    });

    // Создаем стеклянный материал
    const glassMaterialParams = new THREE.MeshPhysicalMaterial({
      color: params.color,
      transmission: params.transmission,
      opacity: params.opacity,
      metalness: params.metalness,
      roughness: params.roughness,
      ior: params.ior,
      thickness: params.thickness,
      attenuationColor: params.attenuationColor,
      attenuationDistance: params.attenuationDistance,
      specularIntensity: params.specularIntensity,
      specularColor: params.specularColor,
      envMapIntensity: params.envMapIntensity,
      transparent: true,
      side: THREE.DoubleSide,
    });
    //*/

    // Создаем стеклянный материал
    const glassPhongMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00, // Зеленый цвет
      specular: 0x0ffff00, // Белые блики
      shininess: 200, // Интенсивность бликов
      transparent: true, // Включаем прозрачность
      opacity: 0.5, // 80% непрозрачности
      side: THREE.DoubleSide, // Рендерим обе стороны
      alphaTest: 0.5,
      reflectivity: 1,
    });

    const glassMaterialRough = new THREE.MeshPhysicalMaterial({
      color: 0xffff00,
      metalness: 0.1,
      roughness: 0,
      transparent: true,
      opacity: 0.8,
      transmission: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.75,
      ior: 1.5,
    });

    for (let i = 0; i < text.length; i++) {
      const letterGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.8,
        depth: 0.4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelOffset: -0.015,
        bevelSegments: 10,
      });
      letterGeometry.center();

      //const letterMaterial = new THREE.MeshStandardMaterial({
      //  color: i == 2 ? 0xff0000 : 0x00ff00,
      //});
      const letterMesh = new THREE.Mesh(
        letterGeometry,
        i == 2 ? glassMaterialRough : glassMaterialParams
      );

      // Позиционируем букву с учетом отступа
      letterMesh.position.x = offsetX;
      textGroupTitleMain.add(letterMesh);

      // Сохраняем ширину первой буквы
      if (i === 0) {
        firstLetterWidth = letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x;
        firstLetterHeight = letterGeometry.boundingBox.max.y - letterGeometry.boundingBox.min.y;
      }

      // Позиционируем группу текста
      textGroupTitleMain.position.set(0, firstLetterHeight / 2 + 0.1, 0);
      textGroupTextMain.position.set(1.5, -0.1, 0.2);
      textGroupMain.position.set(firstLetterWidth / 2, 0, 0);

      // Обновляем смещение для следующей буквы
      offsetX +=
        letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x + letterSpacing;
    }

    //textGroupMain.add(textGroupTitleMain);

    // Устанавливаем камеру на текст
    camera.lookAt(textGroupTextMain.position);
    controls.target.set(
      // textGroupTitleMain.position.x + 3.7,
      // //textGroup.position.x + 4,
      // textGroupTitleMain.position.y - 0.4,
      // textGroupTitleMain.position.z
      textGroupTitleMain.position.x,
      textGroupTitleMain.position.y,
      textGroupTitleMain.position.z
    );
    controls.update();

    // // Создаем GUI
    // const gui = new GUI();

    // gui
    //   .addColor(params, 'color')
    //   .onChange((value) => {
    //     glassMaterial.color.set(value);
    //   })
    //   .name('Цвет color');

    // gui
    //   .add(params, 'transmission', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.transmission = value;
    //   })
    //   .name('Преломление transmission');

    // gui
    //   .add(params, 'opacity', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.opacity = value;
    //   })
    //   .name('Прозрачность opacity');

    // gui
    //   .add(params, 'metalness', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.metalness = value;
    //   })
    //   .name('Металличность metalness');

    // gui
    //   .add(params, 'roughness', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.roughness = value;
    //   })
    //   .name('Шероховатость roughness');

    // gui
    //   .add(params, 'ior', 1, 2.5)
    //   .onChange((value) => {
    //     glassMaterial.ior = value;
    //   })
    //   .name('Индекс преломления ior');

    // gui
    //   .add(params, 'thickness', 0, 0.1)
    //   .onChange((value) => {
    //     glassMaterial.thickness = value;
    //   })
    //   .name('Толщина thickness');

    // gui
    //   .addColor(params, 'attenuationColor')
    //   .onChange((value) => {
    //     glassMaterial.attenuationColor.set(value);
    //   })
    //   .name('Цвет затухания attenuationColor');

    // gui
    //   .add(params, 'attenuationDistance', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.attenuationDistance = value;
    //   })
    //   .name('Дистанция затухания attenuationDistance');

    // gui
    //   .add(params, 'specularIntensity', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.specularIntensity = value;
    //   })
    //   .name('Интенсивность бликов specularIntensity');

    // gui
    //   .addColor(params, 'specularColor')
    //   .onChange((value) => {
    //     glassMaterial.specularColor.set(value);
    //   })
    //   .name('Цвет бликов specularColor');

    // gui
    //   .add(params, 'envMapIntensity', 0, 1)
    //   .onChange((value) => {
    //     glassMaterial.envMapIntensity = value;
    //   })
    //   .name('Интенсивность окружения envMapIntensity');

    // gui
    //   .add(params, 'exposure', 0, 1)
    //   .onChange((value) => {
    //     renderer.toneMappingExposure = value;
    //   })
    //   .name('Экспозиция toneMappingExposure');
  });

  myFontLoader.load('/fonts/GOST_26.008—85_Regular.json', (font) => {
    const text = 'Это лучшее, что ты видел';
    const letterSpacing = 0.075; // Отступ между буквами
    let offsetX = 0; // Смещение по оси X для каждой буквы
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.25,
      depth: 0.05,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: -0.0015,
      bevelSegments: 10,
    });
    textGeometry.center();

    const textMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      metalness: 0.1,
      roughness: 0,
      transparent: true,
      opacity: 0.9,
      transmission: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: 1.5,
      side: THREE.DoubleSide, // Рендерим обе стороны
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Позиционируем текст
    // textMesh.position.x = offsetX;

    // Обновляем смещение для следующей буквы
    // offsetX += textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x + letterSpacing;

    // Добавляем текст в сцену
    textGroupTextMain.add(textMesh);
    textGroupMain.add(textGroupTextMain);
    // scene.add(textMesh);
  });

  // 5. Анимация и рендеринг
  const animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    // Рендерим сцену
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

/*
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GUI } from 'dat.gui'; // Импортируем dat.GUI
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const params = {
  color: 0xffff00,
  transmission: 0.8,
  opacity: 1,
  metalness: 0.1,
  roughness: 0,
  ior: 2.5,
  thickness: 0.01,
  attenuationColor: 0xccff00,
  attenuationDistance: 0.5,
  specularIntensity: 0.9,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
};


export const threeInit = () => {
  const myCanvas = document.getElementById('barba-canvas');

  if (!myCanvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Загрузка HDR-окружения
  new RGBELoader()
    .setPath('textures/equirectangular/')
    .load('royal_esplanade_1k.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture; // Устанавливаем окружение
      //scene.background = texture; // Устанавливаем фон
    });

  // Загрузка шрифта и создание текста
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/DrukWideCyr_Bold.json', (font) => {
    const text = 'КНЯЗЬ';
    const letterSpacing = 0.075;
    let offsetX = 0;

    const textGroup = new THREE.Group();
    textGroup.position.set(-3.25, 0.5, 0);
    textGroup.castShadow = true;
    textGroup.receiveShadow = true;
    scene.add(textGroup);

    // Создаем стеклянный материал
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: params.color,
      transmission: params.transmission,
      opacity: params.opacity,
      metalness: params.metalness,
      roughness: params.roughness,
      ior: params.ior,
      thickness: params.thickness,
      attenuationColor: params.attenuationColor,
      attenuationDistance: params.attenuationDistance,
      specularIntensity: params.specularIntensity,
      specularColor: params.specularColor,
      envMapIntensity: params.envMapIntensity,
    });

    // Создаем стеклянный материал
    const glassMaterialMate = new THREE.MeshPhysicalMaterial({
      color: params.color,
      transmission: params.transmission,
      opacity: params.opacity,
      metalness: params.metalness,
      roughness: params.roughness + 0.4,
      ior: params.ior,
      thickness: params.thickness,
      attenuationColor: params.attenuationColor,
      attenuationDistance: params.attenuationDistance,
      specularIntensity: params.specularIntensity,
      specularColor: params.specularColor,
      envMapIntensity: params.envMapIntensity,
    });

    for (let i = 0; i < text.length; i++) {
      const letterGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.8,
        depth: 0.4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.025,
        bevelOffset: -0.0125,
        bevelSegments: 10,
      });
      letterGeometry.center();

      const letterMesh = new THREE.Mesh(letterGeometry, i == 2 ? glassMaterialMate : glassMaterial);
      letterMesh.position.x = offsetX;
      textGroup.add(letterMesh);

      offsetX +=
        letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x + letterSpacing;
    }

    // Создаем GUI
    const gui = new GUI();

    gui
      .addColor(params, 'color')
      .onChange((value) => {
        glassMaterial.color.set(value);
      })
      .name('Цвет');

    gui
      .add(params, 'transmission', 0, 1)
      .onChange((value) => {
        glassMaterial.transmission = value;
      })
      .name('Преломление');

    gui
      .add(params, 'opacity', 0, 1)
      .onChange((value) => {
        glassMaterial.opacity = value;
      })
      .name('Прозрачность');

    gui
      .add(params, 'metalness', 0, 1)
      .onChange((value) => {
        glassMaterial.metalness = value;
      })
      .name('Металличность');

    gui
      .add(params, 'roughness', 0, 1)
      .onChange((value) => {
        glassMaterial.roughness = value;
      })
      .name('Шероховатость');

    gui
      .add(params, 'ior', 1, 2.5)
      .onChange((value) => {
        glassMaterial.ior = value;
      })
      .name('Индекс преломления');

    gui
      .add(params, 'thickness', 0, 0.1)
      .onChange((value) => {
        glassMaterial.thickness = value;
      })
      .name('Толщина');

    gui
      .addColor(params, 'attenuationColor')
      .onChange((value) => {
        glassMaterial.attenuationColor.set(value);
      })
      .name('Цвет затухания');

    gui
      .add(params, 'attenuationDistance', 0, 1)
      .onChange((value) => {
        glassMaterial.attenuationDistance = value;
      })
      .name('Дистанция затухания');

    gui
      .add(params, 'specularIntensity', 0, 1)
      .onChange((value) => {
        glassMaterial.specularIntensity = value;
      })
      .name('Интенсивность бликов');

    gui
      .addColor(params, 'specularColor')
      .onChange((value) => {
        glassMaterial.specularColor.set(value);
      })
      .name('Цвет бликов');

    gui
      .add(params, 'envMapIntensity', 0, 1)
      .onChange((value) => {
        glassMaterial.envMapIntensity = value;
      })
      .name('Интенсивность окружения');

    gui
      .add(params, 'exposure', 0, 1)
      .onChange((value) => {
        renderer.toneMappingExposure = value;
      })
      .name('Экспозиция');
  });

  // Освещение
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 1, 1).normalize();
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 5, 10);
  pointLight.position.set(2, 2, 2);
  pointLight.castShadow = true;
  scene.add(pointLight);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
  }

  animate();

  // Обработка изменения размера окна
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);

  // Очистка ресурсов
  return () => {
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
  };
};
*/
