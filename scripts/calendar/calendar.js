import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  const timeSlots = createNumbersArray(1, 24).map((hour) => {
    const timeScaleElem = document.createElement('div');
    timeScaleElem.classList.add('calendar__time-slot');
    timeScaleElem.innerHTML = '';
    return timeScaleElem;
  });
  return timeSlots;
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
};

export const renderWeek = () => {
  const calendarWeekElem = document.querySelector('.calendar__week');
  const weekDays = createNumbersArray(1, 7);

  weekDays.forEach((day) => {
    const dayElem = document.createElement('div');
    dayElem.classList.add('calendar__day');
    dayElem.dataset.dayOfMonth = day; // Устанавливаем порядковый номер дня в месяце

    const timeSlots = generateDay();
    timeSlots.forEach((timeSlot) => {
      dayElem.appendChild(timeSlot);
    });

    calendarWeekElem.appendChild(dayElem);
  });

  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
