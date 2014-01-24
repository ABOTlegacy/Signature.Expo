// Random Variables
threshold = 128;
DEBUG = false;


// Video Sizes
var height = 640;
var width = 480;


// Random Variables
var times = [];
var markers = {};
var lastTime = 0;

// Maji Variables
var pastResults = {};
var cubes = {};
var images = [];


// Video Variable
var video = document.getElementById('control-video');
video.width = 640;
video.height = 480;
video.loop = true;
video.volume = 0;
video.autoplay = true;
video.controls = true;;


// Canvas Element
var canvas = document.getElementById('ABOT-CANVAS');
canvas.width = 320;
canvas.height = 240;

// Debug Canvas
var debugCanvas = document.getElementById('ABOT-DEBUG-CANVAS');
debugCanvas.id = 'debugCanvas';
debugCanvas.width = 640;
debugCanvas.height = 480;

// Video Canvas
var videoCanvas = document.createElement('canvas');
videoCanvas.width = video.width;
videoCanvas.height = video.height;
videoCanvas.id = "BATMAN-VIDEO";


// CTX for canvas
var ctx = canvas.getContext('2d');


// AR Stuff
var raster = new NyARRgbRaster_Canvas2D(canvas);
var param = new FLARParam(320, 240);
var resultMat = new NyARTransMatResult();
var detector = new FLARMultiIdMarkerDetector(param, 120);
detector.setContinueMode(true);


// Renderer
var tmp = new Float32Array(16);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);


// GL Canvas
var glCanvas = renderer.domElement;
glCanvas.style.webkitTransform = 'scale(-1.0, 1.0)';
glCanvas.width = 640;
glCanvas.height = 480;
glCanvas.id = "BATMAN-GL";
var s = glCanvas.style;
$("#main-container").append(glCanvas);


// Lighting
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff);
light.position.set(400, 500, 100);
scene.add(light);
var light = new THREE.PointLight(0xffffff);
light.position.set(-400, -500, -100);
scene.add(light);

// Create a camera and a marker root object for your Three.js scene.
var camera = new THREE.Camera();
scene.add(camera);


window.onload = function () {
    // Next we need to make the Three.js camera use the FLARParam matrix.
    param.copyCameraMatrix(tmp, 10, 10000);
    camera.projectionMatrix.setFromArray(tmp);

    // VideoTex
    var videoTex = new THREE.Texture(videoCanvas);

    // Create scene and quad for the video.
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({ map: videoTex })
    );
    plane.material.depthTest = false;
    plane.material.depthWrite = false;
    var videoCam = new THREE.Camera();
    var videoScene = new THREE.Scene();
    videoScene.add(plane);
    videoScene.add(videoCam);




    setInterval(function () {
        // If Webcam is Paused, then don't bother with changing the canvas
        if (video.ended) { video.play() };
        if (video.paused) { return };
        if (window.paused) { return };
        if (video.currentTime == video.duration) { video.currentTime = 0; }
        if (video.currentTime == lastTime) { return };

        // Continue on to updating the canvas
        lastTime = video.currentTime;
        videoCanvas.getContext('2d').drawImage(video, 0, 0);
        ctx.drawImage(videoCanvas, 0, 0, 320, 240);
        var dt = new Date().getTime();

        canvas.changed = true;
        videoTex.needsUpdate = true;

        var t = new Date();
        var detected = detector.detectMarkerLite(raster, threshold);
        for (var idx = 0; idx < detected; idx++) {
            var id = detector.getIdMarkerData(idx);
            var currId;
            if (id.packetLength > 4) {
                currId = -1;
            } else {
                currId = 0;
                for (var i = 0; i < id.packetLength; i++) {
                    currId = (currId << 8) | id.getPacketData(i);
                }
            }
            if (!markers[currId]) {
                markers[currId] = {};
            }
            detector.getTransformMatrix(idx, resultMat);
            markers[currId].age = 0;
            markers[currId].transform = Object.asCopy(resultMat);
        }
        for (var i in markers) {
            var r = markers[i];
            if (r.age > 1) {
                delete markers[i];
                scene.remove(r.model);
            }
            r.age++;
        }
        for (var i in markers) {
            var m = markers[i];
            if (!m.model) {
                m.model = new THREE.Object3D();

                var text3d = new THREE.TextGeometry("TEST", {

                    size: 80,
                    height: 20,
                    curveSegments: 2,
                    font: "helvetiker"

                });
                alert("ID: " + m.id);
                text3d.computeBoundingBox();
                var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x);

                var textMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, overdraw: true });
                var cube = new THREE.Mesh(text3d, textMaterial);


                //var cube = new THREE.Mesh(
                //    new THREE.TextGeometry( text, {
                //        size: 80,
                //        height: 20,
                //        curveSegments: 2,
                //        font: "helvetiker"

                //    },
                //     new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, overdraw: true })


                //    )
                //);
                var cube = new THREE.Mesh(
                    new THREE.CubeGeometry(100, 100, 4),

                    new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture("ar_imgs/2414463667_a173b81c3b_z.jpg"),
                        side: THREE.DoubleSide
                    })
                );

                //cube = new THREE.Mesh(
                //    new THREE.SphereGeometry(3000, 60, 40),
                //    new THREE.MeshBasicMaterial({
                //        map: THREE.ImageUtils.loadTexture("ar_imgs/2414463667_a173b81c3b_z.jpg")
                //    })
                //);

                cube.position.z = -50;
                // cube.doubleSided = true;
                m.model.matrixAutoUpdate = false;
                m.model.add(cube);
                scene.add(m.model);
            }
            copyMatrix(m.transform, tmp);
            m.model.matrix.setFromArray(tmp);
            m.model.matrixWorldNeedsUpdate = true;
        }
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(videoScene, videoCam);
        renderer.render(scene, camera);
    }, 3000);
}

THREE.Matrix4.prototype.setFromArray = function (m) {
    return this.set(
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    );
};

function copyMatrix(mat, cm) {
    cm[0] = mat.m00;
    cm[1] = -mat.m10;
    cm[2] = mat.m20;
    cm[3] = 0;
    cm[4] = mat.m01;
    cm[5] = -mat.m11;
    cm[6] = mat.m21;
    cm[7] = 0;
    cm[8] = -mat.m02;
    cm[9] = mat.m12;
    cm[10] = -mat.m22;
    cm[11] = 0;
    cm[12] = mat.m03;
    cm[13] = -mat.m13;
    cm[14] = mat.m23;
    cm[15] = 1;
}