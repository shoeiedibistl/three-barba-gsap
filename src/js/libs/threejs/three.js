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
  //camera.position.set(1.3, -0.15, 1.8);
  //camera.lookAt(10, 10, 10);

  camera.position.set(4, -0.25, 3.5);
  //camera.lookAt(10, 10, 10);

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

  /* const myDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Направленный свет
  myDirectionalLight.shadow.mapSize.width = 2048; // Увеличиваем размер теневой карты
  myDirectionalLight.shadow.mapSize.height = 2048;
  myDirectionalLight.shadow.camera.near = 0.05; // Ближняя плоскость отсечения
  myDirectionalLight.shadow.camera.far = 50; // Дальняя плоскость отсечения
  myDirectionalLight.shadow.radius = 10;
  myDirectionalLight.position.set(0, 3, 15);
  myDirectionalLight.castShadow = true; // Источник света отбрасывает тени
  scene.add(myDirectionalLight);

  const myDirectionalLightHelper = new THREE.DirectionalLightHelper(myDirectionalLight, 0.2);
  scene.add(myDirectionalLightHelper);*/

  const myPointLight = new THREE.SpotLight(0xffffff, 1); // Точечный свет
  myPointLight.position.set(0, 3, 15);
  myPointLight.castShadow = true; // Источник света отбрасывает тени
  //myPointLight.shadow.radius = 10; // Размытие теней
  myPointLight.angle = Math.PI / 3; // Угол конуса света (30 градусов)
  myPointLight.penumbra = 1; // Плавность границ конуса
  myPointLight.decay = 0; // Уменьшение интенсивности света
  myPointLight.distance = 25; // Максимальная дистанция освещения
  myPointLight.castShadow = true;
  scene.add(myPointLight);

  const myPointLightHelper = new THREE.PointLightHelper(myPointLight, 0.2);
  scene.add(myPointLightHelper);

  // Группы для текста
  const textGroupTitleMain = new THREE.Group();
  const textGroupTextMain = new THREE.Group();
  const textGroupMain = new THREE.Group();
  textGroupMain.position.set(-3.25, 2.5, 0);
  textGroupMain.castShadow = true; // Группа отбрасывает тени
  textGroupMain.receiveShadow = true; // Группа принимает тени
  textGroupMain.add(textGroupTitleMain);
  textGroupMain.add(textGroupTextMain);
  scene.add(textGroupMain);

  // Создаем фоновую плоскость
  const planeGeometry = new THREE.PlaneGeometry(100, 100); // Ширина и высота плоскости
  //const planeMaterial = new THREE.MeshStandardMaterial({
  const planeMaterial = new THREE.MeshStandardMaterial({
    // color: 0xd2e8ed, // Цвет фона
    color: 0xccffff, // Цвет фона
    //  metalness: 0, // Металличность (не нужна для фона)
    roughness: 0.5, // Шероховатость для рассеивания света
  });
  const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  backgroundPlane.receiveShadow = true; // Плоскость принимает тени
  backgroundPlane.rotation.y = Math.PI / 10;
  //backgroundPlane.position.set(-30, 0, -1); // Позиционируем плоскость за текстом по оси Z
  backgroundPlane.position.set(-30, 0, 8); // Позиционируем плоскость за текстом по оси Z
  scene.add(backgroundPlane);

  let firstLetterWidth = 0;
  let firstLetterHeight = 0;

  const myFontLoader = new FontLoader();

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

      letterMesh.castShadow = true;

      // Позиционируем букву с учетом отступа
      letterMesh.position.x = offsetX;
      textGroupTitleMain.add(letterMesh);

      // Сохраняем ширину первой буквы
      if (i === 0) {
        firstLetterWidth = letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x;
        firstLetterHeight = letterGeometry.boundingBox.max.y - letterGeometry.boundingBox.min.y;
      }

      // Обновляем смещение для следующей буквы
      offsetX +=
        letterGeometry.boundingBox.max.x - letterGeometry.boundingBox.min.x + letterSpacing;
    }

    // Позиционируем группу текста
    textGroupTitleMain.position.set(0, firstLetterHeight / 2 + 0.05, 0);
    textGroupTextMain.position.set(1.5, -0.125, 0.2);
    textGroupMain.position.set(firstLetterWidth / 2, 0, 0);
    //textGroupMain.add(textGroupTitleMain);

    // Устанавливаем камеру на текст
    camera.lookAt(textGroupTextMain.position);
    controls.target.set(
      textGroupTitleMain.position.x + 2.5,
      textGroupTitleMain.position.y - 0.75,
      textGroupTitleMain.position.z
    );
    controls.update();
  });

  myFontLoader.load('/fonts/GOST_26.008—85_Regular.json', (font) => {
    const text = 'Это лучшее, что ты видел';
    const letterSpacing = 0.075; // Отступ между буквами
    let offsetX = 0; // Смещение по оси X для каждой буквы
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.25,
      depth: 0.025,
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

    textMesh.castShadow = true;
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

  /*  // Добавляем кубы для тестирования теней
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube1.position.set(-2, 0.5, 0);
  cube1.castShadow = true; // Куб отбрасывает тени
  cube1.receiveShadow = true; // Куб принимает тени
  scene.add(cube1);

  const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube2.position.set(2, 0.5, 0);
  cube2.castShadow = true; // Куб отбрасывает тени
  cube2.receiveShadow = true; // Куб принимает тени
  scene.add(cube2);
*/
};
