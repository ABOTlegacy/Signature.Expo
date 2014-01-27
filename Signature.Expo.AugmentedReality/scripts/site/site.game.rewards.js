/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.reward = {
        _rewardsListMaster:
            [
                { rewardId: 1, itemId: 2, rewardName: "Signature Timeline", status: "locked" },
                { rewardId: 2, itemId: 3, rewardName: "Test", status: "locked" },
            ],


        refresh: function () {
            // Get Current Item
            var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

            // Check if Unlocked
            var reward = null;
            for (var i = 0; i < $.game.reward._rewardsListMaster.length; i++) {
                if ($.game.reward._rewardsListMaster[i].itemId == currentItem) {
                    reward = $.game.reward._rewardsListMaster[i];
                }
            }

            // Reward Found
            if (reward != null) {
                $("div#rewards-list-container").append("" +
                    "<div class=\"reward-list-item\" id=\"rwtile" + reward.rewardId + "\">" + reward.rewardName + "</div>" +
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
        }



        //checkForReward: function () {
        //    // Get Current Item
        //    var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];

        //    // Check if Unlocked
        //    for (var i = 0; i < $.game.reward._rewardsListMaster.length; i++) {
        //        if ($.game.reward._rewardsListMaster[i].itemId == currentItem) {
        //            return true;
        //        }
        //    }
        //    return false;
        //}




       



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