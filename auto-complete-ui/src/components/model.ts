import { createAutoComplete } from '../../../auto-complete/index';
import cities from '../data/cities.json'

export class Model {

  private autocomplete: (str: string) => Array<string> | [];

  constructor() {
    this.autocomplete = createAutoComplete(cities);
  }

  getData(request: string): Array<string> {
    return this.autocomplete(request);
  }
}
