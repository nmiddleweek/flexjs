var Klass = function Klass(){
    };
    
    Klass.prototype = {
        'test' : function test(){
            console.log('test()');
        }
    };

var CLASS = function CLASS( className ){

/*    
    var clss = new Function('var prot = arguments.callee.caller.prototype; this.prototype = new Klass(); this.constructor = Klass;');
    clss.prototype.generator = function generator(){
        console.log(this.prototype.constructor);
    };
    
    var instance = new clss();
    
    instance.generator(this);
    
    return instance;
*/
    
};

CLASS.builder = function (className){
    var clss = new Function('className', 'this.prototype = new CLASS(); this.constructor = className;');
    clss.prototype[className] = function generator(){
        this.constructor = this.prototype[arguments.callee.name].prototype.constructor;
        console.log('clss', this.prototype.constructor);
    };
    
    var instance = new clss(className);
    
    instance[className](this);
    
//    clss.constructor = className;
    
    return instance;
};

CLASS.prototype.generator = function generator(){
    console.log('CLASS', this.prototype.constructor);
};
