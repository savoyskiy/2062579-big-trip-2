import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import EventsPresenter from './view/events-presenter.js';
import { RenderPosition, render } from './render.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({pointsListContainer: tripEventsContainer});

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);
render(new SortingView(), tripEventsContainer);

eventsPresenter.init();
