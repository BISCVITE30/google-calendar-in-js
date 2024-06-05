import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { initEventForm } from './events/createEvent.js';

document.addEventListener('DOMContentLoaded', async () => {
  renderTimescale();
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
});
