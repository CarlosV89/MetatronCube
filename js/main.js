(function(){
 var canvas = document.querySelector("#metaCube");
 var ctx = canvas.getContext('2d');
 var centerX = canvas.width / 2;
 var centerY = canvas.height / 2;
 var globalRad = 45;
 var drawCircle = function(posX, posY, radius,color){
    ctx.lineWidth=1;
    if(color!==undefined){
       ctx.strokeStyle=color;
    }else{
       ctx.strokeStyle='black';
    }
    ctx.beginPath();

    ctx.arc(posX, posY, radius, 0, 2*Math.PI, false);
    ctx.stroke();
    
    ctx.fillStyle='red';
    ctx.fillRect(posX-1.5,posY-1.5,3,3);
    ctx.beginPath();
}

/*var drawCircleOfLife = function(){
	for(i=0;i<=canvas.width+radius;i=i+radius){
	 	for(o=0;o<=canvas.height+radius;o=o+radius){
			drawCircle(i, o);
	 	}
	 }
};*/
var drawMetatonsCube = function(){
	var mainCirc = new Circle(centerX, centerY, globalRad);
    var circ;
    console.log(mainCirc);

    drawCircle(mainCirc.posX, mainCirc.posY, mainCirc.radius);
	
    circ = new Circle(centerX, centerY+globalRad, globalRad);
    drawCircle(circ.posX, circ.posY, circ.radius);
    //drawCircle(centerX,centerY-radius);
	
    var newPoints =intersection(mainCirc, circ);
	var result = centerY;

	//drawCircle(newPoints[0],newPoints[1]);
	//drawCircle(newPoints[2],newPoints[3]);

	//result -= centerY-radius; 
	
	var resultX = centerX;
	console.log(centerY-result/2);



};

/*
*	As we are defining the pattern of life, we will define the diameter of all *the cells (each circle) to be equal so I will not need to take in the raidus, *just the position of the circles
*
*
*Translated from : http://paulbourke.net/geometry/circlesphere/tvoght.c
*
*
*/
function intersection(x0, y0, x1, y1, circ0, circ1) {
        var x0 = circ0.posX;
        var y0 = circ0.posY;
        var x1 = circ1.posX;
        var y1 = circ1.posY;
        var r0 = circ0.radius; 
        var r1 = circ0.radius;
        var a, distanceX, distanceY, centersDistance, h, rx, ry;
        var x2, y2;

        /* 
         * Distance x(distanceX) is the distance between the x position of the first circle *and the x position of the second circle
         *Distance y(distanceY) is the distance between the y position of the first circle *and the y position of the second circle
         */
        distanceX = x1 - x0;
        distanceY = y1 - y0;

        /* Determine the straight-line distance between the centers. */
        centersDistance = Math.sqrt((distanceY*distanceY) + (distanceX*distanceX));

        /* Check for solvability. */
        if (centersDistance > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            return false;
        }
        if (centersDistance < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            return false;
        }

        /* 
        * Point 2, is where the line that is drawn from the two existing circles and the line(linear function) that defines the intersection points intersects, to find the coordinate of this point we first create a triangle using as references P0, P1, and one of the intersection points, then we can proceed to the next step
        *
        * Determine the distance from the center of the first Circle to point 2 with the following formula; D is the distance between the center of both circles, x= (r0^2 - r1^2 + D^2)/ (2 x D)
        */
        a = ((r0*r0) - (r1*r1) + (centersDistance*centersDistance)) / (2.0 * centersDistance) ;

        /* Determine the coordinates of point 2. */
        x2 = x0 + (distanceX * a/centersDistance);
        y2 = y0 + (distanceY * a/centersDistance);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((r0*r0) - (a*a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -distanceY * (h/centersDistance);
        ry = distanceX * (h/centersDistance);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [xi, yi, xi_prime, yi_prime];
    }

 

 drawMetatonsCube();
  

})();