
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
