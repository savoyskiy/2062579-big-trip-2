import TripInfoView from './presenter/trip-info-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import { createTripInfoDestinationeNames, calculateCosts } from './utils/trip-info.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({ // создаем презентер с указанием контейнера, в который он добавится, + добавляем в него модель
  pointsListContainer: tripEventsContainer,
  pointsModel: pointsModel,
  filterModel: filterModel
});

const tripInfoDestinationeNames = createTripInfoDestinationeNames(pointsModel);
const tripCosts = calculateCosts(pointsModel.points);
const tripInfo = new TripInfoView({
  tripInfoContainer: tripInfoContainer,
  tripCosts: tripCosts,
  tripInfoDestinationeNames: tripInfoDestinationeNames
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel: filterModel,
  pointsModel: pointsModel
});

filterPresenter.init(); // добавляем фильтры
eventsPresenter.init(); // добавляем презентер с маршрутом
tripInfo.init(); // добавляем информацию о маршруте
