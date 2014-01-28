/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.item = {
        // Initialize Variables
        _itemsCurrentlyDisplayedArray: new Array(),
        _itemsListMaster: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        _itemsLeftToDig: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],



        // Function to check arrays
        itemAdd: function (marker) {

            // Initialize Variables
            var id = marker.id;

            // Adjust Display
            $("body").addClass("item" + id);
            $.game.item._itemsCurrentlyDisplayedArray.push(id);
            $.game.board.refresh();
        },



        // Function to check arrays
        itemRemove: function (marker, callback) {

            // Initialize Variables
            var id = marker.id;

            // Remove From Currently Displayed Array
            for (var i = 0; i < $.game.item._itemsCurrentlyDisplayedArray.length; i++) {
                if ($.game.item._itemsCurrentlyDisplayedArray[i] == id) {
                    $.game.item._itemsCurrentlyDisplayedArray.splice(i, 1);
                }
            }

            // Removes the content from the Screen
            setTimeout(function () {
                if (!$.game.item.itemExists(id)) {
                    callback();
                    $("body").removeClass("item" + id);
                    $.game.board.refresh();
                }
            }, 500);
        },



        // Checks to see if id exists
        itemExists: function (id) {
            for (var i = 0; i < $.game.item._itemsCurrentlyDisplayedArray.length; i++) {
                if ($.game.item._itemsCurrentlyDisplayedArray[i] == id) {
                    return true;
                }
            }
            return false
        }
    }
})(jQuery);