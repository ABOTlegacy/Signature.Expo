
// Initialize Variables
var cdToRemoveArray = new Array();
var cdCurrentlyDisplayedArray = new Array();



// Function to check arrays
function cdRemove(id) {
    // Remove From Currently Displayed Array
    for (var i = 0; i < cdCurrentlyDisplayedArray.length; i++) {
        if (cdCurrentlyDisplayedArray[i] == id) {
            cdCurrentlyDisplayedArray.splice(i, 1);
        }
    }

    // Removes the content from the Screen
    setTimeout(function () {
        if (! cdExists(id)) {
            $("body").removeClass("cd" + id);
        }
    }, 500);
}



// Checks to see if id exists
function cdExists(id) {
    for (var i = 0; i < cdCurrentlyDisplayedArray.length; i++) {
        if (cdCurrentlyDisplayedArray[i] == id) {
            return true;
        }
    }
    return false
}



// Function to check arrays
function cdAdd(id) {
    $("body").addClass("cd" + id);
    cdCurrentlyDisplayedArray.push(id);
}