const DONE: number = 4;

interface IOptions {
  readonly method?: string;
  readonly body?: Document | XMLHttpRequestBodyInit | null;
  readonly responseType?: XMLHttpRequestResponseType;
  readonly signal?: AbortSignal;
}

type AnyJson =  boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

type responseBody = ArrayBuffer | Blob | Document | AnyJson | string;

interface ICustomResponse {
  readonly status: number;
  readonly body: responseBody;
  readonly statusText: string;
}

interface XMLHttpRequestTyped extends XMLHttpRequest {
  readonly response: responseBody;
}

class CustomResponse implements ICustomResponse {
  readonly status: number;
  readonly body: responseBody;
  readonly statusText: string;
  constructor(status: number, body: responseBody, statusText: string) {
    this.status = status;
    this.body = body;
    this.statusText = statusText;
  }
}

const load = (url: string | URL, options: IOptions = {}): Promise<CustomResponse> => {
  return new Promise((res, rej) => {
    const signal = options.signal || null;

    if (signal && signal.aborted) {
      return rej(new Error('AbortError'));
    }
    const method = options.method || 'GET';
    const body = options.body || null;
    const responseType = options.responseType || 'json';

    const xhr: XMLHttpRequestTyped = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method, url, true);
    xhr.responseType = responseType;
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const abort = (): void =>{
      xhr.abort();
    }

    xhr.send(body);

    if (signal) {
      signal.addEventListener("abort", abort);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === DONE) {
          signal.removeEventListener("abort", abort);
        }
      };
    }

    xhr.onload = () => {
      const responseObject: ICustomResponse = new CustomResponse(xhr.status, xhr.response, xhr.statusText);
      res(responseObject);
    };
    xhr.onerror = () => {
      const responseObject: ICustomResponse = new CustomResponse(xhr.status, xhr.response, xhr.statusText);
      rej(responseObject);
    };
    xhr.onabort = () => {
      rej(new Error('The user aborted a request'));
    };
  });
}
