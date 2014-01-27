/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.board = {
        
        // Handles When Models are created or removed from the screen and
        // Handles all the game type functions that occur
        refresh: function () {

            // Multiple Items are on Screen
            if($.game.item._itemsCurrentlyDisplayedArray > 1) {
                $.game.board.multiple();

            // No Items are on Screen
            } if($.game.item._itemsCurrentlyDisplayedArray == 0) {
                $.game.board.clear();

            // Target Item
            } else {
                $.game.board.target();
            }
        },



        // Multiple Items Messages
        multiple: function () {
            // Clear Board
            $.game.board.clear();

            $("#game-message").text("Multiple Items In Focus. Please focus detector one at a time.");
            // @TODO: Give meter reading false reading :)
        },





        // Clear Detector
        clear: function () {
            // Reset Message Text
            $("#game-message").text("");

            // @TODO: Set meter to nothing again

            // Refresh Shovel
            $.game.shovel.refresh();
        },





        // Display the Target
        target: function () {
            $.game.board.clear();
        },




        // Dig Item Up
        digItemUp: function () {
            
        }

    }
})(jQuery);