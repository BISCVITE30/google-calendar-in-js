const baseUrl = 'https://661cc3b1e7b95ad7fa6b0d59.mockapi.io/api/v1';
const deleteUrl = 'https://6658b9d65c3617052649a2fd.mockapi.io/eventsId';

export const getEventList = async () => {
  const response = await fetch(`${baseUrl}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return await response.json();
};

export const updateEvents = async newEvents => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body:  newEvents,
  });
  if (!response.ok) {
    throw new Error('Failed to update events');
  }
};

export const createEvent = async eventData => {
  return await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async eventId => {
  return await fetch(`${baseUrl}/tasks/${eventId}`, {
    method: 'DELETE',
  });
};

export const fetchDeleteId = async () => {
  const response = await fetch(`${deleteUrl}/eventIdToDelete`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return await response.json();
};

export const fetchDisplayedWeekStart = async () => {
  const response = await fetch(`${baseUrl}/displayedWeekStart`);
  if (!response.ok) {
    throw new Error('Failed to fetch displayed week start');
  }
  const data = await response.json();
  return new Date(data[0].displayedWeekStart);
};

// export const updateDisplayedWeekStart = async newWeekStart => {
//   const response = await fetch(`${baseUrl}/displayedWeekStart`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({ displayedWeekStart: newWeekStart.toISOString() }),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update displayed week start');
//   }
// };

export const setDisplayedWeekStart = async newWeekStart => {
  const response = await fetch(`${baseUrl}/displayedWeekStart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ displayedWeekStart: newWeekStart.toISOString }),
  });
  // if (!response.ok) {
  //   throw new Error('Failed to update displayed week start');
  // }
  return await response.json();
};
