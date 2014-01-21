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
	    _expire: null,
        _correctAnswers: null,





	    /**
         * Returns the value of Team
         */
	    initialize: function () {
	        // Set Expire Date
	        if ($.configuration.getExpire() == null) {
	            var now = new Date();
	            var expiresDate = new Date();
	            expiresDate.setDate(now.getDate() + 10);
	            $.configuration.setExpire(expiresDate);
	        }
	        
            // Initialize Team List
		    if ($.configuration.getTeam() == null) {
		        $.ajax({
		            type: "GET",
		            dataType: "json",
		            contentType: "application/json; charset=utf-8",
		            url: "json/team.json",
		            success: function (data) {
		                $.configuration.setTeam(JSON.parse(JSON.stringify(data)));


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
		    if($.configuration.getUnlocked() == null) {
		        $.configuration.setUnlocked("false");
		    }

	        // Initialize Unlocked
		    if ($.configuration.getCorrectAnswers() == null) {
		        $.configuration.setCorrectAnswers([]);
		    }
		},





	    /**
         * Returns the value of Expire
         */
	    getExpire: function() {
	        if ($.configuration._expire == null) {
	            $.configuration._expire = JSON.parse($.cookie('ABOT-MTT-expire'));
	        }
	        return $.configuration._expire;
	    },

	    /**
         * Sets the Team Value
         */
	    setExpire: function (expire) {
	        $.configuration._expire = expire;
	        $.cookie('ABOT-MTT-expire', JSON.stringify(expire), { path: '/', expires: $.configuration.getExpire() });
	    },

        



        /**
         * Returns the value of Team
         */
		getTeam: function() {
		    if ($.configuration._team == null) {
		        $.configuration._team = JSON.parse($.cookie('ABOT-MTT-team'));
		    }
		    return $.configuration._team;
		},

	    /**
         * Sets the Team Value
         */
		setTeam: function (team) {
		    $.configuration._team = team;
		    $.cookie('ABOT-MTT-team', JSON.stringify(team), { path: '/', expires: $.configuration.getExpire() });
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
	        $.cookie('ABOT-MTT-unlocked', unlocked, { path: '/', expires: $.configuration.getExpire() });
	    },





	    /**
         * Returns the value of Answer Key
         */
	    getAnswerKey: function () {
	        if ($.configuration._answerKey == null) {
	            $.configuration._answerKey = JSON.parse($.cookie('ABOT-MTT-answerkey'));
	        }
	        return $.configuration._answerKey;
	    },

	    /**
         * Sets the Answer Key
         */
	    setAnswerKey: function (answerKey) {
	        $.configuration._answerKey = answerKey;
	        $.cookie('ABOT-MTT-answerkey', JSON.stringify(answerKey), { path: '/', expires: $.configuration.getExpire() });
	    },




	    /**
         * Returns the value of Correct Answers
         */
	    getCorrectAnswers: function () {
	        if ($.configuration._correctAnswers == null) {
	            $.configuration._correctAnswers = JSON.parse($.cookie('ABOT-MTT-correctanswers'));
	        }
	        return $.configuration._correctAnswers;
	    },

        /**
         * Sets the Correct Answers
         */
        setCorrectAnswers: function (correctAnswers) {
            $.configuration._correctAnswers = correctAnswers;
            $.cookie('ABOT-MTT-correctanswers', JSON.stringify(correctAnswers), { path: '/', expires: $.configuration.getExpire() });
	    }
	}
})(jQuery);