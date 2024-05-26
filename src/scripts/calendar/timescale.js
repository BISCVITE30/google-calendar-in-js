import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const timeScaleElem = document.querySelector('.calendar__time-scale');
  timeScaleElem.innerHTML = '';

  createNumbersArray(1, 23).forEach(hour => {
    const timeSlot = document.createElement('div');
    timeSlot.classList.add('time-slot');
    timeSlot.setAttribute('data-hour', hour);

    const timeSlotTime = document.createElement('span');
    timeSlotTime.classList.add('time-slot__time');
    const formattedHour = hour % 12 || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    timeSlotTime.textContent = `${formattedHour} ${period}`;

    timeSlot.append(timeSlotTime);
    timeScaleElem.append(timeSlot);
  });

};

renderTimescale();
