import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import { RenderPosition, render } from './render.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);
render(new SortingView(), tripEventsContainer);
