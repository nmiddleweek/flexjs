var EventDispatcher = function EventDispatcher(){ // constructor
    JSObject.apply(this, arguments);
    this.constructor = EventDispatcher;
};
EventDispatcher.prototype = new JSObject(); // Extends

EventDispatcher.prototype.dispatch = function dispatch(){
  console.log('dispatch');
};

EventDispatcher.prototype.trace2 = function trace(text){
  console.log('EventDispatcher.trace()', text);
  this.SUPER(text);
};
