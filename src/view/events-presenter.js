import PointsListView from './points-list-view.js';
import AddNewPointView from './add-new-point-view.js';
import EditPointView from './edit-point-view.js';
import PointView from './point-view.js';
import { RenderPosition, render } from '../render.js';

export default class EventsPresenter {
  eventsPoint = new PointView();
  pointsList = new PointsListView();

  constructor({pointsListContainer}) {
    this.pointsListContainer = pointsListContainer;
  }

  init() {
    render(this.pointsList, this.pointsListContainer);

    for(let i = 0; i < 3; i++) {
      render(new PointView(), this.pointsList.getElement());
    }

    render(new EditPointView(), this.pointsList.getElement(), RenderPosition.AFTERBEGIN);
    render(new AddNewPointView(), this.pointsList.getElement());
  }
}
