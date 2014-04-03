"use strict";

requirejs( ['webcam','ardetector','arview','arobject'], function(webcam,ardetector,arview,arobject) {

    var canvas, context, detector, view = undefined;

    // Initializes components and starts the game loop
    function initialize() {
        // Create a canvas element to which we will copy video.
        canvas = document.createElement('canvas');
        var webcamDimensions = webcam.getDimensions();
        canvas.id = "Canvas";
        canvas.width = webcamDimensions.width;
        canvas.height = webcamDimensions.height;

        // We need a context for the canvas in order to copy to it.
        context = canvas.getContext('2d');

        // create an AR Marker detector using the canvas as the data source
        detector = ardetector.create(canvas);

        // Create an AR View for displaying the augmented reality scene
        view = arview.create(webcam.getDimensions(), canvas);

        // Set the ARView camera projection matrix according to the detector
        view.setCameraMatrix(detector.getCameraMatrix(10,1000));
        
        // Place the arview's GL canvas into the DOM.
        document.getElementById("canvas-container").appendChild(view.glCanvas);
    }

    // Runs one iteration of the game loop
    function tick() {
        // Copy an image from the camara stream onto our canvas
        webcam.copyToContext(context);

        // The ardetector requires that we set a flag when the canvas has changed.
        canvas.changed = true;

        // Ask the detector to make a detection pass.
        detector.detect( onMarkerCreated, onMarkerUpdated, onMarkerDestroyed );


        // @CUSTOM SPIN
        //if (globalSelectedMesh != null) {
        //    globalSelectedMesh.rotation.y += (targetRotation - globalSelectedMesh.rotation.y) * 0.05;
        //}

        // Update and render the AR view
        view.update();
        view.render();

        // Request another iteration of the gameloop
        window.requestAnimationFrame(tick);
    }

    // Start the application once the user gives us authorization.
    webcam.waitForAuthorization( function() {
        initialize();
        tick();
    });

    // This function is called when a marker is initally detected on the stream
    function onMarkerCreated(marker) {
        // Update Game
        $.game.item.itemAdd(marker);

        // Add Object
        var object = markerObjects[marker.id];
        object.transform(marker.matrix);
        view.add(object);

        // Sand
        $.game.ground.refresh(marker, view)
    }

    // This function is called when an existing marker is repositioned
    function onMarkerUpdated(marker) {
        // Update Object
        var object = markerObjects[marker.id];
        object.transform(marker.matrix);

        // Sand
        $.game.ground.refresh(marker, view)
    }

    // This function is called when a marker disappears from the stream.
    function onMarkerDestroyed(marker) {
        // Update Game
        $.game.item.itemRemove(marker, function () {

            // Remove Object
            var object = markerObjects[marker.id];
            view.remove(object);

            // Sand
            $.game.ground.refresh(marker, view)
        });
    }

    




    // Create marker objects associated with the desired marker ID.
    var markerObjects = {
        1: arobject.createMarkerObject({ name: "1", type: "planevertical", texture: "textures/pinapple-01.gif", width: 200, height: 200 }), // Marker #1
        2: arobject.createMarkerObject({ name: "2", type: "sphere", texture: "textures/beachball.jpg", radius: 50, width: 200, height: 200 }), // Marker #2
        3: arobject.createMarkerObject({ name: "3", type: "plane", texture: "textures/starfish-01.png", width: 200, height: 200 }), // Marker #3
        4: arobject.createMarkerObject({ name: "4", type: "cubeimg", texture: "textures/coconut-01.png", width: 200, height: 200 }), // Marker #4
        5: arobject.createMarkerObject({ name: "5", type: "sphere", texture: "textures/melon02.jpg", radius: 50, width: 200, height: 200 }), // Marker #5
        6: arobject.createMarkerObject({ name: "6", type: "sphere", texture: "textures/beachball02.jpg", radius: 50, width: 200, height: 200 }), // Marker #6
        7: arobject.createMarkerObject({ name: "7", type: "planevertical", texture: "textures/palmtree01.png", width: 200, height: 400 }), // Marker #7
        8: arobject.createMarkerObject({ name: "8", type: "planevertical", texture: "textures/sand-castle-01.png", width: 400, height: 200 }), // Marker #8
        9: arobject.createMarkerObject({ name: "9", type: "planevertical", texture: "textures/shark-01.png", width: 400, height: 200 }), // Marker #9
        10: arobject.createMarkerObject({ name: "10", type: "planevertical", texture: "textures/doll-01.png", width: 200, height: 400 }), // Marker #10
        11: arobject.createMarkerObject({ name: "11", type: "planevertical", texture: "textures/tiki-01.png", width: 200, height: 400 }), // Marker #11
        12: arobject.createMarkerObject({ name: "12", type: "planevertical", texture: "textures/surfboard-01.png", width: 200, height: 400 }), // Marker #12
        13: arobject.createMarkerObject({ name: "13", type: "planevertical", texture: "textures/ring-boey-01.png", width: 300, height: 300 }), // Marker #13
        14: arobject.createMarkerObject({ name: "14", type: "planevertical", texture: "textures/jellyfish-01.png", width: 300, height: 300 }), // Marker #14
        15: arobject.createMarkerObject({ name: "15", type: "planevertical", texture: "textures/sea-turtle-01.png", width: 300, height: 300 }), // Marker #15
        16: arobject.createMarkerObject({ name: "16", type: "planevertical", texture: "textures/hasselhoff-01.gif", width: 200, height: 400 }), // Marker #16, red.
        17: arobject.createMarkerObject({ name: "17", type: "planevertical", texture: "textures/inflatable-raft-01.png", width: 200, height: 400 }), // Marker #17
        18: arobject.createMarkerObject({ name: "18", type: "planevertical", texture: "textures/love-boat-01.png", width: 300, height: 300 }), // Marker #18
        19: arobject.createMarkerObject({ name: "19", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #19
        20: arobject.createMarkerObject({ name: "20", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #20
        21: arobject.createMarkerObject({ name: "21", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #21
        22: arobject.createMarkerObject({ name: "22", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #22
        23: arobject.createMarkerObject({ name: "23", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #23
        24: arobject.createMarkerObject({ name: "27", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #24
        25: arobject.createMarkerObject({ name: "25", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #25
        26: arobject.createMarkerObject({ name: "26", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #26
        27: arobject.createMarkerObject({ name: "27", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #27
        28: arobject.createMarkerObject({ name: "28", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #28
        29: arobject.createMarkerObject({ name: "29", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #29
        30: arobject.createMarkerObject({ name: "30", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #30
        31: arobject.createMarkerObject({ name: "31", color: 0x00BB00, type: "cube", width: 200, height: 200 }), // Marker #31
        32: arobject.createMarkerObject({ type: "sphere", color: 0x00BB00, name: "32", selectable: false, texture: "textures/beachball.jpg" }), // Marker #32, Beachball

    };
});
