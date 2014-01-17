/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
	$.configuration = {
        // Instantiate Global Variables
	    _team: null,
        _unlocked: false,



	    /**
         * Returns the value of Team
         */
		initialize: function () {
		    if (this._team == null) {
		        $.ajax({
		            type: "GET",
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            url: "json/team.json",
		            success: function (data) {
		                $.configuration._team = JSON.parse(JSON.stringify(data));
		            }
		        });
		    }
		},



        /**
         * Returns the value of Team
         */
		getTeam: function() {
		    return $.configuration._team;
		},
        


	    /**
         * Returns the value of Team
         */
	    getUnlocked: function() {
	        return $.configuration._unlocked;
	    }
	}
})(jQuery);