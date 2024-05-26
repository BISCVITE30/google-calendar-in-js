import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getEventList, deleteEvent } from '../common/gateway.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

const handleEventClick = event => {
  const clickOnEvent = event.target.closest('.event');
  if (clickOnEvent) {
    openPopup();
    setItem('eventIdToDelete', clickOnEvent.id);
  }
};

const removeEventsFromCalendar = () => {
  document.querySelectorAll('.event').forEach(event => event.remove());
};

const createEventElement = event => {
  const { id, title, description, start, end } = event;
  const eventElem = document.createElement('div');
  eventElem.className = 'event';
  eventElem.id = id;
  eventElem.title = title;
  eventElem.setAttribute('description', description);
  eventElem.setAttribute('start', start);
  eventElem.setAttribute('end', end);

  eventElem.innerHTML = `<div class="event__title">${title}</div>
                         <div class="event__description">${description}</div>`;

  eventElem.style.height = `${(new Date(end) - new Date(start)) / 60000}px`;
  return eventElem;
};

const currentWeekEvents = () => {
  const eventsList = getItem('events') || [];
  const currentWeekStart = new Date(getItem('displayedWeekStart'));
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

  return eventsList.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return eventStart >= currentWeekStart && eventEnd <= currentWeekEnd;
  });
};

export const renderEvents = () => {
  removeEventsFromCalendar();

  currentWeekEvents().forEach(event => {
    const eventElem = createEventElement(event);
    const start = new Date(event.start);
    eventElem.style.top = `${start.getMinutes()}px`;

    const timeSlotElem = document.querySelector(
      `.calendar__day[data-day="${start.getDate()}"] .calendar__time-slot[data-time="${start.getHours()}"]`,
    );

    if (timeSlotElem) {
      timeSlotElem.append(eventElem);
    }
  });
};

const onDeleteEvent = async () => {
  const eventToDel = getItem('eventIdToDelete');
  setItem(
    'events',
    (getItem('events') || []).filter(event => event.id !== eventToDel),
  );

  try {
    await deleteEvent(eventToDel);
    const newEventList = await getEventList();
    setItem('events', newEventList);
    renderEvents();
  } catch (error) {
    console.error(error);
  }

  closePopup();
};

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
