import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getEventList, deleteEvent } from '../common/gateway.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  const clickOnEvent = event.target.closest('.event');
  if (!clickOnEvent) {
    return;
  }

  openPopup();
  setItem('eventIdToDelete', clickOnEvent.id);
}

function removeEventsFromCalendar() {
  const calendarEvents = document.querySelectorAll('.event');
  calendarEvents.forEach(event => event.remove());
}

const createEventElement = event => {

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.setAttribute('description', event.description);
  eventElem.setAttribute('id', event.id);
  eventElem.setAttribute('title', event.title);
  eventElem.setAttribute('start', event.start);
  eventElem.setAttribute('end', event.end);

  const titleElem = document.createElement('div');
  titleElem.classList.add('event__title')
  titleElem.textContent = event.title;
  
  const descriptionElem = document.createElement('div');
  descriptionElem.classList.add('event__description')
  descriptionElem.textContent = event.description;

  eventElem.append(titleElem ,descriptionElem);
  console.log(eventElem);

  const start = new Date(event.start);
  const end = new Date(event.end);
  const height = (end - start) / (1000 * 60);
  eventElem.style.height = `${height}px`;

  return eventElem;
};

const currentWeekEvents = () => {
  const eventsList = getItem('events') || [];
  const weekEvents = [];
  eventsList.map(event => {
    const currentWeekStart = new Date(getItem('displayedWeekStart'));
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    if (eventStart >= currentWeekStart && eventEnd <= currentWeekEnd) {
      weekEvents.push(event);
    }
  });
  return weekEvents;
};

export const renderEvents = () => {
  removeEventsFromCalendar();

  const weekEvents = currentWeekEvents();

  weekEvents.forEach(event => {
    const eventElem = createEventElement(event);
    const startHour = new Date(event.start).getHours();
    const startMinutes = new Date(event.start).getMinutes();
    const weekDay = new Date(event.start).getDate();
    eventElem.style.top = `${startMinutes}px`;

    const dayContainer = document.querySelector(`.calendar__day[data-day="${weekDay}"]`);

    if (dayContainer) {
      const timeSlotElem = dayContainer.querySelector(
        `.calendar__time-slot[data-time="${startHour}"]`,
      );

      if (timeSlotElem) {
        timeSlotElem.append(eventElem);
      }
    }
  });
};

function onDeleteEvent() {
  let events = getItem('events') || [];

  const eventToDel = getItem('eventIdToDelete');

  events = events.filter(event => event.id !== eventToDel);

  setItem('events', events);

  deleteEvent(eventToDel)
    .then(() => getEventList())
    .then(newEventList => {
      setItem('events', newEventList);
      renderEvents();
    })
    .catch(error => {
      console.error(error);
    });

  closePopup();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
