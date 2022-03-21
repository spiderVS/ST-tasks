#  json2csv

## Folder name: json2csv

**Task:** to implement a cli tool that conversts `.json` file to `.csv`. Use Typescript.


**Example of usage**

```bash
node index.js input.json output.csv
```
Where input.json has the following structure:

```js
[{
  id: '1',
  name: 'Batman',
  car: 'Batmobile'
}, {
  id: '2',
  car: 'lada',
}]
```

**Result:**

```js
id,name,car\n
1,Batman,Batmobile\n
2,,lada\n
```

**Requirements:**

You should always take columns from the first object in the list.

**Extra:**

- Usage of custom stream.
