import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek } from '../common/time.utils.js';
import { storage } from '../common/storage.js';

const navElem = document.querySelector('.nav');
const displayedMonthElem = document.querySelector('.nav__displayed-month');

const renderCurrentMonth = startDate => {
  const startOfWeek = new Date(startDate);
  const endOfWeek = new Date(startDate);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = date =>
    date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).split(' ');
  const [startMonth, startYear] = formatDate(startOfWeek);
  const [endMonth, endYear] = formatDate(endOfWeek);

  const displayedMonth =
    startYear === endYear
      ? startMonth === endMonth
        ? `${startMonth} ${startYear}`
        : `${startMonth} - ${endMonth} ${startYear}`
      : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  
  displayedMonthElem.textContent = displayedMonth;
};

const onChangeWeek = event => {
  const direction = event.target.dataset.direction;
  let newWeekStart;

  if (direction === 'today') {
    newWeekStart = getStartOfWeek(new Date());
  } else {
    const currentWeekStart = new Date(storage.displayedWeekStart);

    if (!currentWeekStart) {
      console.error(`Value for 'displayedWeekStart' not found in storage`);
      return;
    }

    newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + (direction === 'prev' ? -7 : 7));
  }

  storage.displayedWeekStart = newWeekStart.toISOString();
  renderHeader();
  renderWeek();
  renderCurrentMonth(newWeekStart);
};

export const initNavigation = () => {
  const displayedWeekStart = storage.displayedWeekStart.toISOString() || new Date();
  renderCurrentMonth(new Date(displayedWeekStart));
  navElem.addEventListener('click', onChangeWeek);
};
