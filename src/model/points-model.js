import { getRandomPoint } from '../mock/mock-points.js';

const POINTS_NUMBER = 3; // количество отрисовываемых точек маршрута

export default class PointsModel {
  points = Array.from({ length: POINTS_NUMBER }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
