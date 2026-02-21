let offset,direction,timer,interval;

function setup()
{
	createCanvas(windowWidth,windowHeight,WEBGL);
	
	offset = new LVector();
	direction = new LVector(0.01,0.01,0.01);
	timer = 0;
	interval = 180;
}

function draw()
{
	background(240);
	Render.mouseCamera(new LVector(),160);
	cursor(CROSS);
	
	let mesh = Meshes.boxMesh(100, 100, 100, 15, 15, 15);
	for (let i=0;i<mesh.vertices.length;i++)
  {
    let v = mesh.vertices[i];
    v = Vectors.addedVector(v, new LVector(-50, -50, -50));    
    v = Vectors.unitVector(v);
    let n = Vectors.addedVector(v, offset);
    let noiseValue = noise(n.x, n.y, n.z) * 100;
    v = Vectors.multipliedVector(v, noiseValue);    
    mesh.vertices[i] = v;
  }
	
	offset = Vectors.addedVector(offset, direction);
	timer++;
  if (timer >= interval)
  {
    direction = new LVector(random(-0.02, 0.02), random(-0.02, 0.02), random(-0.02, 0.02));
    timer = 0;
  }
	
  noStroke(); 
  Render.rainbowMesh(mesh);
}