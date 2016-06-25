var pathMaterial = new THREE.LineDashedMaterial({ color: 0x555555, dashSize: 1, gapSize: 1 });
var pathGeometry = new THREE.Geometry();
pathGeometry.vertices.push(new THREE.Vector3(0, -100, 0));
pathGeometry.vertices.push(new THREE.Vector3(0, 100, 0));
pathGeometry.computeLineDistances();
var pathMesh = new THREE.Line(pathGeometry, pathMaterial);
