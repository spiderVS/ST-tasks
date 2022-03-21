# Deep copy

## Folder name: deep-copy

Your task is to implement the function copy that creates a copy of an object.

1. Usage of rest/spread operator is strictly forbidden
2. Your implementation should implement a 'deep' copy if some property is an object you should also copy it. (Pay attention to arrays)
3. Usage of any npm lib will result to -100%pts
4. Usage of `structuredClone` is strictly forbidden
5. Usage of `JSON.stringify`, `JSON.parse` is forbidden

Example:

```js
const obj = {
 a: 4,
 b: { 
  c: 5,
 },
};

const obj1 = copy(obj)

//obj1 is a newly created object
obj1 === obj // false;
obj1.b === obj.b // false;
```
