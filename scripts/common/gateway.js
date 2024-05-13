const baseUrl = 'https://661cc3b1e7b95ad7fa6b0d59.mockapi.io/api/v1/tasks';

export const getEventList = async () => {
  return await fetch(baseUrl).then((response) => response.json());
};

export const createEvent = async (eventData) => {
  return await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async (eventId) => {
  return await fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  });
};
