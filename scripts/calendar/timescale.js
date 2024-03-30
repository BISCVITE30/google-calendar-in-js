import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const getTimeScale = document.querySelector('.calendar__time-scale');
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const arrNum = createNumbersArray(1, 23)
    .map((arr) => (arr <= 12 ? arr + ` AM` : arr - 12 + ` PM`))
    .forEach((value) => {
      const timeScaleElem = document.createElement('div');
      timeScaleElem.classList.add('time-slot');
      const slotTimeElem = document.createElement('span');
      slotTimeElem.classList.add('time-slot__time');
      slotTimeElem.textContent = value;
      timeScaleElem.append(slotTimeElem);
      return getTimeScale.append(timeScaleElem);
    });
  return arrNum;
};
