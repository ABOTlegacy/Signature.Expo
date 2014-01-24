/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
	$.game = {
        // Instantiate Global Variables
	    _currentId: null,
	    _currentSmallTile: null,
	    _gameTimer: 60,
	    _gameGuesses: null,
	    _gameStatus: "play",
	    _gameTotalAnswersToWin: 5,





	    /**
         * Returns the value of Team
         */
	    initialize: function () {
            // Set Event Handlers
	        $.game.events();

	        // Reset Correct Answers
	        $.configuration.setCorrectAnswers([]);

	        // Set Game Timer
	        setInterval(function () {
	            $.game.updateGameStats();
	            if ($.game.getGameStatus() == "play") {
	                $.game.setGameTimer($.game.getGameTimer() - 1);
	            } else if ($.game.getGameStatus() == "win") {
	                $.configuration.setUnlocked(true);
	                window.location = "reward.html";
	            } else if ($.game.getGameStatus() == "gameover") {
	                window.location = "lost.html";
	            }
	            if ($.game.getGameTimer() == 0) {
	                $.game.setGameStatus("gameover");
	            }
	        }, 1000);

	        // Set Game Guesses
	        $.game.setGameGuesses({ "right": 0, "wrong": 0 });

	        // Update Game Stats
	        $.game.updateGameStats();
		},





	    /**
         * Returns the value of Current ID
         */
		getCurrentId: function () {
		    return $.game._currentId;
		},
	    /**
         * Returns the value of Current ID
         */
		setCurrentId: function (id) {
		    $.game._currentId = id;
		},





	    /**
         * Returns the value of Current Small Tile Element
         */
		getCurrentSmallTile: function () {
		    return $.game._currentSmallTile;
		},
	    /**
         * Returns the value of Current Small Tile Element
         */
		setCurrentSmallTile: function (smallTile) {
		    $.game._currentSmallTile = smallTile;
		},





	    /**
         * Returns the value of Game Timer
         */
		getGameTimer: function () {
		    return $.game._gameTimer;
		},
	    /**
         * Returns the value of Game Timer
         */
		setGameTimer: function (timer) {
		    $.game._gameTimer = timer;
		},





	    /**
         * Returns the value of Game Guesses
         */
		getGameGuesses: function () {
		    return $.game._gameGuesses;
		},
	    /**
         * Returns the value of Game Guesses
         */
		setGameGuesses: function (guesses) {
		    $.game._gameGuesses = guesses;
		},




	    /**
         * Returns the value of Answers To Win
         */
		getTotalAnswersToWin: function () {
		    return $.game._gameTotalAnswersToWin;
		},
	    /**
         * Returns the value of Answers To Win
         */
		setTotalAnswersToWin: function (total) {
		    $.game._gameTotalAnswersToWin = total;
		},






	    /**
         * Returns the value of Game Status
         */
		getGameStatus: function () {
		    return $.game._gameStatus;
		},
	    /**
         * Returns the value of Game Status
         */
		setGameStatus: function (status) {
		    $.game._gameStatus = status;
		},




        /**
         * Generate the Guess Tile
         */
		generateGuessTile: function (id) {
		    // Show Tiles
		    $("#GuessingTileContainer").show();
		    $("#GameStatusContainer").hide();

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
		        var correctAnswersArray = $.configuration.getCorrectAnswers();
		        correctAnswersArray[correctAnswersArray.length] = { id: $.game.getCurrentId() };
		        $.configuration.setCorrectAnswers(correctAnswersArray);
		        $($.game.getCurrentSmallTile()).addClass("correct");
		        $.game.getGameGuesses().right++;
		    } else {
		        $.game.getGameGuesses().wrong++;
		        $($.game.getCurrentSmallTile()).addClass("wrong");
		    }

		    // Check Game Status
		    $.game.checkGameStatus();

		    // Chang the Displays
		    $.game.setCurrentId(null);
		    $($.game.getCurrentSmallTile()).removeClass("enabled");
		    $.game.setCurrentSmallTile(null);
		    $.game.updateGameStats();
		    $("#GuessingTileContainer").hide();
		    $("#GameStatusContainer").show();
		},




	    /**
         * Update the Game Stats
         */
		updateGameStats: function () {
		    $("#game-guess-ration").text($.game.getGameGuesses().right + " / " + $.game.getGameGuesses().wrong);
		    $("#game-answers-left-to-win").text($.game.getTotalAnswersToWin() - $.configuration.getCorrectAnswers().length);
		    $("#game-timer").text($.game.getGameTimer());
		},




	    /**
         * Check the Game Status
         */
		checkGameStatus: function () {
		    if ($.configuration.getTeam().length == ($.game.getGameGuesses().right + $.game.getGameGuesses().wrong)) {
		        $.game.setGameStatus("gameover");
		    }
		    if (($.game.getTotalAnswersToWin() - $.configuration.getCorrectAnswers().length) == 0) {
		        $.game.setGameStatus("win");
		    }
		},






	    /**
         * Returns the value of Team
         */
		events: function () {
		    $(".tiletoguess").click(function () {
		        // set logic that this is locked. if statement.
		        if ($(this).hasClass("enabled")) {
		            $.game.generateGuessTile($(this).attr("member-id"));
		            $.game.setCurrentSmallTile($(this));
		        }
	        });

	        $("#guessbutton").click(function () {
	            $.game.submitAnswer();
	        });

	        $("#cancelbutton").click(function () {
	            $("#GuessingTileContainer").hide();
	            $("#GameStatusContainer").show();
	            $.game.setCurrentId(null);
	            $.game.setCurrentSmallTile(null);
	        });
	    }
	}
})(jQuery);