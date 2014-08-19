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