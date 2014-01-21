/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
	$.game = {
        // Instantiate Global Variables
	    _currentId: null,



	    /**
         * Returns the value of Team
         */
		initialize: function () {
		    $.game.events();
		},



	    /**
         * Returns the value of Team
         */
		getCurrentId: function () {
		    return $.game._currentId;
		},
	    /**
         * Returns the value of Team
         */
		setCurrentId: function (id) {
		    $.game._currentId = id;
		},





        /**
         * Generate the Guess Tile
         */
		generateGuessTile: function (id) {
		    // Set Current Id
		    $.game.setCurrentId(id);

		    // Loop through team members
		    for (var i = 0; i < $.configuration.getTeam().length; i++) {
		        if (($.configuration.getTeam()[i].id + "") == $.game.getCurrentId()) {
		            $("#gtImage").attr("src", "images/" + $.configuration.getTeam()[i].image[1]);
		            $("#gtName").text($.configuration.getTeam()[i].name);
		            $("#gtTeamName").text($.configuration.getTeam()[i].teamname + " | " + $.configuration.getTeam()[i].position);
		            //$("#gtPosition").text($.configuration.getTeam()[i].position);
		            $("#guessbox").attr("answer", $.configuration.getTeam()[i].answer);
		        }
		    }
		},




	    /**
         * Submit Action
         */
		submitAnswer: function () {
		    // Loop through team members
		    if ($("#guessbox").attr("answer") == $("#guessbox").val()) {

		    }

		    for (var i = 0; i < $.configuration.getTeam().length; i++) {
		        if (($.configuration.getTeam()[i].id + "") == $.game.getCurrentId()) {
		            $("#gtImage").attr("src", "images/" + $.configuration.getTeam()[i].image[1]);
		            $("#gtName").text($.configuration.getTeam()[i].name);
		            $("#gtTeamName").text($.configuration.getTeam()[i].teamname + " | " + $.configuration.getTeam()[i].position);
		            //$("#gtPosition").text($.configuration.getTeam()[i].position);
		            $("#guessbox").attr("answer", $.configuration.getTeam()[i].answer);
		        }
		    }
		},
        




	    /**
         * Returns the value of Team
         */
		events: function () {
	        $(".tiletoguess").click(function () {
	            $("#GuessingTileContainer").show();
	            $("#GameStatusContainer").hide();
	            $.game.generateGuessTile($(this).attr("member-id"));
	        });

	        $("#guessbutton").click(function () {

	        });
	    }
	}
})(jQuery);