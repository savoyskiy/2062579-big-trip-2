import { getUnicRandomPoints } from '../mock/mock-points.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { mockOffers } from '../mock/mock-offers.js';
import Observable from '../framework/observable.js';
import { updateItem } from '../utils/utils.js';

const POINTS_NUMBER = 3; // количество отрисовываемых точек маршрута

export default class PointsModel extends Observable {
  #points = Array.from({ length: POINTS_NUMBER }, getUnicRandomPoints());
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint(updateType, updatePoint) {
    this.#points = updateItem(this.#points, updatePoint);

    this._notify(updateType, updatePoint);
  }

  addPoint(updateType, addPoint) {
    this.#points.push(addPoint);

    this._notify(updateType, addPoint);
  }

  deletePoint(updateType, deletePoint) {
    this.#points = this.#points.filter((point) => point.id !== deletePoint.id);

    this._notify(updateType, deletePoint);
  }
}
