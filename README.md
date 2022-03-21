# TODO List BE

## Folder name: todolist-be

**Task: to implement an API for managing a to-do list.**

**Approximate model:**

```js
message String required,
completed Boolean,
id String|ObjectId,
```

**Required api:**

`GET /todos/?(page=1&limit=10) returns all todos`

`GET /todos/:id return one todo by id`

`POST /todos creates a todo`

`PATCH /todos/:id patches todo by id`

`DELETE /todos/:id deletes todo by id`

**Requirements:**

- App should be written using TypeScript.
- Logging with some middleware is required.
- Cors is required.
- Usage of dotenv for configuration is mandatory.
- You are supposed to use meaningful HTTP codes.

**Extra:**
- Use stream for serving data for GET method
