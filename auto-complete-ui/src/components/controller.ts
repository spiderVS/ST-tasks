import { Model } from './model';
import { View } from './view';

export class Controller {
  private model: Model;
  private view: View;

  private list: HTMLElement | null = null;
  public data: string[] = [];

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  search(requestStr: string): void {
    const data = this.model.getData(requestStr);
    const scrollableList = this.view.renderResult(data);
    if (scrollableList) {
      this.list = scrollableList;
      this.data = data;
      this.setScrollListener();
    }
  }

  scrollHandler = () => {
    if (this.list) {
      if (this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight) {
        this.view.viewMore(this.data);
      }
    }
  }

  setScrollListener() {
    if (this.list) {
      this.list.addEventListener('scroll', this.scrollHandler);
    }
  }

  start(): void {
    const input = this.view.render();
    input.addEventListener("input", () => {
      if (this.list) {
        this.list.removeEventListener('scroll', this.scrollHandler);
      }
      this.list = null;
      this.data = [];
      this.search(input.value);
    });
  }
}
