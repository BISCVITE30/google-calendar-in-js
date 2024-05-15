import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
  const hourOfDay = createNumbersArray(0, 23);
  return hourOfDay
    .map(hour => {
      return `<div class='calendar__time-slot' data-time='${hour}'></div>`;
    })
    .join('');
};

export const renderWeek = () => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

  const displayedWeekStart = getItem('displayedWeekStart');

  if (displayedWeekStart === null) {
    return;
  }

  const currentWeek = generateWeekRange(displayedWeekStart);

  const calendarWeekElem = document.querySelector('.calendar__week');

  calendarWeekElem.innerHTML = '';

  currentWeek.forEach((day, index) => {
    const dayElem = document.createElement('div');
    dayElem.classList.add('calendar__day');
    dayElem.dataset.day = day.getDate();

    const dayMarkup = generateDay();

    dayElem.innerHTML = dayMarkup;

    calendarWeekElem.appendChild(dayElem);
  });

  renderEvents();
};
