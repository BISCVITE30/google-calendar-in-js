import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const createBtn = document.querySelector('.create-event-btn');

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
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

    if (date.getDate() === today.getDate()) {
      dayName.classList.add('day-name_current');
      dayNumber.classList.add('day-number_current');
    }
  });
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
createBtn.addEventListener('click', openModal);
