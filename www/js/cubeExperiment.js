// make a cube constructor
// pseudoclassical instantiation pattern
var Cube = function(x, y, z, w, h, d) { // x, y, z coordinate of one point, width, height, depth of cube
	// create obj
	this.nodes = [	[x,   y,   z  ],
					[x,   y,   z+d],
					[x,   y+h, z  ],
	                [x,   y+h, z+d],
	                [x+w, y,   z  ],
	                [x+w, y,   z+d],
	                [x+w, y+h, z  ],
	                [x+w, y+h, z+d]  ];
	this.edges = [  [0, 1], [1, 3], [3, 2], [2, 0],
                 	[4, 5], [5, 7], [7, 6], [6, 4],
                 	[0, 4], [1, 5], [2, 6], [3, 7]  ];
	// return obj
	// obj.nodes = nodes array
	// obj.edges = edges array
};

// instantiation example: var cube1 = new Cube(50, 50, 50, 10, 10, 10)
// places a cube at location (50, 50, 50) with a width, height, depth of 10

Cube.prototype.drawCubeEdges = function(cube1, cube2) { // takes any number of cube objects
	var cubes = Array.prototype.slice.call(arguments);
	for (var i = 0; i < cubes.length; i++) {
		var nodes = cubes[i].nodes;
		var edges = cubes[i].edges;

		for (var j = 0; j < edges.length; j++) {
			var n0 = edges[j][0];
			var n1 = edges[j][1];
			var node0 = nodes[n0];
			var node1 = nodes[n1];
			// add phaser graphics and draw lines connecting these nodes
			var graphics = game.add.graphics(0,0);
			graphics.beginFill(0xccccff);
			graphics.lineStyle(5, 0xccccff, 1);
			graphics.moveTo(node0[0], node0[1]);
			graphics.lineTo(node1[0], node1[1]);
			graphics.endFill();
		}
	}
};

Cube.prototype.drawCubeNodes = function(nodeSize, cube1, cube2) { // takes any number of cube objects
	var args = Array.prototype.slice.call(arguments);
	var cubes = args.slice(1);
	for (var i = 0; i < cubes.length; i++) {
		var nodes = cubes[i].nodes;

		for (var j = 0; j < nodes.length; j++) {
			var node = nodes[j];
			// add phaser graphics and draw circles at nodes
			var graphics = game.add.graphics(0,0);
			graphics.beginFill(0xb2b2ff);
			graphics.lineStyle(10, 0xb2b2ff, 1);
			graphics.drawCircle(node[0], node[1], nodeSize);
			graphics.endFill();
		}
	}
};

Cube.prototype.rotateZ3d = function(theta, nodes) {
	var sinT = Math.sin(theta);
	var cosT = Math.cos(theta);

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var x = node[0];
		var y = node[1];
		node[0] = x * cosT - y * sinT;
		node[1] = y * cosT + x * sinT;
	}
};

Cube.prototype.rotateY3d = function(theta, nodes) {
	var sinT = Math.sin(theta);
	var cosT = Math.cos(theta);

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var x = node[0];
		var z = node[2];
		node[0] = x * cosT - z * sinT;
		node[2] = z * cosT + x * sinT;
	}
	// TODO: redraw cube
};

Cube.prototype.rotateX3d = function(theta, nodes) {
	var sinT = Math.sin(theta);
	var cosT = Math.cos(theta);

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var y = node[1];
		var z = node[2];
		node[1] = y * cosT - z * sinT;
		node[2] = z * cosT + y * sinT;
	}
};


















