import { Model } from './model';
import { View } from './view';

export class Controller {
  private model: Model;
  private view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  search(requestStr: string): void {
    const data = this.model.getData(requestStr);
    const scrollableList = this.view.renderResult(data);
    if (scrollableList) {
      this.setScrollListener(data, scrollableList);
    }
  }

  setScrollListener(data: string[], list: HTMLElement) {
    list.addEventListener('scroll', () => {
      if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
        this.view.viewMore(data);
      }
    });
  }

  start(): void {
    const input = this.view.render();
    input.addEventListener("input", () => {
      this.search(input.value);
    });
  }
}
