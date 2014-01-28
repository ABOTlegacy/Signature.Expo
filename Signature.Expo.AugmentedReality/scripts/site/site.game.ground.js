/**
 *
 * Configurations and Global Variables of the Application
 *
 */
(function($) {
    $.game.ground = {
        groundObjects: new Array(),
        groundObjectsDisplayed: new Array(),
        groundDug: false,



        initilize: function() {
            $.game.ground.groundObjects[0] = $.game.ground.createGroundObject(true);
            $.game.ground.groundObjects[1] = $.game.ground.createGroundObject(false);
        },

        // Update Display of Meter
        refresh: function (marker, view) {

            // New Hole Dug
            if ($.game.ground.groundDug == true) {
                $.game.ground.removeGround(marker, view);
                $.game.ground.addGround(marker, view, 0);
                $.game.ground.groundDug = false;


            // All Is Good
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length == 1 && $.game.ground.groundObjectsDisplayed.length == 1) {
                $.game.ground.groundObjects[$.game.ground.groundObjectsDisplayed[0]].transform(marker.matrix);
                
            // Need to display the ground
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length == 1 && $.game.ground.groundObjectsDisplayed.length != 1) {
                var currentItem = $.game.item._itemsCurrentlyDisplayedArray[0];
                $.game.ground.groundObjectsDisplayed = [];
                if ($.game.shovel.isItemDugUp(currentItem)) {
                    $.game.ground.addGround(marker, view, 1);
                } else {
                    $.game.ground.addGround(marker, view, 0);
                }

            } else if ($.game.item._itemsCurrentlyDisplayedArray.length == 1 && groundObjectsDisplayed.length == 0) {


            // Show To Many Object Error
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length > 1 && $.game.ground.groundObjectsDisplayed.length == 1) {
                $.game.ground.removeGround(marker, view);

            // Nothing
            } else if ($.game.item._itemsCurrentlyDisplayedArray.length == 0) {
                $.game.ground.removeGround(marker, view);
            }
        },



        addGround: function (marker, view, id) {
            $.game.ground.groundObjectsDisplayed.push(id);
            var sandObj = $.game.ground.groundObjects[$.game.ground.groundObjectsDisplayed[0]];
            sandObj.transform(marker.matrix);
            view.add(sandObj);
        },



        removeGround: function (marker, view) {
            view.remove($.game.ground.groundObjects[$.game.ground.groundObjectsDisplayed[0]]);
            $.game.ground.groundObjectsDisplayed.pop();
        },



        createGroundObject: function(bool) {
            // Model
            var model = new THREE.Object3D();
            model.matrixAutoUpdate = false;
            var modelContainer = model;

            // Mesh
            var texture;
            if (bool) {
                texture = THREE.ImageUtils.loadTexture("textures/sand-dug-03.jpg");
            } else {
                texture = THREE.ImageUtils.loadTexture("textures/sand-undug-03.jpg");
            }
            var material = new THREE.MeshLambertMaterial({ map: texture });
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), material);
            plane.side = THREE.DoubleSide;
            var modelMesh = plane;

            // Add
            modelContainer.add(modelMesh);

            function transform(matrix) {
                modelContainer.transformFromArray(matrix);
            }
            return {
                transform: transform,
                model: modelContainer
            }
        },



        getGroundObject: function(bool) {
            if (bool) {
                return $.game.ground.groundObjects[0];
            } else {
                return $.game.ground.groundObjects[1];
            }
        }
    }
})(jQuery);

