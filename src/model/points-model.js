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

  updatePoint(updateType, updatedPoint) {
    this.#points = updateItem(this.#points, updatedPoint);

    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, addedPoint) {
    this.#points.push(addedPoint);

    this._notify(updateType, addedPoint);
  }

  deletePoint(updateType, deletedPoint) {
    this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);

    this._notify(updateType, deletedPoint);
  }
}
