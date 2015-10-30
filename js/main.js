(function(){
 var canvas = document.querySelector("#metaCube");
 var ctx = canvas.getContext('2d');
 var centerX = canvas.width / 2;
 var centerY = canvas.height / 2;
 var globalRad = 45;
 var circles=[];
 circles.push(new Circle(centerX, centerY, globalRad, "red"));
 
 var largCirc = new Circle(centerX, centerY, globalRad*2, "purple")
 var drawCircle = function(circle){
            ctx.lineWidth=1;
            if(circle.color!==undefined){
                ctx.strokeStyle=circle.color;
            }else{
                ctx.strokeStyle='black';
            }
            ctx.beginPath();

            ctx.arc(circle.posX, circle.posY, circle.radius, 0, 2*Math.PI, false);
            ctx.stroke();
        
            ctx.fillStyle='red';
            ctx.fillRect(circle.posX-1.5,circle.posY-1.5,3,3);
            ctx.beginPath();
            circles.push(circle);
    
}

var exists = function(posX, posY){
    console.log(circles.length, circles.length-1);
    for (var i = circles.length - 1; i >= 0; i--) {
            console.log(i);
        if(circles[i]!==undefined && circles[i].posX == posX && circles[i].posY==posY){
            return true
        }else return false;
    }
    
};
var drawSeedOfLife = function(){
    var circ;
    for (var i = 0; i < 6; i++) {
        if(i==0){
            circles.push(new Circle(centerX+globalRad, centerY, globalRad));
            drawCircle(circles[i]);
            drawCircle(circles[i+1]);
        }else{ 
            var newPoints =intersection(circles[0], circles[i]);
            circ=new Circle(newPoints[0], newPoints[1], globalRad);
            if (!exists(circ)) {
                circles.push(circ);
                drawCircle(circ);
            };
            
          //console.log(circles,"circles");
          //console.log(circles[i],"circles-i");
            drawCircle(circles[i]);
            
        }
    }
    var o = circles.length;

    
    /*for (var i = 1; i < o; i++) {
        var newPoints =intersection(circles[circles.length-i], circles[circles.length-i-1]);
        
        circles.push(new Circle(newPoints[0], newPoints[1], globalRad));
        
        drawCircle(circles[circles.length-1], circles.length);
    };*/
};
var drawMetatonsCube = function(){

    //draw First level - Seed of Life
    drawSeedOfLife();   
};

/*
*	As we are defining the pattern of life, we will define the diameter of all *the cells (each circle) to be equal so I will not need to take in the raidus, *just the position of the circles
*
*
*Translated from : http://paulbourke.net/geometry/circlesphere/tvoght.c
*
*
*/
function intersection(circ0, circ1) {
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