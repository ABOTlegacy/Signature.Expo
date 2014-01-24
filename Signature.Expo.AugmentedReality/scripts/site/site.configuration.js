/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
	$.configuration = {
        // Instantiate Global Variables
	    _height: null,
	    _width: null,
	    _expire: null,





	    /**
         * Returns the value of Team
         */
	    initialize: function () {
	        // Set Expire Date
	        //if ($.configuration.getExpire() == null) {
	            var now = new Date();
	            var expiresDate = new Date();
	            expiresDate.setDate(now.getDate() + 10);
	            $.configuration.setExpire(expiresDate);
	        //}
	        
	        // Initialize Width
		    if($.configuration.getWidth() == null) {
		        $.configuration.setWidth("640");
		    }

	        // Initialize Height
		    if ($.configuration.getHeight() == null) {
		        $.configuration.setHeight("480");
		    }
		},





	    /**
         * Returns the value of Expire
         */
	    getExpire: function() {
	        if ($.configuration._expire == null) {
	            $.configuration._expire = new Date(JSON.parse($.cookie('ABOT-AR-expire')));
	        }
	        return $.configuration._expire;
	    },

	    /**
         * Sets the Team Value
         */
	    setExpire: function (expire) {
	        $.configuration._expire = expire;
	        $.cookie('ABOT-AR-expire', JSON.stringify(expire), { path: '/', expires: $.configuration.getExpire() });
	    },

        



        /**
         * Returns the value of Width
         */
		getWidth: function() {
		    if ($.configuration._width == null) {
		        $.configuration._width = $.cookie('ABOT-AR-width');
		    }
		    return $.configuration._width;
		},

	    /**
         * Sets the Value of Width
         */
		setWidth: function (width) {
		    $.configuration._width = width;
		    $.cookie('ABOT-AR-width', width, { path: '/', expires: $.configuration.getExpire() });
		},





	    /**
         * Returns the value of Height
         */
		getHeight: function () {
		    if ($.configuration._height == null) {
		        $.configuration._height = $.cookie('ABOT-AR-height');
		    }
		    return $.configuration._height;
		},

	    /**
         * Sets the Value of Height
         */
		setHeight: function (height) {
		    $.configuration._height = height;
		    $.cookie('ABOT-AR-height', height, { path: '/', expires: $.configuration.getExpire() });
	    }
	}
})(jQuery);