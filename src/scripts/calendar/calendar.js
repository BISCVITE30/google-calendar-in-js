import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/utils.js';
import { storage } from '../common/storage.js';

const generateDay = () => {
  const hourOfDay = createNumbersArray(0, 23);
  return hourOfDay
    .map(hour => {
      return `<div class='calendar__time-slot' data-time='${hour}'></div>`;
    })
    .join('');
};

export const renderWeek = () => {
  const displayedWeekStart = storage.displayedWeekStart;

  if (!displayedWeekStart) {
    return;
  }

  const currentWeek = generateWeekRange(displayedWeekStart);

  const calendarWeekElem = document.querySelector('.calendar__week');

  calendarWeekElem.innerHTML = '';

  currentWeek.forEach((day) => {
    const dayElem = document.createElement('div');
    dayElem.classList.add('calendar__day');
    dayElem.dataset.day = day.getDate();

    const dayMarkup = generateDay();

    dayElem.innerHTML = dayMarkup;

    calendarWeekElem.appendChild(dayElem);
  });

  renderEvents();
};
