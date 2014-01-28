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
            mesh.position.z = -50;
        } else if (params.type == "plane") {
            mesh = createMarkerMeshPlane(params);
            mesh.position.z = -50;
        }

        // Other Misc Mesh Properties
        if (mesh != null) {
            //mesh.position.z = -50;
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
        var geometry = new THREE.SphereGeometry(params.radius, params.width, params.height);
        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(params.texture)
        });
        return new THREE.Mesh(geometry, material);
    }

    // Plane
    function createMarkerMeshPlane(params) {
        var texture = THREE.ImageUtils.loadTexture(params.texture);
        var material = new THREE.MeshLambertMaterial({ map: texture });
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(params.width, params.height), material);
        plane.side = THREE.DoubleSide;
        return plane;
    }






    function createMarkerObject(params) {
        var modelContainer = createContainer();
        var modelMesh = createMarkerMesh(params);
        modelContainer.add(modelMesh);

        function transform(matrix) {
            modelContainer.transformFromArray(matrix);
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
