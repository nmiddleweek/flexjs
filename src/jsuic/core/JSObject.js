
/**
 * Creates a new JSObject.
 * 
 * Extending the native JavaScript 'Object' is bad practice so this is
 * the core 'Object' used throughtout this custom framework.
 * 
 * @author Nick Middleweek <nick@middleweek.co.uk>
 * @class
 */
var JSObject = function JSObject(){ // constructor
    this.constructor = JSObject;
    if(this === window){
        throw new Error('Constructor Function Error','This is a constructor function, you need to use the new keyword.');
    }

};
JSObject.prototype.trace = function trace(text){
  console.log('JSObject.trace()', text);
};
JSObject.prototype.getPrototypeChain = function getPrototypeChain(){
  var str = this.constructor.toString().match(/function\W*\w*/)[0].replace(/function\W*/,''),
  __super = this.constructor.prototype;

  while(__super !== __super.constructor.prototype){
      str += '.' + __super.constructor.toString().match(/function\W*\w*/)[0].replace(/function\W*/,'');
      __super = __super.constructor.prototype;
      }

      return str;

};

/**
 * 
 * @author Nick Middleweek <nick@middleweek.co.uk>
 * 
 * The SUPER method used to mimic the super keyword as found in ES6 and Java.
 * 
 * The caveats of be able to use this.SUPER() are:
 * 1. Constructor functions must NOT be anonymous.
 * 2. Methods must NOT be anonymous.
 * 3. Can't call this.SUPER() from a constructor function.
 * 
*/

JSObject.prototype.SUPER = (function SUPER(){

/**
 * The SUPER method implementation as a closure method
 * to allow me to use some private error variables
 * without sprinkling the global space unnecessarily.
*/
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
        superClassName = errorClassName = getSuper.call(this),
        statement = '(' + superClassName + '.prototype.hasOwnProperty(\'' + callingFunctionName + '\') ) ? ' + superClassName + '.prototype.' + callingFunctionName + '.apply(self, getArguments.call(self)) : error=true;';

        if(superClassName === undefined){
            this.__prototypeChain = undefined;
            return;
        }
        
        eval(statement); // What are the negatives of eval, does it exist in Angular or Backbone ?
        if(error === true){
            this.__prototypeChain = undefined;
            throw new Error('Invalid call to this.SUPER(). '+ errorClassName + '.' + callingFunctionName +' does not exist.');
        }
        console.log('exit SUPER');
    },
    error = false,
    errorClassName = '';

    return ret;
}());
