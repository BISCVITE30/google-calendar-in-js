import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek } from '../common/time.utils.js';
import { setDisplayedWeekStart, fetchDisplayedWeekStart, createEvent } from '../common/gateway.js';

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

const onChangeWeek = async event => {
  const direction = event.target.dataset.direction;
  const currentWeekStart = new Date(await fetchDisplayedWeekStart()) || new Date();

  const newWeekStart =
    direction === 'today'
      ? getStartOfWeek(new Date())
      : new Date(
          currentWeekStart.setDate(currentWeekStart.getDate() + (direction === 'prev' ? -7 : 7)),
        );

  await createEvent(newWeekStart.toISOString());
  renderHeader();
  renderWeek();
  renderCurrentMonth(newWeekStart);
};

export const initNavigation = async () => {
  let displayedWeekStart = new Date();

  try {
    displayedWeekStart = await fetchDisplayedWeekStart();
  } catch (error) {
    console.error(error);
  }

  renderCurrentMonth(displayedWeekStart);
  navElem.addEventListener('click', onChangeWeek);
};
