/**
 * A Javascript Object that contains functions that are helpful and used throughout the application
 */

(function($) {
	$.utils = {

        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },


        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                if(hash[1] != null) {
                    if(hash[1].indexOf("#") == -1) {
                        vars[hash[0]] = hash[1];
                    } else {
                        vars[hash[0]] = hash[1].substring(0, hash[1].indexOf("#"));
                    }
                }
            }
            return vars;
        },


        getUrlVar: function(name) {
            return $.utils.getUrlVars()[name];
        }

    }
})(jQuery);