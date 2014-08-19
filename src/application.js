
//JSObject();

var obj = new ImageViewer();
try{
    obj.trace('hi');
}
catch(evt){
    console.log(evt.name, evt.message);
}
