import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

const renderCurrentMonth = startDate => {
  const endOfWeek = new Date(startDate);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const [startMonth, startYear] = startDate
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    .split(' ');
  const [endMonth, endYear] = endOfWeek
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    .split(' ');

  displayedMonthElem.textContent =
    startYear === endYear
      ? startMonth === endMonth
        ? `${startMonth} ${startYear}`
        : `${startMonth} - ${endMonth} ${startYear}`
      : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
};

const onChangeWeek = event => {
  const direction = event.target.dataset.direction;
  const currentWeekStart = new Date(getItem('displayedWeekStart') || new Date());

  const newWeekStart =
    direction === 'today'
      ? getStartOfWeek(new Date())
      : new Date(
          currentWeekStart.setDate(currentWeekStart.getDate() + (direction === 'prev' ? -7 : 7)),
        );

  setItem('displayedWeekStart', newWeekStart.toISOString());
  renderHeader();
  renderWeek();
  renderCurrentMonth(newWeekStart);
};

export const initNavigation = () => {
  const displayedWeekStart = new Date(getItem('displayedWeekStart') || new Date());
  renderCurrentMonth(displayedWeekStart);
  navElem.addEventListener('click', onChangeWeek);
};
