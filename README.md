# curio

[![Build Status](https://travis-ci.org/brianoneil/curio.svg?branch=master)](https://travis-ci.org/brianoneil/curio)

A small server side string template engine.  String replacement engine that allow you to do property name based replacement in string templates from multiple JSON objects at a time.

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

You can pass multiple objects to it to use to render the template.  This makes it easy to process a template against several objects at a time.  
```javascript
var curio = require('curio');

var myTemplate = '{name.first} {name.last}{test.level1.level2}';
var user = {
    name :
        {first : 'hello', last : 'world'}
    };

var other = {
    test : {
        level1 : {
            level2 : '!'
        }
    }
};

var rendered = curio(myTemplate, user, other);

//now rendered == 'hello world!'
console.log(rendered);

```

*** The objects can't have name collisions  at the root level because they are merged into a single object. ***

I built this to do server side replacement on web hooks, but it is generally useful to just process strings.

* 0.1.0 Initial version of the library
