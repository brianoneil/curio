# curio

[![Build Status](https://travis-ci.org/brianoneil/curio.svg?branch=master)](https://travis-ci.org/brianoneil/curio)

A small server side string template engine.  String replacement engine that allow you to do property name based replacement in string templates from multiple JSON objects at a time.

##Installation

```npm install --save curio```

##Usage

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

_NEW_ basic string commands can now be applied in the template.  
Supported commands are currently **UPPER** and **LOWER**

```javascript
var curio = require('curio');

var myTemplate = 'hello {userName|UPPER}';
var user = {userName : 'world'};

var rendered = curio(myTemplate, user);

//now rendered == 'hello WORLD'
console.log(rendered);

```

***The objects can't have name collisions  at the root level because they are merged into a single object.***

I built this to do server side replacement on web hooks, but it is generally useful to just process strings.

* 1.2.0 Added check for bad template data (`null` and `undefined`) and supporting tests
* 1.1.0 Added basic command support for UPPER and LOWER
* 1.0.0 Updated reference for debug
* 0.2.1 readme update
* 0.2.0 Changed logging behavior to only stringify objects when debug is enabled for the `curio:process` namespace
* 0.1.0 Initial version of the library



