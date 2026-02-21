class LVector
{
	constructor(x,y,z)
	{
		this.x = parseFloat(x);
		this.y = parseFloat(y);
		this.z = parseFloat(z);
		
		if(x === undefined) this.x = 0;
		if(y === undefined) this.y = 0;
		if(z === undefined) this.z = 0;
	}
}

class LFace
{
	constructor(a,b,c)
	{
		this.a = parseInt(a);
		this.b = parseInt(b);
		this.c = parseInt(c);
	}
}

class LMesh
{
	constructor(vertices, faces, children)
	{
		this.vertices = vertices;
		this.faces = faces;
		this.children = children;
		
		if(vertices === undefined) this.vertices = [];
		if(faces === undefined) this.faces = [];
		if(children === undefined) this.children = [];
	}
}

let Vectors = {
	constructVector: (x,y,z) => new LVector(x,y,z),	
	deconstructVector: (v) => [v.x, v.y, v.z],
	addedVector: (a,b) => new LVector(a.x+b.x,a.y+b.y,a.z+b.z),
	twoPointVector: (a,b) => new LVector(b.x-a.x,b.y-a.y,b.z-a.z),
	multipliedVector: (v,factor) => new LVector(v.x*factor, v.y*factor, v.z*factor),
	dividedVector: (v,factor) => Vectors.multipliedVector(v, 1/factor),
	vectorLength: (v) => Math.pow(Math.pow(v.x,2)+Math.pow(v.y,2)+Math.pow(v.z,2),0.5),
	vectorDistance: (a,b) => Vectors.VectorLength(Vectors.twoPointVector(a,b)),
	unitVector: (v) => Vectors.dividedVector(v, Vectors.vectorLength(v)),
	xAxisVector: (amplitude) => new LVector(amplitude,0,0),
	yAxisVector: (amplitude) => new LVector(0,amplitude,0),
	zAxisVector: (amplitude) => new LVector(0,0,amplitude),
	amplitudedVector: (v, amplitude) => Vectors.multipliedVector(Vectors.unitVector(v),amplitude),
	dotProduct: (a,b) => (a.x*b.x)+(a.y*b.y)+(a.z*b.z),
	angleBetweenVectors: (a,b) => Math.acos(Vectors.dotProduct(a,b)/(Vectors.vectorLength(a)*Vectors.vectorLength(b))),
	crossProduct: (a,b) => new LVector((a.y*b.z)-(a.z*b.y),(a.z*b.x)-(a.x*b.z),(a.x*b.y)-(a.y*b.x)),
	reversedVector: (v) => Vectors.multipliedVector(v,-1),
	cylindricalToCartesianVector: (v) => new LVector(v.x*Math.cos(v.y),v.x*Math.sin(v.y),v.z), //TODO debug
	polarToCartesianVector: (v) => new LVector(v.x*math.sin(v.y)*Math.cos(v.z),v.x*Math.sin(v.y)*Math.sin(v.z),v.x*Math.cos(v.y)), //TODO debug
	rotatedVector: (v,axis,angleInRadial) => {
		let u = Vectors.unitVector(axis);
		let c = parseFloat(Math.cos(angleInRadial));
		let s = parseFloat(Math.sin(angleInRadial));
		let n = parseFloat(1-Math.cos(angleInRadial));
		let vX = new LVector(c+(u.x*u.x*n),(u.x*u.y*n)-(u.z*s),(u.x*u.z*n)+(u.y*s));
		let vY = new LVector((u.y*u.x*n)+(u.z*s),c+(u.y*u.y*n),(u.y*u.z*n)+(u.x*s));
		let vZ = new LVector((u.z*u.x*n)-(u.y*s),(u.z*u.y*n)+(u.x*s),c+(u.z*u.z*n));
		let r = new LVector(Vectors.dotProduct(v,vX),Vectors.dotProduct(v,vY),Vectors.dotProduct(v,vZ));
		let f = Math.pow(10,5);
		return new LVector(Math.round(r.x*f)/f,Math.round(r.y*f)/f,Math.round(v.z*f)/f);
	},
	closestVector: (v,collection) => { //TODO debug
		let closestVector = collection[0];
		let smallestDistance = Vectors.VectorDistance(closestVector,v)+1;
		for(let o of collection)
		{
			let distance = Vectors.VectorDistance(v,o);
			if(distance == 0) continue;
			if(distance >= smallestDistance) continue;
			closestVector = o;
			smallestDistance = distance;
		}
		return closestVector
	},
	closestVectors: (v,collection,tolerance) => { //TODO debug
		let closestVector = [];
		let smallestDistance = Vectors.VectorDistance(closestVector,v)+1;
		for(let o of collection)
		{
			let distance = Vectors.VectorDistance(v,o);
			if(distance >= (smallestDistance - tolerance) && distance <= (smallestDistance + tolerance)) closestVectors.push(o);
			if(distance == 0) continue;
			if(distance >= (smallestDistance - tolerance)) continue;
			closestVectors = [o];
			smallestDistance = distance;
		}
	},
	randomVectors: (regionWidth,regionDepth,regionHeight,amount) => { //TODO debug
		let randomVectors = [];
		for(let i=0;i<amount;i++)randomVectors.push(new LVector(Math.random()*regionWidth,Math.random()*regionDepth,Math.random()*regionHeight));
		return randomVectors;
	},
	rectangularGrid: (planeWidth,planeHeight,columns,rows) => { //TODO debug
		let vectorGrid = [];
		let step = [planeWidth/(columns-1),planeHeight/(rows-1)];
		for(let i=0;i<rows;i++)
		{
			let row = [];
			for(let j=0;j<columns;j++) row.push(new LVector(j*step[0],i*step[1]));
			vectorGrid.push(row);
		}
		return vectorGrid;
	}
};

let Lists = {
	combinedList: (lists) => { //TODO Debug
		let combinedData = [];
		for(let list of lists) combinedData = combinedData.concat(list);
		return combinedData;
	},
	dispatchedLists: (list,pattern) => { //TODO debug
		let listA, listB = [];
		while(pattern.length<list.length) pattern = pattern.concat(pattern);
		for(let i= 0;i<list.length;i++)
		{
			if(pattern[i]) listA.push(list[i]);
			else listB.push(list[i]);
		}
		return [listA,listB];
	},
	splitLists: (list,index) => { //TODO debug
		let listA, listB = [];
		for(let i=0;i<list.length;i++)
		{
			if(i<index) listA.push(list[i]);
			else listB.push(list[i]);
		}
		return [listA,listB];
	},
	insertedItemsList: (list,items,index) => { //TODO debug
		let splittedLists = Lists.splitLists(list,index);
		return [].concat(splittedLists[0]).push(index).concat(splittedLists[1]);
	},
	nullPattern: (list) => //TODO debug
	{
		let isNull = [];
		for(let object of list)
		{
			if(object== null) isNull.push(true);
			else isNull.push(false);
		}
		return isNull;
	},
	itemIndex: (list,item) => { //TODO debug
		for(let i= 0;i<list.length;i++) if(list[i]==item) return i;
		return null
	},
	listItem: (list,index) => list[index],
	listLength: (list) => list.length,
	listPartitions: (list,size) => { //TODO debug
		let partitions, partition = [];
		let count = 0;
		for(let t of list)
		{
			partition.push(t);
			count ++;
			if(count != size) continue;
			partitions.push(partition);
			partition = [];
			count = 0;
		}
		if(partition.length > 0) partitions.push(partition);
		return partitions;
	},
	pickedAndChosenList: (listA,listB,pattern) => { //TODO debug
		let chosenList = [];
		let listSize = listA.length;
		if(listB.length>listA.length) listSize = listB.length;
		while(pattern.length<listSize) pattern.concat(pattern);
		for(let i=0;i<listSize;i++)
		{
			if(pattern[i])
			{
				if(i<listA.length) chosenList.push(listA[i]);
				else chosenList.push(listB[i]);
			}
			else
			{
				if(i<listB.length) chosenList.push(listB[i]);
				else chosenList.push(listA[i]);
			}
		}
		return chosenList;
	},
	replacedItemsList: (list,replacements,indexes) => { //TODO debug
		let replacedList = [].concat(list);
		for(let i=0;i<indexes.length;i++) replacedList[index[i]] = replacements[i];
		return replaceList;
	},
	replacedNullsList: (list,replacements) => { //TODO debug
		let replacedNulls = [].concat(list);
		let index = 0;
		for(let j=0;j<replacedNulls.length;j++)
		{
			if(replacedNulls[j] != null) continue;
			replacedNulls[j] = replacements[index];
			index++;
		}
		return replacedNulls;
	},
	reversedList: (list) => [].concat(list).reversed(), //TODO debug
	shiftedList: (list,size) => {//TODO debug
		while(size>list.length) size = size-list.size();
		let splittedLists = Lists.splitLists(list,list.length-size);
		return [].concat(splittedLists[1]).concat(splittedLists[0]);
	}, 
	siftedList: () => { //TODO debug
		let siftedList = [];
		while(pattern.length<list.length)pattern.concat(pattern);
		for(let i=0;i<list.length;i++)
		{
			if(pattern[i]) siftedList.push(null);
			else siftedList.push(list[i]);
		}
		return siftedList;
	},
	subList: (list,start,end) => //TODO debug
	{
		let subList = [];
		for(let i=0;i<list.length;i++)
		{
			if(i<start || i>end) continue;
			sublist.push(list[i]);
		}
		return subList;
	},
	wovenList: (listA,listB,pattern) => { //TODO debug
		let wovenList = [];
		let listSize = listA.length+listB.length;
		while(patter.length<listSize) pattern.concat(pattern);
		let indexA,indexB = 0;
		for(let i=0;i<listSize;i++)
		{
			if(pattern[i])
			{
				if(indexA<listA.length)
				{
					wovenList.push(listA[indexA]);
					indexA++;
				}
				else
				{
					wovenList.push(listB[indexB]);
					indexB++;
				}
			}
			else
			{
				if(indexB<listB.length)
				{
					wovenList.push(listB[indexB]);
					indexB++;
				}
				else
				{
					wovenList.push(listA[indexA]);
					indexA++;
				}
			}
		}
		return wovenList;
	}
}

let Meshes = {
	triangleMesh: (a,b,c) => new LMesh([a,b,c],[new LFace(0,1,2)]),
	faceVertices: (face,parentMesh) => [parentMesh.vertices[face.a],parentMesh.vertices[face.b],parentMesh.vertices[face.c]],
	meshVertices: () => mesh.vertices,
	planeMesh: (planeWidth,planeHeight,columns,rows) => {
		let planeMesh = new LMesh();
		let vectorGrid = Vectors.rectangularGrid(planeWidth,planeHeight,columns+1,rows+1);
		for(let array of vectorGrid) for(let v of array) planeMesh.vertices.push(v);
		for(let i=1;i<vectorGrid.length;i++)
		{
			for(let j=1;j<vectorGrid[0].length;j++)
			{
				let indexMap = [
					(i-1)*vectorGrid[0].length+(j-1),
					i*vectorGrid[0].length+(j-1),
					(i-1)*vectorGrid[0].length+j,
					i*vectorGrid[0].length+j
				];
				planeMesh.faces.push(new LFace(indexMap[0],indexMap[1],indexMap[2]));
				planeMesh.faces.push(new LFace(indexMap[3], indexMap[2], indexMap[1]));
			}
		}
		return planeMesh;
	},
	boxMesh: (boxWidth,boxDepth,boxHeight,columns,rows,layers) => { //TODO define
		let boxMesh = new LMesh();
		let step = new LVector(boxWidth/columns, boxDepth/rows, boxHeight/layers);
		let indexTable = [];
		for(let i=0;i<columns+1;i++){
			indexTable.push([]);
			for(let j=0;j<rows+1;j++)
			{
				indexTable[i].push([]);
				for(let k=0;k<layers+1;k++) indexTable[i][j].push(null);
			}
		}
		let index = 0;
		for(let i=0;i<indexTable.length;i++){
			for(let j=0;j<indexTable[0].length;j++)
			{
				for(let k=0;k<indexTable[0][0].length;k++)
				{
					if (i == 0 || j == 0 || k == 0 || i == columns || j == rows || k == layers)
					{
						boxMesh.vertices.push(new LVector(i*step.x, j*step.y, k*step.z));
						indexTable[i][j][k] = index;
						index++;
					}
				}
			}
		}
		for(let j=1;j<indexTable[0].length;j++)
		{
			for(let k=1;k<indexTable[0][0].length;k++)
			{
				boxMesh.faces.push(new LFace(indexTable[0][j-1][k-1], indexTable[0][j][k-1], indexTable[0][j-1][k]));
				boxMesh.faces.push(new LFace(indexTable[0][j][k-1], indexTable[0][j][k], indexTable[0][j-1][k]));
				let l = indexTable.length-1;
				boxMesh.faces.push(new LFace(indexTable[l][j][k-1], indexTable[l][j-1][k-1], indexTable[l][j][k]));
				boxMesh.faces.push(new LFace(indexTable[l][j-1][k], indexTable[l][j][k], indexTable[l][j-1][k-1]));
			}
		}
		for(let i=1;i<indexTable.length;i++)
		{
			for(let k=1;k<indexTable[0][0].length;k++)
			{
				boxMesh.faces.push(new LFace(indexTable[i-1][0][k], indexTable[i][0][k-1], indexTable[i-1][0][k-1]));
				boxMesh.faces.push(new LFace(indexTable[i-1][0][k], indexTable[i][0][k], indexTable[i][0][k-1]));
				let l = indexTable[0].length-1;
				boxMesh.faces.push(new LFace(indexTable[i][l][k-1], indexTable[i][l][k], indexTable[i-1][l][k-1]));
				boxMesh.faces.push(new LFace(indexTable[i-1][l][k-1], indexTable[i][l][k], indexTable[i-1][l][k]));
		   
			}
		}
		for(let i=1;i<indexTable.length;i++)
		{
			for(let j=1;j<indexTable[0].length;j++)
			{
				boxMesh.faces.push(new LFace(indexTable[i-1][j-1][0], indexTable[i][j][0], indexTable[i-1][j][0]));
				boxMesh.faces.push(new LFace(indexTable[i][j-1][0], indexTable[i][j][0], indexTable[i-1][j-1][0]));
				let l = indexTable[0][0].length-1;
				boxMesh.faces.push(new LFace(indexTable[i][j][l], indexTable[i][j-1][l], indexTable[i-1][j-1][l]));
				boxMesh.faces.push(new LFace(indexTable[i][j][l], indexTable[i-1][j-1][l],indexTable[i-1][j][l]));
			}
		}
		return boxMesh;
	},
	meshEdges: (mesh) => { //TODO debug
		let edges = [];
		for(let i=0;i<mesh.vertices.length;i++)
		{
			let a = mesh.vertices[i];
			for(let j=0;j<mesh.vertices.length;j++)
			{
				if(j<=i) continue;
				let b = mesh.vertices[j];
				let isPartner = false;
				for(let f of mesh.faces)
				{
					let aFound,bFound = false;
					if(i==f.a||i==f.b||i==f.c) aFound = true;
					if(j==f.a||j==f.b||j==f.c) bFound = true;
					if(aFound == false && bFound == false) continue;
					isPartner = true;
				}
				if(isPartner == false) continue;
				edges.push([a,b]);
			}
		}
		return edges;
	},
	culledFacesMesh: (mesh) => new LMesh(mesh.vertices,Lists.dispatchedLists(mesh.faces,pattern)[0],mesh.children), //TODO debug
	culledVerticesMesh: (mesh,pattern) => { //TODO debug
		let culledVerticesMesh = new LMesh(Lists.dispatchedLists(mesh.vertices,pattern)[0],mesh.children);
		let culledIndexes = [];
		for(let i=0;i<culledVerticesMesh.vertices.length;i++) culledIndexes.push(i);
		culledIndexes = Lists.dispatchedLists(culledIndexes,pattern)[0];
		let culledFaces = [];
		for(let f of culledVerticesMesh.faces)
		{
			let fixedIndexA,fixedIndexB,fixedIndexC = false;
			for(let i=0;i<culledIndexes.length;i++)
			{
				if(culledIndexes[i]==f.a)
				{
					f.a=i;
					fixedIndexA=true;
				}
				if(culledIndexes[i]==f.b)
				{
					f.b=i;
					fixedIndexB=true;
				}
				if(culledIndexes[i]==f.c)
				{
					f.c=i;
					fixedIndexC=true;
				}
			}
			if(fixedIndexA==false && fixedIndexB==false && fixedIndexC == false) continue;
			culledFaces.push(new LFace(f.a,f.b,f.c));
		}
		culledVerticesMesh.faces=culledFaces;
		return culledVerticesMesh;
	},
	deletedFacesMesh: (mesh,indexes) =>  { //TODO debug
		let pattern = [];
		for(let i=0;i<indexes.length;i++)
		{
			if(indexes[i] == i) pattern.push(false);
			else pattern.push(true);
		}
		return culledFacesMesh(mesh,pattern);
	},
	deletedVerticesMesh: (mesh,indexes) => { //TODO debug
		let pattern = [];
		for(let i=0;i<indexes.length;i++)
		{
			if(indexes[i] == i) pattern.push(false);
			else pattern.push(true);
		}
		return culledVerticesMesh(mesh,pattern);
	},
	joinedMesh: (meshes) => { //TODO debug
		let joinedMesh = new LMesh();
		for(let m of meshes)
		{
			let indexSize = joinedMesh.vertices.length;
			joinedMesh.vertices = Lists.combinedList([joinedMesh.vertices,m.vertices]);
			for(let f of m.faces) joinedMesh.faces.push(new LFace(f.a+indexSize,f.b+indexSize,f.c+indexSize));
		}
		return joinedMesh;
	}
}

let Render = {
	staticCamera: (target,position) => camera(position.x,position.y,position.z,target.x,target.y,target.z,0,0,-1),
	orbitCamera: (target,polarPosition) => {
		let position = new LVector(
      Math.cos(polarPosition.y)*polarPosition.x, 
      Math.sin(polarPosition.y)*polarPosition.x, 
      Math.sin(polarPosition.z)*polarPosition.x
      );
    Render.staticCamera(target,Vectors.addedVector(position, target));
	},
	mouseCamera: (target,cameraDistance) => {
		let mousePosition = new LVector(
      cameraDistance, 
      map(mouseX, 0, width, -PI, PI), 
      map(mouseY, 0, height, -PI/2, PI/2)
      );
    Render.orbitCamera(target, mousePosition);
	},
	mesh: (mesh) => { //TODO add graphicsbuffer //TODO add normals
		beginShape(TRIANGLES);
		for(let f of mesh.faces)
		{
		let vertices = [mesh.vertices[f.a],mesh.vertices[f.b],mesh.vertices[f.c]];
			for(let v of vertices) vertex(v.x, v.y, v.z);
		}
		endShape();
	},
	meshNormals: (mesh,normalLength) => { //TODO add graphicsbuffer
		for(let f of mesh.faces)
		{
			let a = mesh.vertices[f.a];
			let b = mesh.vertices[f.b];
			let c = mesh.vertices[f.c];
			let m = Vectors.dividedVector(Vectors.addedVector(Vectors.addedVector(a, b), c), 3);		
			let n = Vectors.unitVector(Vectors.crossProduct(Vectors.twoPointVector(a, c), Vectors.twoPointVector(a, b)));		
			let v = Vectors.addedVector(m, Vectors.amplitudedVector(n, normalLength));
			line(m.x, m.y, m.z, v.x, v.y, v.z);
		}
	},
	meshVertices: (mesh,weight) => { //TODO add graphicsbuffer
		//beginShape(POINTS);
		for(let v of mesh.vertices)
		{
			push();
			translate(v.x,v.y,v.z);
			sphere(weight);
			pop();
		}
		//endShape();
	},
	rainbowMesh: (mesh) => { //TODO add graphicsbuffer //TODO add normals
		beginShape(TRIANGLES);
		for(let f of mesh.faces)
		{
			let vertices = [mesh.vertices[f.a],mesh.vertices[f.b],mesh.vertices[f.c]];
		  let n = Vectors.unitVector(Vectors.crossProduct(Vectors.twoPointVector(vertices[0], vertices[2]), Vectors.twoPointVector(vertices[0], vertices[1])));
			let colour = new LVector(
				map(n.x, -0.87, 0.87, 0, 255), 
				map(n.y, -0.87, 0.87, 0, 255), 
		    map(n.z, -0.87, 0.87, 0, 255)
		  );
			fill(colour.x,colour.y,colour.z);
			for(let v of vertices) vertex(v.x, v.y, v.z);
		}
		endShape();
	}
}