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
		    if ($.utils.getUrlVar("action") == "" || $.utils.getUrlVar("action")===undefined) {
		        this.main();
		    }  else if ($.utils.getUrlVar("action") == "start") {
		        this.start();
		    } else if ($.utils.getUrlVar("action") == "unlock-umbrella") {
		        this.unlockUmbrella();
		    } else if ($.utils.getUrlVar("action") == "complete-task") {
		        if ($.configuration.getRewards() == null) {
		            this.start();
		        } else {
		            this.completeTask();
		        }

		    } else if ($.utils.getUrlVar("action") == "viewMap") {
		        this.viewMap();
		    }


		},



	    /**
         * Main Front Page
         */
		main: function () {
		    $("body").empty().load("html/site.frontpage.html");
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
		                // Display Content
		                //  $("body").empty().load("html/site.start.html");
		                if ($.utils.getUrlVar("action") === "complete-task") {
		                    $.utils.completeTaskReward($.utils.getUrlVar("taskId"));
		                }
		                $("body").load("html/site.checklist.html");
		            },
		            fail: function () {
		                console.log('fail');
		            }
		        });
		    }
		    else {
		        //$("body").empty().load("html/site.start.html");
		        $("body").load("html/site.checklist.html");
		    }

		},


		completeTask: function() {

		    $.utils.completeTaskReward($.utils.getUrlVar("taskId"));

		    // Display Content
		    $("body").empty().load("html/site.checklist.html");

		},

		viewMap: function() {
		    // Display Content
		    $("body").empty().load("html/site.map.html");
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