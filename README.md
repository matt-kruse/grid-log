# grid-log

A logging utility that handles multi-line strings.

`console.log()` does not display multi-line strings, nor does `console.table()`. This util lets you log strings in a grid format.

**Note:** The fonts used on npmjs.com do not render table characters correctly below. View examples at https://github.com/matt-kruse/grid-log#readme  

# Usage

#### 
```javascript
console.grid = require('grid-log');

const a = `This is\na multi-line\nstring`;
const b = {'this':'is','a':{'nested':'object'}};
const c = ['a','b','c','d','e','f'];
```

#### Example
```javascript
console.grid(a,b,c);
```

#### Output
```
┌──────────────┬────────────────────────┬────────┐
│ This is      │ {                      │ [      │
│ a multi-line │   "this": "is",        │   "a", │
│ string       │   "a": {               │   "b", │
│              │     "nested": "object" │   "c", │
│              │   }                    │   "d", │
│              │ }                      │   "e", │
│              │                        │   "f"  │
│              │                        │ ]      │
└──────────────┴────────────────────────┴────────┘
```

#### Example
```javascript
// Output multiple rows
// Number of columns don't need to match
console.grid.resetOptions();
console.grid([a],[b,c])
```

#### Output
```
┌────────────────────────┬────────┐
│ This is                │        │
│ a multi-line           │        │
│ string                 │        │
├────────────────────────┼────────┤
│ {                      │ [      │
│   "this": "is",        │   "a", │
│   "a": {               │   "b", │
│     "nested": "object" │   "c", │
│   }                    │   "d", │
│ }                      │   "e", │
│                        │   "f"  │
│                        │ ]      │
└────────────────────────┴────────┘
```

#### Example
```javascript
// Add a Header Row
console.grid(
    ['COLUMN 1','COLUMN 2','THIS IS A REALLY LONG COLUMN NAME'],
    [a,b],
    [,c]
);
```

#### Output
```
┌──────────────┬────────────────────────┬───────────────────────────────────┐
│ COLUMN 1     │ COLUMN 2               │ THIS IS A REALLY LONG COLUMN NAME │
├──────────────┼────────────────────────┼───────────────────────────────────┤
│ This is      │ {                      │                                   │
│ a multi-line │   "this": "is",        │                                   │
│ string       │   "a": {               │                                   │
│              │     "nested": "object" │                                   │
│              │   }                    │                                   │
│              │ }                      │                                   │
├──────────────┼────────────────────────┼───────────────────────────────────┤
│              │ [                      │                                   │
│              │   "a",                 │                                   │
│              │   "b",                 │                                   │
│              │   "c",                 │                                   │
│              │   "d",                 │                                   │
│              │   "e",                 │                                   │
│              │   "f"                  │                                   │
│              │ ]                      │                                   │
└──────────────┴────────────────────────┴───────────────────────────────────┘
```

#### Example
```javascript
// Change indent size for automatic JSON.stringify()
console.grid.options({jsonIndent: 4});
console.grid(a,b,c);
```

#### Output
```
┌──────────────┬────────────────────────────┬──────────┐
│ This is      │ {                          │ [        │
│ a multi-line │     "this": "is",          │     "a", │
│ string       │     "a": {                 │     "b", │
│              │         "nested": "object" │     "c", │
│              │     }                      │     "d", │
│              │ }                          │     "e", │
│              │                            │     "f"  │
│              │                            │ ]        │
└──────────────┴────────────────────────────┴──────────┘
```

#### Example
```javascript
// Left/Right padding on cells
console.grid.resetOptions().options({cellPadding: 4});
console.grid(a,b,c);
```

#### Output
```
┌────────────────────┬──────────────────────────────┬──────────────┐
│    This is         │    {                         │    [         │
│    a multi-line    │      "this": "is",           │      "a",    │
│    string          │      "a": {                  │      "b",    │
│                    │        "nested": "object"    │      "c",    │
│                    │      }                       │      "d",    │
│                    │    }                         │      "e",    │
│                    │                              │      "f"     │
│                    │                              │    ]         │
└────────────────────┴──────────────────────────────┴──────────────┘
```

#### Example
```javascript
// Use ascii grid characters
console.grid.resetOptions().options({ascii:true});
console.grid(a,b,c);
```

#### Output
```
+--------------+------------------------+--------+
| This is      | {                      | [      |
| a multi-line |   "this": "is",        |   "a", |
| string       |   "a": {               |   "b", |
|              |     "nested": "object" |   "c", |
|              |   }                    |   "d", |
|              | }                      |   "e", |
|              |                        |   "f"  |
|              |                        | ]      |
+--------------+------------------------+--------+
```

#### Example
```javascript
// Return a string instead of calling console.log()
console.grid.resetOptions().options({consoleLog:false});
let log = console.grid(a,b,c);
console.info("The output is:\n"+log);
```

#### Output
```
The output is:
┌──────────────┬────────────────────────┬────────┐
│ This is      │ {                      │ [      │
│ a multi-line │   "this": "is",        │   "a", │
│ string       │   "a": {               │   "b", │
│              │     "nested": "object" │   "c", │
│              │   }                    │   "d", │
│              │ }                      │   "e", │
│              │                        │   "f"  │
│              │                        │ ]      │
└──────────────┴────────────────────────┴────────┘
```
