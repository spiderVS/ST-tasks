# Load

## Folder name: load


**Task:** to implement a **'custom'** version of the fetch.

**Example:**

```js
load('https://google.com', /* Options */ {
  method: 'POST', /* one of the HTTP verbs, 'GET' by default */,
  body /* Object, optional */,
  responseType /* Stirng, optional, 'json' by default */
}).then((/* custom response */ { status /* HTTP Sttatus */, body /* response of the given type */, statusText }) => constole.log(body))
```

### Requirements

- **Usage of the `fetch` is strictly forbidden**
- **Usage of `async/await` is strictly forbidden**
- Your function should support all response types that are supported by XMLHttpRequest
