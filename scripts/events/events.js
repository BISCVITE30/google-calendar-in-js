import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getEventList, deleteEvent } from '../common/gateway.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  const clickOnEvent = event.target.closest('.event');
  if (!clickOnEvent) {
    return;
  }

  openPopup();
  setItem('eventIdToDelete', clickOnEvent.id);
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
  const calendarEvents = document.querySelectorAll('.event');
  calendarEvents.forEach((event) => event.remove())
}


const createEventElement = (event) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.setAttribute('description', event.description);
  eventElem.setAttribute('id', event.id);
  eventElem.setAttribute('title', event.title);
  eventElem.setAttribute('start', event.start);
  eventElem.setAttribute('end', event.end);
  eventElem.textContent = event.title;

  const start = new Date(event.start);
  const end = new Date(event.end);
  const height = (end - start) / (1000 * 60);
  eventElem.style.height = `${height}px`;

  return eventElem;
};

const currentWeekEvents = () => {
  const eventsList = getItem('events') || [];
  const weekEvents = [];
  eventsList.map((event) => {
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
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
  removeEventsFromCalendar();
  
  const weekEvents = currentWeekEvents();

  weekEvents.forEach((event) => {
    const eventElem = createEventElement(event);
    const startHour = new Date(event.start).getHours();
    const startMinutes = new Date(event.start).getMinutes();
    const weekDay = new Date(event.start).getDate();
    eventElem.style.top = `${startMinutes}px`;

    const dayContainer = document.querySelector(
      `.calendar__day[data-day="${weekDay}"]`
    );

    if (dayContainer) {
      const timeSlotElem = dayContainer.querySelector(
        `.calendar__time-slot[data-time="${startHour}"]`
      );

      if (timeSlotElem) {
        timeSlotElem.append(eventElem);
      }
    }
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)

  let events = getItem('events') || [];

  const eventToDel = getItem('eventIdToDelete');
  
  events = events.filter(event => event.id !== eventToDel);

  setItem('events', events);

  deleteEvent(eventToDel)
    .then(() => getEventList())
    .then((newEventList) => {
      setItem('events', newEventList);
      renderEvents();
    })
    .catch((error) => {
      console.error(error);
    });

  closePopup();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
