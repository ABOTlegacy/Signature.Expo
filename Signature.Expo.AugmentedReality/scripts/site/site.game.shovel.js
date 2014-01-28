/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.shovel = {

        // Dig Item Up
        digItemUp: function () {
            // Add Sand
            $("#canvas-container").append("<div class=\"transparent-sand\" style=\"top: " + (130 * Math.random()) + "px; left: " + (290 * Math.random()) + "px;\"></div>");

            if (Math.random() > .9) {
                // Get Current Item
                var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

                // Remove Item from list to dig
                for (var i = 0; i < $.game.item._itemsLeftToDig.length; i++) {
                    if ($.game.item._itemsLeftToDig[i] == currentItem) {
                        $.game.item._itemsLeftToDig.splice(i, 1);
                    }
                }

                // Remove Old Sands
                setTimeout(function () {
                    $("div.transparent-sand").remove();
                }, 2000);

                // Refresh Shovel
                $.game.shovel.refresh();

                // Check For Reward
                $.game.reward.refresh();

                // Update Ground
                $.game.ground.groundDug = true;
            }
        },



        // Determine If Item Is Dug Up
        isItemDugUp: function (id) {

            // Find if Item is Dug Up
            var isNotDugUp = false;
            for (var i = 0; i < $.game.item._itemsLeftToDig.length; i++) {
                if ($.game.item._itemsLeftToDig[i] == id) {
                    isNotDugUp = true;
                }
            }

            // Return
            return isNotDugUp;
        },



        // Update Display of Shovel
        refresh: function () {
            // If no item is present
            if ($.game.item._itemsCurrentlyDisplayedArray.length == 1) {
                // Get Current Item
                var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

                // Find if Item is Dug Up
                var isNotDugUp = false;
                for (var i = 0; i < $.game.item._itemsLeftToDig.length; i++) {
                    if ($.game.item._itemsLeftToDig[i] == currentItem) {
                        isNotDugUp = true;
                    }
                }

                if (isNotDugUp == true) {
                    $("body").addClass("shovel");
                } else {
                    $("body").removeClass("shovel");
                }
            } else {
                $("body").removeClass("shovel");
            }
        }
    }
})(jQuery);


// Shovel Click Event
$(document).ready(function () {

    $("div#shovel-container").on("click", function () {
        if ($("body").hasClass("shovel")) {
            $.game.shovel.digItemUp();
        }
    });

});