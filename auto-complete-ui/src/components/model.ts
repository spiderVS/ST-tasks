import { createAutoComplete } from '../../../auto-complete/index';
import cities from '../data/cities.json'

export class Model {

  getData(request: string): Array<string> {
    const autocomplete: (str: string) => Array<string> | [] = createAutoComplete(cities);
    return autocomplete(request);
  }
}
