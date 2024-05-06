import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  const displayedMonth = getDisplayedMonth(new Date());
  displayedMonthElem.textContent = displayedMonth;
}

const onChangeWeek = (event) => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  const direction = event.target.dataset.direction;

  if (direction === 'today') {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    setItem('displayedWeekStart', startOfWeek.toISOString());
    renderHeader();
    renderWeek();
    return;
  }

  const currentWeekStart = getItem('displayedWeekStart');

  if (currentWeekStart) {
    let newWeekStart;

    if (direction === 'prev') {
      newWeekStart = new Date(currentWeekStart);
      newWeekStart.setDate(newWeekStart.getDate() - 7);
    } else if (direction === 'next') {
      newWeekStart = new Date(currentWeekStart);
      newWeekStart.setDate(newWeekStart.getDate() + 7);
    }

    setItem('displayedWeekStart', newWeekStart.toISOString());
    renderHeader();
    renderWeek();
    renderCurrentMonth();
  } else {
    console.error("Value for 'displayedWeekStart' not found in storage.");
  }
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
