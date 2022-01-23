import fs = require('fs');
import path = require('path');
import { pipeline } from 'stream';
import jsonToCsv from './jsonToCsv';

const inputFile: string = path.join(__dirname, process.argv[2]);
const outputFile: string = path.join(__dirname, process.argv[3]);
const readableStream = fs.createReadStream(inputFile, 'utf8');
const writableStream = fs.createWriteStream(outputFile);

const transformStream = new jsonToCsv();

pipeline(readableStream, transformStream, writableStream, (err) => {
  if (err) console.error('An error occured: ', err);
});
