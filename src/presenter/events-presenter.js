import PointsListView from '../view/points-list-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { RenderPosition, render } from '../render.js';

const POINTS_NUMBER = 3; // количество отрисовываемых точек маршрута

export default class EventsPresenter {
  eventsPoint = new PointView(); // точка маршрута
  pointsList = new PointsListView(); // список для точек маршрута

  constructor({pointsListContainer}) {
    this.pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
  }

  init() {
    render(this.pointsList, this.pointsListContainer); // вставляем список в контейнер

    for(let i = 0; i < POINTS_NUMBER; i++) {
      render(new PointView(), this.pointsList.getElement()); // добавляем в список три точки
    }

    render(new EditPointView(), this.pointsList.getElement(), RenderPosition.AFTERBEGIN); // вставляем в начало списка форму редактирования точки
    render(new AddNewPointView(), this.pointsList.getElement()); // вставляем в список форму добавления новой точки
  }
}
