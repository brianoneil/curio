var assert = require("assert");
var curio = require('../index.js')

describe('Curio Template Processing', function(){

  describe('process a simple string from a single object', function(){
    it('should replace the field in the template', function(){
        var myTemplate = 'hello {userName}';
        var user = {userName : 'world'};

        assert.equal('hello world', curio(myTemplate, user));

    });

    it('should replace the field in the template and make them upper case', function () {
        var myTemplate = 'hello {userName|UPPER}';
        var user = { userName: 'world' };

        assert.equal('hello WORLD', curio(myTemplate, user));

    });

    it('should replace the field in the template and make them lower case', function () {
        var myTemplate = 'hello {userName|LOWER}';
        var user = { userName: 'World' };

        assert.equal('hello world', curio(myTemplate, user));

    });

    it('should replace both the fields in the template', function(){
        var myTemplate = '{userName} hello {userName}';
        var user = {userName : 'world'};

        assert.equal('world hello world', curio(myTemplate, user));

    });

    it('should replace the field in the template from a sub object', function(){
        var myTemplate = 'hello {user.name}';
        var user = {user : {name : 'world'}};

        assert.equal('hello world', curio(myTemplate, user));

    });

    it('should replace both fields in the template from a single object with sub objects', function(){
        var myTemplate = '{name.first} {name.last}';
        var user = {name : {first : 'hello', last : 'world'}};

        assert.equal('hello world', curio(myTemplate, user));

    });
  });

  describe('process a simple string from two objects', function(){

      it('should replace the fields in the template from 2 objects', function(){
          var myTemplate = '{first} {last}';
          var name1 = {first : 'hello'},
              name2 = {last : 'world'};

          assert.equal('hello world', curio(myTemplate, name1, name2));

      });
      it('should replace both the fields in the template from a single property', function(){
          var myTemplate = '{first} {last} {first}';
          var name1 = {first : 'hello'},
              name2 = {last : 'world'};

          assert.equal('hello world hello', curio(myTemplate, name1, name2));

      });

      it('should replace the field in the template from a sub object', function(){
          var myTemplate = '{user1.name} {user2.name}';
          var obj1 = {user1 : {name : 'hello'}};
          var obj2 = {user2 : {name : 'world'}};

          assert.equal('hello world', curio(myTemplate, obj1, obj2));

      });

      it('should replace both fields in the template from a single object with sub objects', function(){
          var myTemplate = '{name.first} {name.last}{test.level1.level2}';
          var user = {name : {first : 'hello', last : 'world'}};
          var other = {test : {level1 : { level2 : '!'}}}

          assert.equal('hello world!', curio(myTemplate, user, other));

      });


  });
})
