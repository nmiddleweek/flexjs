/*
(function test(){

    var fn = arguments.callee;
    console.log('1: ' + fn.prototype);

    var arrGuments = Array.prototype.slice.apply(arguments);
    console.log('args.len: ' + arrGuments.length);

    if(arguments.callee.caller === null) {
      arguments.callee.apply(window, ['hi', 'bye']);

    }
    else {
    var regex1 = new Regex("function\W*\w*");
    var regex2 = new Regex("function\W*");
    
      console.log('"' + arguments.callee.caller.toString().match(regex1)[0].replace(regex2,'') + '"');
      console.log('"' + arguments.callee.caller.name + '"');

      //    JSObject();

      var jsObject = new JSObject();

      //jsObject.trace();
      var uiComp = new UIComponent();
      uiComp.trace('hello');

    }


  }());
  */