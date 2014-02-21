if(!window.console){
    window.console = {
        'log' : function(msg){
            document.writeln(msg + '<hr/>')
        }
    };
}

var JSObject = function JSObject(){ // constructor
    this.constructor = JSObject;
    if(this === window){
        throw new Error('Constructor Function Error','This is a constructor function, you need to use the new keyword.')
        return;
    }

}
JSObject.prototype.trace = function trace(text){
  //console.log('JSObject.trace()', text);
}
JSObject.prototype.SUPER = (function SUPER(){

    console.log('parse SUPER');
    var ret = function SUPER(){
        var self = this,
        args = arguments,
        callingFunctionName = arguments.callee.caller.name,
        superClass = this.constructor.prototype,
        superClassName = superClass.constructor.name,
        getArguments = function(){
            return args;
        },
        statement = superClassName + '.prototype.' + callingFunctionName + '.apply(self, getArguments());';

        console.log('1a: ' + superClass);
        console.log('1b: ' + this.constructor);
        this.constructor.prototype.dispatch()
        console.log('2a: ' + this.constructor.prototype.constructor);
        console.log('2b: ' + this.constructor.prototype.dispatch);
        console.log('3a: ' + this.constructor.prototype.constructor.prototype.constructor);
        console.log('3b: ' + this.constructor.prototype.constructor.prototype.constructor.prototype.constructor);
        console.log('3c: ' + statement);
        if(superClass.hasOwnProperty( callingFunctionName )){
            eval(statement);
        }
    },
    counter = 100,
    stack = 'hi';

    return ret;

}());


var EventDispatcher = function EventDispatcher(){ // constructor
    JSObject.apply(this, arguments);
    this.constructor = EventDispatcher;
}
EventDispatcher.prototype = new JSObject(); // Extends

EventDispatcher.prototype.dispatch = function dispatch(){
  console.log('dispatch');
}

EventDispatcher.prototype.trace = function trace(text){
  console.log('EventDispatcher.trace()', text);
  //this.SUPER(text);
}


var UIComponent = function UIComponent(){ // constructor
    EventDispatcher.apply(this, arguments);
    this.constructor = UIComponent;
}
UIComponent.prototype = new EventDispatcher(); // Extends

UIComponent.prototype.renderer = function renderer(){
  console.log('renderer');
}

UIComponent.prototype.trace = function trace(text){
  console.log('UIComponent.trace()', text);
  //this.SUPER().trace(text);
  this.SUPER(text);
}


//JSObject();

//var jsObject = new JSObject();
//jsObject.trace();

var uiComp = new UIComponent();
uiComp.trace('hello');


if(false)
{
(function test(){

    var fn = arguments.callee;
    console.log('1: ' + fn.prototype);

    var arrGuments = Array.prototype.slice.apply(arguments);
    console.log('args.len: ' + arrGuments.length);

    if(arguments.callee.caller === null) {
      arguments.callee.apply(window, ['hi', 'bye']);

    }
    else {
      console.log('"' + arguments.callee.caller.toString().match(/function\W*\w*/)[0].replace(/function\W*/,'') + '"');
      console.log('"' + arguments.callee.caller.name + '"');

      //    JSObject();

      var jsObject = new JSObject();

      //jsObject.trace();
      var uiComp = new UIComponent();
      uiComp.trace('hello');

    }


  }());

}
