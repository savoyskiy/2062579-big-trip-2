import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { SortingTypes, sortPrice, sortDay, sortTime, UserAction, UpdateType } from '../utils/utils.js';

export default class EventsPresenter {
  #pointsList = new PointsListView(); // список для точек маршрута

  #pointsListContainer = null;
  #pointsModel = null;
  // #eventsPoints = []; // ?
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map(); // коллекция с точками маршрута
  #sortComponent = null;
  #currentSortType = SortingTypes.DAY;

  constructor({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    // this.#eventsPoints = [...this.#pointsModel.points]; // ?
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderEventsList();
  }

  /**
   * метод рендеринга пустого списка для точек
   */
  #renderPointList() {
    render(this.#pointsList, this.#pointsListContainer);
  }

  /**
   * метод рендеринга заглушки
   */
  #renderNoPoint() {
    render(new NoPointView(), this.#pointsListContainer);
  }

  /**
   * метод сортировки точек
   * @param {*} sortType
   */
  #sortPoints(sortType) {
    switch (sortType) {
      case SortingTypes.DAY:
        this.#pointsModel.points.sort(sortDay);
        break;
      case SortingTypes.TIME:
        this.#pointsModel.points.sort(sortTime);
        break;
      case SortingTypes.PRICE:
        this.#pointsModel.points.sort(sortPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) { // проверяем какой тип сортировки выбран сейчас, если совпадает с выбранным - не перерисовываем список
      return;
    }
    this.#sortPoints(sortType); // сортируем задачи
    this.#clearPointsList(); // очищаем список
    this.#renderPoints(); // отрисовываем точки
  };

  /**
   * метод очистки списка точек
   */
  #clearPointsList({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    if (resetSortType) {
      this.#currentSortType = SortingTypes.DAY;
    }
  }

  /**
   * метод рендеринга сортировки
   */
  #renderSorting() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * метод обновления данных при ручном изменении пользователем
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelChange = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this.#clearPointsList();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (при переключении фильтра)
        this.#clearPointsList({resetSortType: true});
        this.#renderPoints();
        break;
    }
  };

  /**
   * метод закрытия карточек в режиме редактирования (чтобы была открыта только одна)
   */
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * метод отрисовки точек маршрута
   */
  #renderPoints() {
    for(let i = 0; i < this.#pointsModel.points.length; i++) { // вставляем в список точки маршрута
      const pointPresenter = new PointPresenter(this.#pointsModel.points[i], this.#destinations, this.#offers, this.#handleViewAction, this.#handleModeChange, this.#pointsList);
      pointPresenter.init(this.#pointsModel.points[i]);
      this.#pointPresenters.set(this.#pointsModel.points[i].id, pointPresenter); // заполняем коллекцию точек маршрута
    }
  }

  /**
   * метод рендеринга списка точек
   */
  #renderEventsList() { // метод отрисовки списка точек маршрута и сортировки
    this.#renderPointList(); // вставляем список в контейнер

    this.#sortPoints(SortingTypes.DAY); // сортируем задачи по датам
    this.#renderPoints(); // рендерим точки

    if(this.#pointsList.element.children.length === 0) { // проверка наличия точек маршрута
      this.#renderNoPoint(); // если их нет, рендерим заглушку
    } else {
      this.#renderSorting(); // если точки есть, добавляем сортировку
    }
  }
}
