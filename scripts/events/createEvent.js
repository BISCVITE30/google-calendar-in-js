import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import { createEvent, getEventList } from '../common/gateway.js';

const eventFormElem = document.querySelector('.event-form');
const childEventFormElem = eventFormElem.querySelectorAll('input, textarea');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const generateUniqueId = () => {
  return Date.now().toString();
};

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  childEventFormElem.forEach((element) =>
    element.tagName === 'INPUT' || 'TEXTAREA' ? (element.value = '') : undefined
  );
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  closeModal();
  clearEventForm();
}

const onCreateEvent = async (event) => {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
  event.preventDefault();
  const dataEvent = Object.fromEntries(new FormData(eventFormElem));

  const { date, startTime, endTime, title, description } = dataEvent;

  const startDateTime = getDateTime(date, startTime);
  const endDateTime = getDateTime(date, endTime);

  const eventObject = {
    id: generateUniqueId(),
    title,
    description,
    start: startDateTime,
    end: endDateTime,
  };

  if (
    !title||
    !description||
    eventObject.start === null ||
    eventObject.end === null
  ) {
    alert('fill in the fields');
    return;
  }

  try {
  await createEvent(eventObject);
  const newEventList = await getEventList();
  setItem('events', newEventList);
  renderEvents();
  onCloseEventForm();

  } catch (error) {
    console.error(error)
  }
};

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
