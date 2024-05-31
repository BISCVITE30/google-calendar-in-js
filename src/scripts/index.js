import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { storage } from './common/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  renderTimescale();
  storage.displayedWeekStart = getStartOfWeek(new Date());
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
});
