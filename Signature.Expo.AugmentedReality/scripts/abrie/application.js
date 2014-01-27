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
        $.game.item.itemAdd(marker.id);
        var object = markerObjects[marker.id];
        object.transform(marker.matrix);
        view.add(object);
    }

    // This function is called when an existing marker is repositioned
    function onMarkerUpdated(marker) {
        var object = markerObjects[marker.id];
        object.transform( marker.matrix );
    }

    // This function is called when a marker disappears from the stream.
    function onMarkerDestroyed(marker) {
        $.game.item.itemRemove(marker.id);
        var object = markerObjects[marker.id]; 
        view.remove( object );
    }

    // Create marker objects associated with the desired marker ID.
    var markerObjects = {
        2: arobject.createMarkerObject({ name: "2", type: "sphere", texture: "textures/beachball.jpg", radius: 50, width: 200, height: 200 }), // Marker #2
        3: arobject.createMarkerObject({ name: "3", type: "plane", texture: "textures/sand03.jpg", width: 200, height: 200 }), // Marker #3
        4: arobject.createMarkerObject({ name: "4", type: "plane", texture: "textures/sand04.jpg", width: 200, height: 200 }), // Marker #4
        5: arobject.createMarkerObject({ name: "5", type: "sphere", texture: "textures/melon02.jpg", radius: 50, width: 200, height: 200 }), // Marker #5
        6: arobject.createMarkerObject({ name: "6", type: "sphere", texture: "textures/beachball02.jpg", radius: 50, width: 200, height: 200 }), // Marker #6


        16: arobject.createMarkerObject({ name: "16", type: "plane", texture: "textures/sand03.jpg", width: 200, height: 200 }), // Marker #16, red.
        32: arobject.createMarkerObject({ type: "sphere", color: 0x00BB00, name: "32", selectable: false, texture: "textures/beachball.jpg" }), // Marker #32, Beachball

    };
});
