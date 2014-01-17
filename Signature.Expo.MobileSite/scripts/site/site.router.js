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
		        this.completeTask();
		    }

		},



	    /**
         * @TODO
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
		                $("body").empty().load("html/site.start.html");
		                $("body").load("html/site.checklist.html");
		            },
		            fail: function () {
		            }
		        });
		    }
		    else {
		        $("body").empty().load("html/site.start.html");
		        $("body").load("html/site.checklist.html");
		    }

		},


		completeTask: function() {
		    var rewards = $.configuration.getRewards();
		    var taskId = $.utils.getUrlVar("taskId");
		    for (var i = 0; i < rewards.length; i++) {
		        var rewardUnlock = true;
		        for (var j = 0; j < rewards[i].trials.length; j++) {
		            console.log(taskId);
		            if (taskId === rewards[i].trials[j].id) {
		                
		                rewards[i].trials[j].unlocked = true;
		            }
		            else if (rewards[i].trials[j].unlocked === false) {
		                rewardUnlock = false;
		            }
		        }
		        rewards[i].unlock = rewardUnlock;
		    }
		    $.configuration.setRewards(rewards);
		    // Display Content
		    $("body").empty().load("html/site.checklist.html");

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