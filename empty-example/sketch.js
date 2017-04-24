
//=======================================================================

//Size i pixels of the hexes
var sizeOfHexInPixels = 40;

//Instantiate the cubeMap so it's in the global namespace (BAAAD!!)
//var cubeMap;

//This function creates the basic Cubeoidal Hex
function Hex(q, r, s) {
    return {q: q, 
	    	r: r, 
	    	s: s};
} 

// This is a constructor for a basic Axial Hex
function Axial(x, z){
	return {x: x, z: z }
}

//This is a constructor for a Point
function Point(x, y) {
    return {x: x, y: y};
}

//This function converts cube coordinates to axial coordinates
function cubeToAxial (hex){
	var x, z;
	x = hex.q;
	z = hex.r;
	return Axial(x, z);
}

//This function converts axial coordinates to cubeoidal coordinates
function axialToCube(axial) {
	var q, r, s;
	q = axial.x;
	r = axial.z;
	s = -q-r;
	return Hex(q, r, s);
}

//Theoretically, this function should
//give us the (relative)? coordinates
//in pixels of the centre(?) of a hex
function hexToPixel(hex) {
	var x = Math.sqrt(3) * 40 * (hex.s/2 + hex.q)
	var y = 3/2 * 40 * hex.s
	return Point(x, y);
}



//=======================================================================
/**
In this section, we create a 2-dimensional array called axialHexMap that 
holds all of our hexes with axial coordinates. 

The function convertAxialArrayToCubeArray takes an axial array 
and creates a new array in cubeoidal coordinates.
**/
var axialHexMap = [];
var numRows = 8;
var rowLength = 8;
var row = 0;
	createMap();

function createMap() {
	console.log('createMap Called');
	for (var i = 0; i < numRows; i++) {
		for (var j = 0; j < rowLength; j++) {
			var hexCoord = [j, row];
			console.log('hexCoords');
			console.log(hexCoord);
			axialHexMap.push(hexCoord);
		}
		row += 1;
	}
	//console.log('axial hex map array ' + axialHexMap);
}

/*

FOR SOME REASON (??????) THIS CODE BELOW CREATES A HEX MAP LIKE THE 
ONE REPRESENTED ONE THE SCREEN (UPSIDE DOWNISH). AND 

*/

function convertAxialArrayToCubeArray (array){
	//write a function that creates a new array in cube 
	//coordinates from an array of axial coordinates
	var cubeArray = [];
	for (var i = 0; i < array.length; i++) {
		var axialHexObject = Axial(array[i][0], array[i][1]);

		cubeArray.push(axialToCube(axialHexObject))
		// console.log(cubeArray[i].q, cubeArray[i].r, cubeArray[i].s);
		// console.log(hexToPixel(axialToCube(axialHexObject)));
	}
	//console.log(cubeArray);
	return cubeArray;
	

}

var cubeMap = convertAxialArrayToCubeArray(axialHexMap);
//console.log(cubeMap);


/**
This code creates map of the cubeoidal coordinates, and convertCubeMapArrayToPixel
should create a new array that substitutes the cubeoidal hex coordinates to 
pixel coordinates.

ERROR FROM CONVERTAXIALTOCUBE IS CARRYING OVER TO THIS FUNCTION

**/



	function convertCubeMapArrayToPixel(array){
		var pixelArray = [];
		for (var i = 0; i < array.length; i++) {
			var hexCubeObject = Hex(array[i].q, array[i].r, array[i].s);
			var pixelPositionObject = hexToPixel(hexCubeObject);
			pixelPositionObject.x = pixelPositionObject.x + 900 ;
			pixelPositionObject.y = pixelPositionObject.y + 900;
			pixelArray.push(pixelPositionObject);
			//console.log(hexCubeObject);
			//console.log(pixelArray[i]);
		}
		return pixelArray;
	}

var pixelMap = convertCubeMapArrayToPixel(cubeMap);
//console.log(pixelMap);
 

	function hexCorner(center, size, i){
    var angle_deg = 60 * i   + 30
    var angle_rad = Math.PI / 180 * angle_deg
    return Point(center.x + size * Math.cos(angle_rad),
                 center.y + size * Math.sin(angle_rad))
	}



	var pixelCenter = Point();


	




	/*
	This function returns the coordinates of the hex that is being mousedover. But it
	does so by creating a new hex. Need to create a function that will check for equivalency (==)
	along the entire axial array.

	Once you know which hex it is based on the pixel to hex formula, you need to then re-convert to 
	pixel, and draw dark blue on the hex.

	You'd also need, once you had determined which hex it was in axial coordinate, to do any updating
	on the axial or cube array that was relevant (it's selected, or fired upon)

	One of the arrays is going to have to be canonical. Cube?

	I dont understand how hex_roudn works. I know what it does.
	*/ 


//this 
	function hex_round(h)
	{
	    var q = Math.trunc(Math.round(h.q));
	    var r = Math.trunc(Math.round(h.r));
	    var s = Math.trunc(Math.round(h.s));
	    console.log('h.s: ' + h.s);
	    var q_diff = Math.abs(q - h.q);
	    var r_diff = Math.abs(r - h.r);
	    var s_diff = Math.abs(s - h.s);
	    if (q_diff > r_diff && q_diff > s_diff)
	    {
	        q = -r - s;
	    }
	    else
	        if (r_diff > s_diff)
	        {
	            r = -q - s;
	        }
	        else
	        {
	            s = -q - r;
	        }
	    return Hex(q, r, s);
	}

//CHECK THIS CODE!!!!!!!! THIS IS WHAT'S NOT WORKING
	function pixelToCubeHex(x, y){
	    q = (x * Math.sqrt(3)/3 - y / 3) / sizeOfHexInPixels;
	    r = y * 2/3 / sizeOfHexInPixels;
	    return hex_round(axialToCube(Axial(q, r)));
	}

/*

The following function is supposed to return the cube array hex entry that 
is selected through a click. This is what we'll use to 

*/
// 	function checkHexAgainstCubeArray(hex){
// 		for (var i = 0; i < cubeMap.length; i++) {
// 			if(hex.q == cubeMap[i].q){
// 				console.log('step 1 cubeMap q' + cubeMap[i].q);
// 				console.log('step 1 hex q' + hex.q);
// 				if(hex.r == cubeMap[i].r){
// 				console.log('step 2 cubeMap r' + cubeMap[i].r);
// 				console.log('step 2 hex r' + hex.r);
// 					if(hex.s == cubeMap[i].s){
// 						console.log("cube");
// 						return(cubeMap[i]);
// 					} else { return false; 
// 				} 
// 			} else { return false;
// 			}
// 		}
// 	}
// }

	function checkHexAgainstCubeArray(hex){
		for (var i = 0; i < cubeMap.length; i++) {
			//console.log(cubeMap[i].q);
			var q = hex.q;
			var r = hex.r;
			var s = hex.s;
			var cq = cubeMap[i].q
			var cr = cubeMap[i].r
			var cs = cubeMap[i].s
			//console.log(q,r,s,cq,cr,cs);
			if(q == cq && r == cr && s == cs){
				//console.log('condition met');
				return cubeMap[i];
			}
		}
	}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setup() {
	createCanvas(1200,1200);

	
	for (var i = 0; i < pixelMap.length; i++) {
		pixelCenter = Point(pixelMap[i].x, pixelMap[i].y);
		//console.log('Pixel x: ' + pixelMap[i].x);
		//console.log('Pixel y: ' + pixelMap[i].y);
		drawHex(pixelCenter);
	}


	function drawHex(hexCenter){
		var corner = hexCorner(hexCenter, 40, 0);
		//console.log(corner);
		var corner2 = hexCorner(hexCenter, 40, 1);
		var corner3 = hexCorner(hexCenter, 40, 2);
		var corner4 = hexCorner(hexCenter, 40, 3);
		var corner5 = hexCorner(hexCenter, 40, 4);
		var corner6 = hexCorner(hexCenter, 40, 5);
		line(corner.x, corner.y, corner2.x, corner2.y);
		line(corner2.x, corner2.y, corner3.x, corner3.y);
		line(corner3.x, corner3.y, corner4.x, corner4.y);
		line(corner4.x, corner4.y, corner5.x, corner5.y);
		line(corner5.x, corner5.y, corner6.x, corner6.y);
		line(corner6.x, corner6.y, corner.x, corner.y);
	}

}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------------------------------------------

function draw() {
	
	// var liveLoc = pixelToHex(mouseX, mouseY);
	// //console.log(liveLoc);
	// if(mouseIsPressed){
	// 	ellipse(mouseX, mouseY, 20);
	// }
	//var liveLoc = { x: mouseX, y: mouseY }
	//console.log("liveLoc: " + liveLoc.x, liveLoc.y);


}

	
function mousePressed(){
	var loc = pixelToCubeHex(mouseX, mouseY);
	console.log(mouseX, mouseY);
	console.log(checkHexAgainstCubeArray(loc));

	return false;
}



// y = 3/2 * s * b
// b = 2/3 * y / s
// x = sqrt(3) * s * ( b/2 + r)
// x = - sqrt(3) * s * ( b/2 + g )
// r = (sqrt(3)/3 * x - y/3 ) / s
// g = -(sqrt(3)/3 * x + y/3 ) / s
