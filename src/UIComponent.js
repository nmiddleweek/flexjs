wol.define([ 'jquery-1' ],
    function ($) {

        'use strict';


        var UIComponent = function initUIComponent(jQueryObject) {
            var self = this,
                requireJSPath = 'modules',
                i;

            if ( jQueryObject.data('module').length === 0 ) {
                return;
            }

            this.data = jQueryObject.data('module').split(' ');
            this.jQueryObject = jQueryObject;
            this.domReference = jQueryObject[0];
            this.UUID = this.createUUID();
            jQueryObject.attr('data-UUID', this.UUID);
            console.log(this.UUID);

            this.jsModule = [];
            for ( i = 0; i < this.data.length; i++ ) {

                (function (moduleToLoad, jsModule, domReference) {

                    wol.requirejs([ moduleToLoad ], function requirejsCallback(Module) {
                        jsModule[jsModule.length] = new Module(domReference);
                    });

                }('modules/wol.' + this.data[i], self.jsModule, self.domReference));

            }

        };

        UIComponent.prototype = {
            'createUUID': function () {
                // http://www.ietf.org/rfc/rfc4122.txt
                var s = [],
                    hexDigits = '0123456789abcdef',
                    i,
                    uuid;
                for ( i = 0; i < 36; i++ ) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = '-';

                uuid = s.join('');

                return uuid;

            }
        };

        return UIComponent;
    });
