/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.meter = {



        // Update Display of Meter
        refresh: function () {

            // If no item is present
            if ($.game.item._itemsCurrentlyDisplayedArray.length == 1) {

                // Determine Reward
                var reward = $.game.reward.checkForReward();

                // Find if there is a reward
                //$("#meter-item-detector").attr("optimal", "0");
                if (reward == null) {
                    $("#meter-item-detector").attr("value", "0.25");
                } else {
                    $("#meter-item-detector").attr("value", "0.9");
                }

            // Show To Many Object Error
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length > 1) {
                //$("#meter-item-detector").attr("optimal", "5");
                $("#meter-item-detector").attr("value", "0.1");

            // Nothing
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length == 0) {
                $("#meter-item-detector").attr("value", "0.25");
            }
        }
    }
})(jQuery);

