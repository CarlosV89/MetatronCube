(function(){
 var canvas = document.querySelector("#metaCube");
 var ctx = canvas.getContext('2d');
 var centerX = canvas.width / 2;
 var centerY = canvas.height / 2;

 var radius = 45;
 var mysticalNumber = radius-6;
var drawCircle = function(x, y,color){
 	 if(color!==undefined){
 	 	ctx.strokeStyle=color;
 	 }else{
 	 	ctx.strokeStyle='black';
 	 }
 	 ctx.beginPath();
	 ctx.arc(x, y, radius, 0, 2*Math.PI, false);
	 ctx.lineWidth=1;
	 
	 ctx.stroke();
	 
	 ctx.fillStyle='red';
	 ctx.fillRect(x-1.5,y-1.5,3,3);
	 ctx.beginPath();
 };

var drawCircleOfLife = function(){
	for(i=0;i<=canvas.width+radius;i=i+radius){
	 	for(o=0;o<=canvas.height+radius;o=o+radius){
			drawCircle(i, o);
	 	}
	 }
};
var drawMetatonsCube = function(){
	drawCircle(centerX,centerY);
	drawCircle(centerX,centerY-radius);
	var newPoints =intersection(350,350,350,305);
	var result = centerY;
	console.log(newPoints);
	drawCircle(newPoints[0],newPoints[1]);
	drawCircle(newPoints[2],newPoints[3]);

	result -= centerY-radius; 
	
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
function intersection(x0, y0, x1, y1) {
        var r0=45; var r1=45;
        var a, distanceX, distanceY, d, h, rx, ry;
        var x2, y2;

        /* 
         * Distance x(distanceX) is the distance between the x position of the first circle *and the x position of the second circle
         *Distance y(distanceY) is the distance between the y position of the first circle *and the y position of the second circle
         */
        distanceX = x1 - x0;
        distanceY = y1 - y0;

        /* Determine the straight-line distance between the centers. */
        d = Math.sqrt((distanceY*distanceY) + (distanceX*distanceX));

        /* Check for solvability. */
        if (d > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            return false;
        }
        if (d < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            return false;
        }

        /* 
        * Point 2, is where the line that is drawn from the two existing circles and the line(linear function) that defines the intersection points intersects
        *
         */

        /* Determine the distance from point 0 to point 2. */
        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

        /* Determine the coordinates of point 2. */
        x2 = x0 + (distanceX * a/d);
        y2 = y0 + (distanceY * a/d);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((r0*r0) - (a*a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -distanceY * (h/d);
        ry = distanceX * (h/d);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        return [xi, yi, xi_prime, yi_prime];
    }

 

 drawMetatonsCube();
  

})();