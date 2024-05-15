import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale

  const timeScaleElem = document.querySelector('.calendar__time-scale');
  timeScaleElem.innerHTML = '';

  const hours = createNumbersArray(1, 23);

  hours.forEach(hour => {
    const timeSlot = document.createElement('div');
    timeSlot.classList.add('time-slot');

    const timeSlotTime = document.createElement('span');
    timeSlotTime.classList.add('time-slot__time');

    let formattedHour;
    if (hour === 0) {
      formattedHour = 12;
      timeSlotTime.textContent = formattedHour + ' AM';
    } else if (hour < 12) {
      formattedHour = hour;
      timeSlotTime.textContent = formattedHour + ' AM';
    } else if (hour === 12) {
      formattedHour = hour;
      timeSlotTime.textContent = formattedHour + ' PM';
    } else {
      formattedHour = hour - 12;
      timeSlotTime.textContent = formattedHour + ' PM';
    }

    timeSlot.setAttribute('data-hour', hour);
    timeSlot.append(timeSlotTime);
    timeScaleElem.append(timeSlot);
  });
};

renderTimescale();
