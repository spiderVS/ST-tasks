# Autocomplete Backend

## Folder name: autocomplete-be

**Task:** to implement a backend for your auto-complete function. Backend should implement following api:

```js
GET /?complete=java
```

as response expected to get all suggestions for `java`

### Requirements:

1. You are not allowed to use any framework to work with HTTP server (express/koa/sails)
1. Response must be a valid JSON with a valid contentType header.
1. All uknown URLs must return 404
1. You must use cities.json as a data for engine.
1. You are only allowed to change the export statement (if required) in your original autocomplete.
1. Usage of TS is required

**Extras:**

- HTTP cache headers (static)
- HTTP cache headers (dynamic, last modified changes when cities.json changes)
- Deployment (somewhere, link in PR)

---

### My deploy: https://autocomplete-be-spidervs.herokuapp.com/?complete=
You can use browser or `fetchAPI` for example. 

Change query `complete` and see result:

`?complete=au`


If you choose `fetch`: 

`fetch('https://autocomplete-be-spidervs.herokuapp.com/?complete=aus').then(res => res.json()).then(data => console.log(data))`
