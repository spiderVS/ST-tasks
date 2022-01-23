import { Transform } from 'stream';

type TransformCallback = (error?: Error | null, data?: string) => void;
type jsonValues = string | number | boolean | null;

export default class jsonToCsv extends Transform {
  private isGetColumns: boolean;
  private brokenTail: string;
  private columns: Array<string>;
  private currentChunkDataObjects: RegExpMatchArray;

  constructor(options = {}) {
    options = Object.assign({}, options, { decodeStrings: false });
    super(options);
    this.isGetColumns = false;
    this.columns = [];
    this.brokenTail = '';
    this.currentChunkDataObjects = [];
  }

  _transform(
    chunk: string,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    let resultString = '';
    const currentChunk = this.brokenTail ? this.brokenTail + chunk : chunk;
    this.brokenTail = '';

    const objRegex = /\{[\s\S]*?\}/g;
    this.currentChunkDataObjects = currentChunk.match(objRegex) || [];
    const unbrokenObjRegex = /^[\s\S]*\{[\s\S]*\},?\s*\]?\s*/;
    this.brokenTail = currentChunk.replace(unbrokenObjRegex, '');

    if (!this.isGetColumns && this.currentChunkDataObjects.length > 0) {
      const firstObject = this.currentChunkDataObjects[0];
      this.columns = Object.keys(JSON.parse(firstObject));
      if (this.columns.length > 0) {
        resultString += this.columns.join(',') + '\n';
      }
      this.isGetColumns = true;
    }

    if (this.columns.length > 0) {
      resultString += this.objectsToCsv();
    }

    this.push(resultString);
    callback();
  }

  objectsToCsv() {
    let values: Array<jsonValues> = [];
    let csvBlock = '';
    this.currentChunkDataObjects.forEach((obj) => {
      const currentObject: { [key: string]: jsonValues } = JSON.parse(obj);
      this.columns.forEach((column) => {
        const value = currentObject[column];
        if (value !== undefined) values.push(value);
        else values.push('');
      });
      csvBlock += values.join(',') + '\n';
      values = [];
    });
    return csvBlock;
  }
}
