/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
	$.configuration = {
        // Instantiate Global Variables
	    _team: null,
	    _unlocked: null,
	    _answerKey: null,





	    /**
         * Returns the value of Team
         */
	    initialize: function () {
            // Initialize Team List
		    if ($.configuration._team == null) {
		        $.ajax({
		            type: "GET",
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            url: "json/team.json",
		            success: function (data) {
		                $.configuration._team = JSON.parse(JSON.stringify(data));


		                // Initialize Answer Key
		                var answerArray = new Array();
		                for (var i = 0; i < $.configuration.getTeam().length; i++) {
		                    var answerIsNew = true;
		                    for (var j = 0; j < answerArray.length; j++) {
		                        if ($.configuration.getTeam()[i].answer == answerArray[j]) {
		                            answerIsNew = false;
		                        }
		                    }
		                    if (answerIsNew) {
		                        answerArray[answerArray.length] = $.configuration.getTeam()[i].answer;
		                    }
		                }
		                $.configuration.setAnswerKey(answerArray.sort());
		            }
		        });
		    }

	        // Initialize Unlocked
		    if($.configuration._unlocked == null) {
		        $.configuration.setUnlocked("false");
		    }
		},





        /**
         * Returns the value of Team
         */
		getTeam: function() {
		    return $.configuration._team;
		},
        




	    /**
         * Returns the value of Unlocked
         */
		getUnlocked: function () {
		    if ($.configuration._unlocked == null) {
		        $.configuration._unlocked = $.cookie('ABOT-MTT-unlocked');
		    }
		    return $.configuration._unlocked;
		},

	    /**
         * Sets the Unlocked Value
         */
	    setUnlocked: function (unlocked) {
	        $.configuration._unlocked = unlocked;
	        $.cookie('ABOT-MTT-unlocked', unlocked, { path: '/' });
	    },





	    /**
         * Returns the value of Answer Key
         */
	    getAnswerKey: function () {
	        if ($.configuration._answerKey == null) {
	            $.configuration._answerKey = $.cookie('ABOT-MTT-answerkey');
	        }
	        return $.configuration._answerKey;
	    },

	    /**
         * Sets the Answer Key
         */
	    setAnswerKey: function (answerKey) {
	        $.configuration._answerKey = answerKey;
	        $.cookie('ABOT-MTT-answerkey', answerKey, { path: '/' });
	    }
	}
})(jQuery);