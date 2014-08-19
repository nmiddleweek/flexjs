/*
Caveats:
--------

Constructor functions must NOT be anonymous.
Methods must NOT be anonymous.
Can't call this.SUPER() from a constructor function

TODO:
-----


*/

if(!window.console){
    window.console = {
        'log' : function(msg){
            var args = arguments;
            var getArgs = function(){
                var str = '';
                for(var i=0; i < args.length; i++){
                    str = str + args[i] + ' ';
                }
                return str.substr(0, str.length-1);
            };
            document.writeln(getArgs() + '<hr/>');
        }
    };
}

var JSObject = function JSObject(){ // constructor
    this.constructor = JSObject;
    if(this === window){
        throw new Error('Constructor Function Error','This is a constructor function, you need to use the new keyword.');
    }

};
JSObject.prototype.trace = function trace(text){
  console.log2('JSObject.trace()', text);
};
JSObject.prototype.getPrototypeChain = function getPrototypeChain(){
  var str = this.constructor.toString().match(/function\W*\w*/)[0].replace(/function\W*/,''),
  __super = this.constructor.prototype
  ;

  while(__super !== __super.constructor.prototype){
      str += '.' + __super.constructor.toString().match(/function\W*\w*/)[0].replace(/function\W*/,'');
      __super = __super.constructor.prototype;
      }

      return str;

};
JSObject.prototype.SUPER = (function SUPER(){

    console.log('parse SUPER');
    var ret = function SUPER(){
        var self = this,
        args = arguments,
        callingFunctionName = arguments.callee.caller.toString().match(/function\W*\w*/)[0].replace(/function\W*/,''), // What JS optimzations does this prevent? Is it an issue here?
        superClass = this.constructor.prototype,
        superClassName = superClass.constructor.toString().match(/function\W*\w*/)[0].replace(/function\W*/,''),
        getArguments = function(){
            return args;
        },
        getSuper = function(){
            //console.log('counter: ', counter++);
            if( (this.__prototypeChain === undefined) || (this.__prototypeChain.length === 0) ) {
                this.__prototypeChain = (this.__prototypeChainCache !== undefined) ? this.__prototypeChainCache.split('.') : ( this.__prototypeChainCache = this.getPrototypeChain() ).split('.');
                this.__prototypeChain.shift(); // Remove the Current Prototype so it doesn't call itself again.
            }

            return this.__prototypeChain.shift();
        },
        superClassName = getSuper.call(this),
        statement = superClassName + '.prototype.' + callingFunctionName + '.apply(self, getArguments.call(self))';

        if(superClassName === undefined){
            this.__prototypeChain = undefined;
            return;
        }

        //console.log('1a: ' + superClass);
        //console.log('1b: ' + this.constructor);
        //this.constructor.prototype.dispatch()
        //console.log('2a: ' + this.constructor.prototype.constructor);
        //console.log('2b: ' + this.constructor.prototype.dispatch);
        //console.log('3a: ' + this.constructor.prototype.constructor.prototype.constructor);
        //console.log('3b: ' + this.constructor.prototype.constructor.prototype.constructor.prototype.constructor);
        //console.log('3c: ' + statement);
        if(superClass.hasOwnProperty( callingFunctionName )){
            try{
                eval(statement); // What are the negatives of eval, does it exist in Angular or Backbone ?
            }
            catch(evt){
                throw new Error('Ooops!... The SUPER method \''+ callingFunctionName +'\' does not exist in \'' + superClassName + '\'.');
                this.__prototypeChain = undefined;
            }
        }
        else{
            this.__prototypeChain = undefined;
        }
        console.log('exit SUPER');
    },
    counter = 0,
    stack = 'hi';

    return ret;

}());


var EventDispatcher = function EventDispatcher(){ // constructor
    JSObject.apply(this, arguments);
    this.constructor = EventDispatcher;
};
EventDispatcher.prototype = new JSObject(); // Extends

EventDispatcher.prototype.dispatch = function dispatch(){
  console.log('dispatch');
};

EventDispatcher.prototype.trace = function trace(text){
  console.log('EventDispatcher.trace()', text);
  this.SUPER(text);
};


var UIComponent = function UIComponent(){ // constructor
    EventDispatcher.apply(this, arguments);
    this.constructor = UIComponent;
};
UIComponent.prototype = new EventDispatcher(); // Extends

UIComponent.prototype.renderer = function renderer(){
  console.log('renderer');
};

UIComponent.prototype.trace = function trace(text){
  console.log('UIComponent.trace()', text);
  //this.SUPER().trace(text);
  this.SUPER(text);
};


var ImageViewer = function ImageViewer(){ // constructor
    UIComponent.apply(this, arguments);
    this.constructor = ImageViewer;
};
ImageViewer.prototype = new UIComponent(); // Extends

ImageViewer.prototype.zoom = function zoom(){
  console.log('zoom');
};

ImageViewer.prototype.trace = function trace(text){
  console.log('ImageViewer.trace()', text);
  //this.SUPER().trace(text);
  this.SUPER(text);
};


//JSObject();


var obj = new ImageViewer();
obj.trace('hi');
obj.trace('hi there');

