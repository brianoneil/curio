# curio
A small server side string template engine.  String replacement engine that allow you to do property name based replacement in string templates from multiple objects at a time.

```npm install --save curio```

A simple example:
```javascript
var curio = require('curio');

var myTemplate = 'hello {userName}';
var user = {userName : 'world'};

var rendered = curio(myTemplate, user);

//now rendered == 'hello world'
console.log(rendered);

```

You can pass multiple objects to it to use to render the template.  This makes it easy to process a template
