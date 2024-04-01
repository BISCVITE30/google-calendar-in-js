const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
const createElem = document.querySelector('.create-event-btn');
export const openModal = () => {
  createElem.addEventListener('click', () => {
    modalElem.classList.remove('hidden');
  });
};

export const closeModal = () => {
  const closeModalElem = document.querySelector('.create-event__close-btn');
  closeModalElem.addEventListener('click', () => {
    modalElem.classList.add('hidden');
  });
};

closeModal();