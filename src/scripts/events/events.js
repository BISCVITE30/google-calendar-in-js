import { openPopup, closePopup } from '../common/popup.js';
import { getEventList, deleteEvent, createEvent, fetchDisplayedWeekStart, fetchDeleteId } from '../common/gateway.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

const handleEventClick = async event => {
  const clickOnEvent = event.target.closest('.event');
  if (clickOnEvent) {
    openPopup();
    await deleteEvent(clickOnEvent.id);
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

const currentWeekEvents = async () => {
  const eventsList = (await getEventList()) || [];
  const currentWeekStart = new Date(await fetchDisplayedWeekStart() || new Date());
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

  return eventsList.filter( event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return eventStart >= currentWeekStart && eventEnd <= currentWeekEnd;
  });
};

export const renderEvents = async () => {
  removeEventsFromCalendar();
  const eventsOnWeek = await currentWeekEvents();
  return eventsOnWeek.forEach(event => {
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
  const eventToDel = await fetchDeleteId();
  const eventList = await getEventList();
  createEvent(eventList.filter(event => event.id !== eventToDel));

  try {
    await deleteEvent(eventToDel);
    const newEventList = await getEventList();
    createEvent(newEventList);
    renderEvents();
  } catch (error) {
    console.error(error);
  }

  closePopup();
};

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
