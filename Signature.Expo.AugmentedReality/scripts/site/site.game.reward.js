/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.reward = {
        _rewardsListMaster:
            [
              //  { rewardId: 1, itemId: 2, rewardName: "Signature Timeline", status: "locked", coin: "site_files/coin-01.png" },
                { rewardId: 2, itemId: 2, rewardName: "Customer Connect Screens", status: "locked", coin: "site_files/coin-01.png" },
                { rewardId: 3, itemId: 3, rewardName: "Programming Languages", status: "locked", coin: "site_files/coin-02.png" },
                { rewardId: 4, itemId: 4, rewardName: "Agile", status: "locked", coin: "site_files/coin-03.png" },
                { rewardId: 5, itemId: 5, rewardName: "Video Games", status: "locked", coin: "site_files/coin-04.png" },
                { rewardId: 6, itemId: 6, rewardName: "QR Code", status: "locked", coin: "site_files/treasure-cheast.png" },
            ],


        refresh: function () {
            // Get Current Item
            var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

            // Check for Reward
            var reward = $.game.reward.checkForReward();

            // Reward Found
            if (reward != null) {
                $("div#rewards-list-container").append("" +
                    "<div class=\"reward-list-item\" id=\"rwtile" + reward.rewardId + "\">" +
                    "<img src=\"" + reward.coin + "\" class=\"coin\">" +
                    reward.rewardName +
                    "</div>" +
                "");

                $("div#rwtile" + reward.rewardId).on("click", function () {
                    $("body").addClass("rw" + reward.rewardId);
                    $("body").addClass("rwClose");
                });

            // Reward Not Found
            } else {
                $("body").addClass("rwNotFound");
                $("body").addClass("rwClose");
            }

            // Check if Unlocked
            for (var i = 0; i < $.game.reward._rewardsListMaster.length; i++) {
                if ($.game.reward._rewardsListMaster[i].itemId == currentItem) {
                    return true;
                }
            }
            return false;
        },



        checkForReward: function () {
            // Don't Check if more than one item is displayed
            if ($.game.item._itemsCurrentlyDisplayedArray.length != 1) {
                return null;
            }

            // Get Current Item
            var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

            // Check if Unlocked
            var reward = null;
            for (var i = 0; i < $.game.reward._rewardsListMaster.length; i++) {
                if ($.game.reward._rewardsListMaster[i].itemId == currentItem) {
                    reward = $.game.reward._rewardsListMaster[i];
                }
            }

            // Return
            return reward;
        }




       



    }
})(jQuery);




// Close Rewards Event
$(document).ready(function () {

    $("div#rwClose").on("click", function () {
        for(var i = 0; i < 40; i++) {
            $("body").removeClass("rw" + i);
        }
        $("body").removeClass("rwNotFound");
        $("body").removeClass("rwClose");
    });

});