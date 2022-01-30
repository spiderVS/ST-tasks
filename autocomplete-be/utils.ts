import fs from 'fs';
const fsPromises = fs.promises;
import { createAutoComplete } from '../auto-complete/index';

const DATABASE_FILE = 'cities.json';
const HEX = 16;

export class AutocompleteUtils {
  private cities: string[];
  private lastModified: Date;
  public etag: string;

  constructor() {
    this.cities = [];
    this.lastModified = new Date();
    this.etag = '';
  }

  private async checkDate(): Promise<Date> {
    try {
      const stats = await fsPromises.stat(DATABASE_FILE);
      return stats.mtime;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  private readFile(path: string): Promise<string[]> {
    return new Promise((res, rej) => {
      let data = '';
      const readStream = fs.createReadStream(path, 'utf8');
      readStream
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          res(JSON.parse(data));
        })
        .on('error', (error) => rej(error));
    });
  }

  public async createAutocomplete(): Promise<(str: string) => string[]> {
    const lastModified = await this.checkDate();
    if (lastModified.getTime() !== this.lastModified.getTime()) {
      this.lastModified = lastModified;
      this.cities = await this.readFile(DATABASE_FILE);
      this.etag = '';
    }
    return createAutoComplete(this.cities);
  }

  public generateEtag(body: string): string {
    let etag = 0;
    for (let i = 0, length = body.length; i < length; i++) {
      etag += body[i].charCodeAt(0);
    }
    this.etag = etag.toString(HEX);
    return this.etag;
  }
}
