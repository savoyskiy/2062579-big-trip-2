import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const DATE_FORMAT = 'MMM DD';

const TIME_FORMAT = 'HH:mm';

const getDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';

const getTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';

const getTimeHourLength = (dateFrom, dateTo) => {
  let result = '';
  const length = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
  if(length !== '0') {
    result = length;
  }
  return result;
};

const getTimeMinuteLength = (dateFrom, dateTo) => {
  let result = '';
  const length = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  if (length !== '0') {
    result = length % 60;
  }
  return result;
};

const setFavoriteClass = (data) => data ? 'event__favorite-btn--active' : '';

export { getRandomArrayElement, getDate, getTime, getTimeHourLength, getTimeMinuteLength, setFavoriteClass };
