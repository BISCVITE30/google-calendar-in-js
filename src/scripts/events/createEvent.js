import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { createEvent, getEventList } from '../common/gateway.js';

const eventFormElem = document.querySelector('.event-form');
const childEventFormElems = eventFormElem.querySelectorAll('input, textarea');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const generateUniqueId = () => Date.now().toString();

const clearEventForm = () => {
  childEventFormElems.forEach(element => (element.value = ''));
};

const onCloseEventForm = () => {
  closeModal();
  clearEventForm();
};

const onCreateEvent = async event => {
  event.preventDefault();
  const dataEvent = Object.fromEntries(new FormData(eventFormElem));
  const { date, startTime, endTime, title, description } = dataEvent;

  if (!title || !description || !date || !startTime || !endTime) {
    alert('Fill in the fields');
    return;
  }

  const eventObject = {
    id: generateUniqueId(),
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
  };

  try {
    await createEvent(eventObject);
    createEvent(await getEventList())
    renderEvents();
    onCloseEventForm();
  } catch (error) {
    console.error(error);
  }
};

export const initEventForm = () => {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
};
