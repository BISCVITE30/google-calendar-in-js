import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const createBtn = document.querySelector('.create-event-btn');

export const renderHeader = () => {
  const displayedWeekStart = getItem('displayedWeekStart') || new Date();
  const currentWeek = generateWeekRange(displayedWeekStart);

  const today = new Date();

  const calendarHeader = document.querySelector('.calendar__header');
  calendarHeader.innerHTML = '';

  currentWeek.forEach(date => {
    const dayLabel = document.createElement('div');
    dayLabel.classList.add('calendar__day-label', 'day-label');

    const dayName = document.createElement('span');
    dayName.classList.add('day-label__day-name');
    dayName.textContent = daysOfWeek[date.getDay()];

    const dayNumber = document.createElement('span');
    dayNumber.classList.add('day-label__day-number');
    dayNumber.textContent = date.getDate();

    dayLabel.setAttribute('data-date', date.toISOString());

    dayLabel.append(dayName, dayNumber);
    calendarHeader.append(dayLabel);
    if (date.toDateString() === today.toDateString()) {
      dayName.classList.add('day-name_current');
      dayNumber.classList.add('day-number_current');
    }
  });
};

createBtn.addEventListener('click', openModal);
