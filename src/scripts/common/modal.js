const modalElem = document.querySelector('.modal');

export const openModal = () => {
  modalElem.classList.remove('hidden');
};

export const closeModal = () => {
  modalElem.classList.add('hidden');
};
