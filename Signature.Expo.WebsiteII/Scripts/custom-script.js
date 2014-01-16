/**
 * Custom made code to handle the events of the dropdown add functions
 */



$(document).ready(function () {

    // Instantiate Variables
    var arrayOfDrops = ["", "Form", "Command", "Attribute", "Option"];

    // Cycle Through the Dropdown Types
    for (var i = 0; i < arrayOfDrops.length; i++) {
        
        // Set Display
        $('.addBox' + arrayOfDrops[i]).hide();
        $('.dropAdd'+ arrayOfDrops[i]).attr("state", "Up");
        $('.dropAdd' + arrayOfDrops[i]).attr("category", arrayOfDrops[i]);

        /**
         * Click event for the dropdown add boxes
         */
        $(".dropAdd" + arrayOfDrops[i]).off().on("click", function () {
            
            // If State
            if ($(this).attr("state") == "Up") {
                $(".addBox" + $(this).attr("category")).slideDown(1000);
                $(this).attr("state", "Down");
            } else if ($(this).attr("state") == "Down") {
                $(".addBox" + $(this).attr("category")).slideUp(1000);
                $(this).attr("state", "Up");
            }

        });
    }

    /**
     * Click event for the Cancel button on the Delete Dialogs
     */
    $(".btnCancelDialog").off().on("click", function () {
        $("#dlgDelete").dialog("close");
        $("#dlgSave").dialog("close");
        $("#dlgAutomatedTest").dialog("close");
        $("#dlgOrder").dialog("close");
    });


    /**
     * The Delete Dialog Box
     */
    var dlg = $("#dlgDelete").dialog();
    dlg.parent().appendTo(jQuery("form:first"));
    $("#dlgDelete").dialog("close");


    /**
     * The Automated Test Dialog Box
     */
    var dlg = $("#dlgAutomatedTest").dialog();
    dlg.parent().appendTo(jQuery("form:first"));
    $("#dlgAutomatedTest").dialog("close");


    /**
     * The Save Dialog Box
     */
    var dlg = $("#dlgSave").dialog();
    dlg.parent().appendTo(jQuery("form:first"));
    $("#dlgSave").dialog("close");

    /**
     * The Order Dialog Box
     */
    var dlg = $("#dlgOrder").dialog();
    dlg.parent().appendTo(jQuery("form:first"));
    $("#dlgOrder").dialog("close");

});