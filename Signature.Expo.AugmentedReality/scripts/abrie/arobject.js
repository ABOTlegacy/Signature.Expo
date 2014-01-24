"use strict";

define([], function () {

    THREE.Matrix4.prototype.setFromArray = function(m) {
        return this.set(
          m[0], m[4], m[8], m[12],
          m[1], m[5], m[9], m[13],
          m[2], m[6], m[10], m[14],
          m[3], m[7], m[11], m[15]
        );
    }

    THREE.Object3D.prototype.transformFromArray = function(m) {
        this.matrix.setFromArray(m);
        this.matrixWorldNeedsUpdate = true;
    }

    function createContainer() {
        var model = new THREE.Object3D();
        model.matrixAutoUpdate = false;
        return model;
    }

    function createMarkerMesh(params) {
        // Initialize Variables
        var mesh = null;

        // Generate the Shape
        if (params.type == "cube") {
            mesh = createMarkerMeshCube(params);
            mesh.position.z = -50;
        } else if (params.type == "text") {
            mesh = createMarkerMeshText(params);
        } else if (params.type == "sphere") {
            mesh = createMarkerMeshSphere(params);
            mesh.position.z = 200;
        }

        // Other Misc Mesh Properties
        if (mesh != null) {
            mesh.position.z = -50;
            mesh.name = params.name;
            //if (params.selectable) {
            //    mesh.on('mousedown', function () {
            //        globalSelectedMesh = this;
            //        $("#txtSelectedMesh").val(params.name);
            //    });
            //}
        }
        
        // Return Mesh
        return mesh;
    }

    // Cube
    function createMarkerMeshCube(params) {
        var geometry = new THREE.CubeGeometry(100, 100, 100);
        var material = new THREE.MeshPhongMaterial({ color: params.color, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    }

    // Text
    function createMarkerMeshText(params) {
        var geometry = new THREE.TextGeometry(params.text, {
            size: 80,
            height: 20,
            curveSegments: 2,
            font: "helvetiker"
        });
        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, overdraw: true });
        return new THREE.Mesh(geometry, material);
    }

    // Sphere
    function createMarkerMeshSphere(params) {
        var geometry = new THREE.SphereGeometry(50, 60, 40);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(params.texture)
        });
        return new THREE.Mesh(geometry, material);
    }

    // Plane
    function createMarkerMeshPlane(params) {
        var data = generateHeight(1024, 1024);
        var texture = new THREE.Texture(generateTexture(data, 1024, 1024));
        texture.needsUpdate = true;

        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: true });

        var quality = 16, step = 1024 / quality;



        var plane = new THREE.PlaneGeometry(2000, 2000, quality - 1, quality - 1);
        plane.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        for (var i = 0, l = plane.vertices.length; i < l; i++) {

            var x = i % quality, y = ~~(i / quality);
            plane.vertices[i].y = data[(x * step) + (y * step) * 1024] * 2 - 128;

        }

        plane.computeCentroids();

        return new THREE.Mesh(plane, material);
    }






    // Helper Method Texture
    function generateTexture(data, width, height) {
        var canvas, context, image, imageData,
        level, diff, vector3, sun, shade;

        vector3 = new THREE.Vector3(0, 0, 0);

        sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();

        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);

        image = context.getImageData(0, 0, width, height);
        imageData = image.data;

        for (var i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {

            vector3.x = data[j - 1] - data[j + 1];
            vector3.y = 2;
            vector3.z = data[j - width] - data[j + width];
            vector3.normalize();

            shade = vector3.dot(sun);

            imageData[i] = (96 + shade * 128) * (data[j] * 0.007);
            imageData[i + 1] = (32 + shade * 96) * (data[j] * 0.007);
            imageData[i + 2] = (shade * 96) * (data[j] * 0.007);

        }
        context.putImageData(image, 0, 0);
        return canvas;
    }

    // Helper Method Height
    function generateHeight(width, height) {
        var data = Float32Array ? new Float32Array(width * height) : [], perlin = new ImprovedNoise(),
        size = width * height, quality = 2, z = Math.random() * 100;

        for (var i = 0; i < size; i++) {
            data[i] = 0
        }

        for (var j = 0; j < 4; j++) {
            quality *= 4;
            for (var i = 0; i < size; i++) {
                var x = i % width, y = ~~(i / width);
                data[i] += Math.floor(Math.abs(perlin.noise(x / quality, y / quality, z) * 0.5) * quality + 10);
            }
        }
        return data;
    }







    function createMarkerObject(params) {
        var modelContainer = createContainer();
        var modelMesh = createMarkerMesh(params);


        modelContainer.add( modelMesh );

        function transform(matrix) {
            modelContainer.transformFromArray( matrix );
        }

        return {
            transform: transform,
            model: modelContainer
        }
    }

    return {
        createMarkerObject:createMarkerObject
    }
});
