import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes } from '../utils/filter.js';

const NoTasksTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now',
};

const createNoPointViewTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}
  </p>`;
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointViewTemplate(this.#filterType);
  }
}
