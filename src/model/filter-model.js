import Observable from '../framework/observable.js';
import { FilterTypes } from '../utils/filter.js';

export default class FilterModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(UpdateType, filter) {
    this.#filter = filter;
    this._notify(UpdateType, filter);
  }
}
