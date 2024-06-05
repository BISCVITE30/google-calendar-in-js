import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { createEvent } from '../common/gateway.js';

const formElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const generateUniqueId = () => {
  return Date.now().toString();
};

const clearEventForm = () => {
  formElem.reset();
}

const onCloseEventForm = () => {
  closeModal();
  clearEventForm();
}

const onCreateEvent = async event => {
  event.preventDefault();
  const { date, startTime, endTime, title, description } = Object.fromEntries(new FormData(formElem));

  const startDateTime = getDateTime(date, startTime);
  const endDateTime = getDateTime(date, endTime);

  const eventObject = {
    id: generateUniqueId(),
    title,
    description,
    start: startDateTime,
    end: endDateTime,
  };

  if (!title || !description || !eventObject.start || !eventObject.end) {
    alert('fill in the fields');
    return;
  }

  try {
    await createEvent(eventObject);
    renderEvents();
    onCloseEventForm();
  } catch (error) {
    console.error(error);
  }
};

export const initEventForm = () => {
  formElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
