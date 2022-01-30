import http from 'http';
import { URL } from 'url';
import { AutocompleteUtils } from './utils';

const NOT_FOUND = 404;
const NOT_MODIFIED = 304;
const OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const PORT = process.env.PORT || 3000;
const SERVER_ORIGIN = `http://localhost:${PORT}`;

const utils: AutocompleteUtils = new AutocompleteUtils();

const server = http.createServer(async (req, res) => {
  try {
    const autocomplete = await utils.createAutocomplete();

    const reqUrl = req.url ? new URL(req.url, SERVER_ORIGIN) : new URL('');
    const queryData = reqUrl.searchParams.get('complete');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method === 'GET' && queryData !== null) {
      const { headers } = req;
      const ifNoneMatch = headers['if-none-match'];

      if (utils.etag !== ifNoneMatch) {
        const responseData = autocomplete(queryData);
        const responseDataStr = JSON.stringify(responseData);
        const eTag = utils.generateEtag(responseDataStr);
        res.writeHead(OK, {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8',
          ETag: eTag
        });
        res.write(responseDataStr);
      } else {
        res.statusCode = NOT_MODIFIED;
      }
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.statusCode = NOT_FOUND;
      res.write('404 - Not found');
    }
  } catch (err) {
    const errorMessage = (err as Error).message;
    console.log('ERROR:', errorMessage);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    if (errorMessage.includes('ENOENT')) {
      res.writeHead(INTERNAL_SERVER_ERROR, {
        'X-Error-Message': 'Error reading the database file'
      });
    } else {
      res.writeHead(INTERNAL_SERVER_ERROR, {
        'X-Error-Message': 'Unknown server error'
      });
    }
    res.write('500 - Internal server error');
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
