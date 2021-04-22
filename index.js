var debugP = require('debug')('curio:process'),
    debugG = require('debug')('curio:internal'),
    debug = require('debug');

function curio(template, data) {

    if (!template) {
        return template;
    }

    return template.replace(/\{([\w\.\|]*)\}/g, function (str, key) {

        var cmd = null;
        if (key.match(/.*\|.*/)) {

            //this contains a command, we need to process the command

            var valsAndCmds = key.split('|');
            key = valsAndCmds[0];
            cmd = valsAndCmds[1];

            if (debug.enabled('curio:internal')) {
                debugG(`key: ${valsAndCmds[0]} cmds: ${valsAndCmds[1]}`);
            }
        }

        var keys = key.split("."), v = data[keys.shift()];

        for (var i = 0, l = keys.length; i < l; i++) {
            v = v[keys[i]];
        }

        var ret = (typeof v !== "undefined" && v !== null) ? v : str;

        ret = processCmd(cmd, ret);

        return ret
    });
}

function processCmd(cmd, value) {

    if (!cmd) return value;

    processedValue = value;

    switch (cmd) {
        case 'LOWER':
            processedValue = value.toLowerCase();
            break;
        case 'UPPER':
            processedValue = value.toUpperCase();
            break;
        default:
            break;
    }
    return processedValue;
}

function mergeProps(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function processArguements(args) {

    if (debug.enabled('curio:process')) {
        debugP('found %s objects to process. \nObject:\n%s', args.length, JSON.stringify(args, null, 4));
    }

    var combinedProps = {};

    for (var i = 0; i < args.length; i++) {
        debugP('processing arg: %s', JSON.stringify(args[i], null, 4));
        combinedProps = mergeProps(combinedProps, args[i])
    };

    debugP('processed object: %s', JSON.stringify(combinedProps, null, 4));

    return combinedProps;
}

module.exports = function (template, data) {
    //debugG('template: %s', template);

    if (debug.enabled('curio:process')) {
        debugP('arguments(%s): %s', arguments.length, JSON.stringify(arguments, null, 4));
    }

    var renderedTemplate = template;

    if (arguments.length > 2) {
        //get the arguements, not including the template
        var dataObjects = Array.prototype.slice.call(arguments, 1);
        //replace the org data object with one that has all the properties on a single one
        data = processArguements(dataObjects);
    }

    renderedTemplate = curio(template, data);


    return renderedTemplate;
}
