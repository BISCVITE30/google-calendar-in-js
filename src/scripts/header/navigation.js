import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

// function getDisplayedMonth(date) {
//   const options = { month: 'short', year: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// }

function renderCurrentMonth(startDate) {
  const startOfWeek = new Date(startDate);
  const endOfWeek = new Date(startDate);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
  const startYear = startOfWeek.getFullYear();
  const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
  const endYear = endOfWeek.getFullYear();

  let displayedMonth;

  if(startYear === endYear) {
    if( startMonth === endMonth) {
      displayedMonth = `${startMonth} ${startYear}`;
    } else {
      displayedMonth = `${startMonth} - ${endMonth} ${startYear}`;
    }
  } else {
    displayedMonth = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }

  displayedMonthElem.textContent = displayedMonth;
}

const onChangeWeek = event => {
  const direction = event.target.dataset.direction;

  if (direction === 'today') {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    setItem('displayedWeekStart', startOfWeek.toISOString());
    renderHeader();
    renderWeek();
    renderCurrentMonth(startOfWeek);
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
    renderCurrentMonth(newWeekStart);
  } else {
    console.error("Value for 'displayedWeekStart' not found in storage.");
  }
};

export const initNavigation = () => {
  const displayedWeekStart = getItem('displayedWeekStart') || new Date();
  renderCurrentMonth(new Date(displayedWeekStart));
  navElem.addEventListener('click', onChangeWeek);
};
