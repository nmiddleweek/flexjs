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
