/**
 *
 * Router controls what pages to display
 * 
 */
(function($) {
	$.router = {



        /**
         * Returns the value of Rewards
         */
		initialize: function () {
		    if ($.utils.getUrlVar("action") == "") {
		        this.main();
		    }  else if ($.utils.getUrlVar("action") == "start") {
		        this.start();
		    } else if ($.utils.getUrlVar("action") == "unlock-umbrella") {
		        this.unlockUmbrella();
		    }
		},



	    /**
         * @TODO
         */
		main: function () {
		},



	    /**
         * Start
         */
		start: function () {
            // Set Rewards if not already set
		    if ($.configuration.getRewards() == null) {
		        $.ajax({
		            type: "GET",
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            url: "json/rewards.json",
		            success: function (data) {
		                $.configuration.setRewards(data);
		            }
		        });
		    }

		    // Display Content
		    $("body").empty().load("html/site.start.html");
		},



	    /**
         * Unlock Umbrella
         */
	    unlockUmbrella: function () {
	        // Set Rewards if not already set
	        var rewards = $.configuration.getRewards();
	        for(var i = 0; i < rewards.length; i++) {
	            if(rewards[i].name == "umbrellas") {
	                rewards[i].unlocked = true;
	            }
	        }
	        $.configuration.setRewards(rewards);

	        // Display Content
	        $("body").empty().load("html/site.start.html");
	    }

	}
})(jQuery);