import { getItem, setItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
  const getHeader = document.querySelector('.calendar__header');
  const today = new Date();
  const displayedWeekStart = new Date();

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());

  daysOfWeek.forEach((day, index) => {
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('calendar__day-label');
    const dayOfWeek = document.createElement('div');
    dayOfWeek.classList.add('day-label__day-name');
    dayOfWeek.textContent = day;
    const numOfDay = document.createElement('div');
    numOfDay.classList.add('day-label__day-num');

    const currentDay = new Date(firstDayOfWeek);
    currentDay.setDate(firstDayOfWeek.getDate() + index);
    const dayOfMonth = currentDay.getDate();
    numOfDay.textContent = dayOfMonth;

    dateContainer.setAttribute('date-data', dayOfMonth);

    dateContainer.append(dayOfWeek, numOfDay);
    getHeader.append(dateContainer);
  });
  getItem(displayedWeekStart);
  setItem(displayedWeekStart, firstDayOfWeek);
};
// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
openModal();
