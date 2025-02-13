import MicroModal from 'micromodal';


export const modalConfig = {
  openTrigger: 'data-modal-open', 
  closeTrigger: 'data-modal-close', 
  openClass: 'is-open',
  disableScroll: true, 
  disableFocus: false,
  awaitOpenAnimation: true, 
  awaitCloseAnimation: true,
}

export const modals = () => {

  MicroModal.init(modalConfig);

  // BACKEND TEST
  // const container = [
  //   '<div class="modal__wrapper">',
  //   'test content',
  //   '</div>',
  // ].join('');

  // setTimeout(() => {
    
  //   openModal(container)
  // }, 1000);
}

export const openModal  = (html) => {
  const layout = document.querySelector('[data-modal-layout]')
  
  layout.innerHTML = html
  MicroModal.show('default-modal', modalConfig)
}
