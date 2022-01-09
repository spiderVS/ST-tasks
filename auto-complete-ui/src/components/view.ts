const CONTAINER_CLASSNAME = 'container';
const INPUT_CLASSNAME = 'search-bar';
const RESULTS_LIST_CLASSNAME = 'results-list';
const NUM_OF_ITEMS = 20;

export class View {
  private container!: HTMLDivElement;
  private currentNum = 0;

  renderResult(result: string[] | []): HTMLElement | null {
    this.removeListIsExists();
    if (result.length !== 0) {
      this.currentNum = 0;
      const resultsList = document.createElement('ul');
      resultsList.className = RESULTS_LIST_CLASSNAME;
      const listOfItems = this.createList(result);
      resultsList.append(listOfItems);
      this.container.append(resultsList);
      if (result.length > NUM_OF_ITEMS) return resultsList;
    }
    return null;
  }

  createList(result: string[], currentNum = 0): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const endElem = currentNum + NUM_OF_ITEMS;
    for (currentNum; currentNum < endElem && currentNum < result.length; currentNum++) {
      const listItem: HTMLElement = this.createListItem(result[currentNum]);
      fragment.append(listItem);
    }
    return fragment;
  }

  createListItem(text: string): HTMLElement {
    const item = document.createElement('li');
    item.className = 'item';
    item.innerText = text;
    return item;
  }

  viewMore(data: string[]) {
    this.currentNum += NUM_OF_ITEMS;
    const listAppend = this.createList(data, this.currentNum);
    this.container.querySelector(`.${RESULTS_LIST_CLASSNAME}`)?.append(listAppend);
  }

  removeListIsExists(): void {
    const list = this.container.querySelector(`.${RESULTS_LIST_CLASSNAME}`);
    if (list) list.remove();
  }

  render(): HTMLInputElement {
    this.container = document.createElement('div');
    this.container.className = CONTAINER_CLASSNAME;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Please enter text';
    input.className = INPUT_CLASSNAME;
    input.value = '';

    document.body.append(this.container);
    this.container.append(input);
    input.focus();

    return input;
  }
}
