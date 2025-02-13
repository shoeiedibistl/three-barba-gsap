export function myTransitionScreenAnimate() {
  const myButton = document.querySelector('[data-my-transition-screen-start]');
  const myScreen = document.querySelector('[data-my-transition-screen]');
  const myScreenElements = myScreen.querySelectorAll('[data-my-transition-screen-item]');

  myScreenElements.forEach((element) => {
    const delay = Math.round(Math.random(0, 1) * 100) / 100;
    element.style.transitionDelay = `${delay}s`;
  });

  myButton.addEventListener('click', () => {
    console.log('add active');

    myScreen.classList.add('active');

    setTimeout(() => {
      myScreen.classList.remove('active');
      console.log('remove active');
    }, 2000);
  });
}
