export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getItem = key => JSON.parse(localStorage.getItem(key)) || [];

const eventExample = {
  id: 0.7520027086457333,
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};
