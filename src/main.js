import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { RenderPosition, render } from './render.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);
