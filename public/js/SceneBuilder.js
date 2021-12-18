async function createField() 
{
ext = viewer.getExtension('Autodesk.Viewing.SceneBuilder');

modelBuilder = await ext.addNewModel({
conserveMemory: false,
modelNameOverride: 'My Model Name' //название модели
});

// пример построения box из материала purple
purple = new THREE.MeshPhongMaterial({ //материал создаваемой модели
color: new THREE.Color(1, 0, 1)
});
modelBuilder.addMaterial('purple', purple);

box = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(10, 10, 10));
let id = modelBuilder.addGeometry(box);

const transform = new THREE.Matrix4().compose( //геометрия модели
new THREE.Vector3(-15, 0, 0),
new THREE.Quaternion(0, 0, 0, 1),
new THREE.Vector3(1, 1, 1)
);
modelBuilder.addFragment(1, 'purple', transform); //метод возвращает id фрагмента

// пример построения torus из материала red
red = new THREE.MeshPhongMaterial({
color: new THREE.Color(1, 0, 0)
});
torus = new THREE.BufferGeometry().fromGeometry(new THREE.TorusGeometry(10, 2, 32, 32));

const transform1 = new THREE.Matrix4().compose(
new THREE.Vector3(19, 0, 0),
new THREE.Quaternion(0, 0, 0, 1),
new THREE.Vector3(1, 1, 1)
);
modelBuilder.addFragment(torus, red, transform1);

// пример построения двух геометрий с помощью сетки
mesh = new THREE.Mesh(torus, purple);
mesh.matrix = new THREE.Matrix4().compose(
new THREE.Vector3(0, 12, 12),
new THREE.Quaternion(0, 0, 0, 1),
new THREE.Vector3(1, 1, 1)
);
mesh.dbId = 100; // Set the database id for the mesh
modelBuilder.addMesh(mesh);

}