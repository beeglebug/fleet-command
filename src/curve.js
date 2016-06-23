
var curveMaterial = new THREE.LineBasicMaterial( { color: 0x54878F, linewidth: 1 } );
var curve = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-2, -18, 0),
  new THREE.Vector3(-40, -40, 0)
);
var curvePath = new THREE.CurvePath();
curvePath.add(curve);
var curveMesh = new THREE.Line(curvePath.createPointsGeometry(20), curveMaterial);
scene.add(curveMesh);