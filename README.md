# 1. Auto Complete

## Folder name: auto-complete

Your task is to implement a custom createAutoComplete function and **implement the fastest algorithm**. 
The function should get an array of strings as input and work as in the example below:

```js
const data = [
 'java',
 'javascript',
 'python',
];

const autocomplete = createAutoComplete(data);

autocomplete('ja'); // returns [ 'java', 'javascript']
autocomplete('javas'); // returns [ 'javascript']
autocomplete('p'); // returns [ 'python']
```

Please note that your index file should contain one export createAutocomplete.

You can find [test and examples here](https://github.com/Shastel/autocomplete-tests).

Please run tests with your code before submitting PR, your mark depends on it.

### My result:

![изображение](https://user-images.githubusercontent.com/79773329/159160741-0744c5be-67d0-4e42-879c-70dcf30129cc.png)

---

# 2. Deep copy

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
