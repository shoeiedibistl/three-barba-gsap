let myRotatingBlocks = null;
let myScreenCenterX;
let myScreenCenterY;
let is3D; // если true (дефолтное значение), то вращается в Х и У плоскостях, если передаем параметром false, то вращение только по оси Х

export function templateRotation3D(is3DValue = true) {
  is3D = is3DValue;
  templateRotation();
}

const templateRotation = () => {
  document.removeEventListener('mousemove', checkMouseMove);
  myRotatingBlocks = null;

  if (window.innerWidth <= 1200) return;

  myScreenCenterX = window.innerWidth / 2;
  myScreenCenterY = window.innerHeight / 2;

  myRotatingBlocks = document.querySelectorAll('[data-template-rotating-block]');

  if (!myRotatingBlocks.length) return;

  document.addEventListener('mousemove', checkMouseMove);
};

function checkMouseMove(e) {
  const coordX = e.clientX;
  const coordY = e.clientY;

  const angleX = (coordX - myScreenCenterX) / myScreenCenterX;
  const angleY = is3D ? (coordY - myScreenCenterY) / myScreenCenterY : 0;

  requestAnimationFrame(() => {
    myRotatingBlocks.forEach((block) => {
      block.style.transform = `rotateY(${-angleX * 3}deg) rotateX(${angleY * 3}deg)`;
    });
  });
}
