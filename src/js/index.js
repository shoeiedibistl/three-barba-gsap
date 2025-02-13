import '../styles/style.scss';
import 'virtual:svg-icons-register';
import 'lazysizes';
//import { select } from '../blocks/select/select';
//import { accordion } from '../blocks/accordion-ui/accordion-ui';
//import { inputReset } from './components/inputReset';
//import { modals } from '../blocks/modals/modals';
//import { barbaUi } from './libs/barba';
// import { pixiInit } from './libs/pixijs/myPixi';
//import { myTransitionScreenAnimate } from './components/my-transition-screen';
//import { drawTriangles, drawPacman } from './components/canvas';
//import { templateRotation3D } from './components/templateRotation';

//import { myThreeInit } from './libs/threejs/myThree';
import { threeInit } from './libs/threejs/three';
//import { myThreePhysicsInit } from './libs/threejs/myThreePhysics';

document.addEventListener('DOMContentLoaded', function () {
  // barbaUi();

  commonFunction();
});

// Функция для вызова при переходе между страницами
export const commonFunction = () => {
  // inputReset();
  // select();
  // accordion();
  // modals();
  // myTransitionScreenAnimate();
  // drawTriangles();
  // drawPacman();
  // pixiInit();
  //myThreeInit();
  threeInit();
  //myThreePhysicsInit();
  // myThreeInit2();
};
