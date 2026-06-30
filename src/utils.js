import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const DATE_FORMAT = 'MMM DD';

const TIME_FORMAT = 'HH:mm';

const getDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';

const getTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';

const getTimeHourLength = (dateFrom, dateTo) => {
  let result = '';
  const length = dayjs(dateTo).diff(dayjs(dateFrom), 'h');
  if(length === 0) {
    return result;
  } else if(length < 10) {
    result = `0${length}H`;
  } else {
    result = `${length}H`;
  }
  return result;
};

const getTimeMinuteLength = (dateFrom, dateTo) => {
  let result = '00';
  const length = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  const remains = length % 60;
  if (remains !== 0) {
    result = `${length % 60}M`;
  }
  if(remains < 10) {
    result = `0${ length % 60}M`;
  }
  return result;
};

const getTimeLength = (dateFrom, dateTo) => `${getTimeHourLength(dateFrom, dateTo)} ${getTimeMinuteLength(dateFrom, dateTo)}`;

const setFavoriteClass = (data) => data ? 'event__favorite-btn--active' : '';

export { getRandomArrayElement, getDate, getTime, getTimeLength, setFavoriteClass };
