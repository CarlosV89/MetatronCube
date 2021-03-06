(function(){
 var canvas = document.querySelector("#metaCube");
 var ctx = canvas.getContext('2d');
 var centerX = canvas.width / 2;
 var centerY = canvas.height / 2;
 var globalRad = 45;
 var circles=[];
 function drawCircle(circle){
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

function exists(circle){
    for (var i = circles.length - 1; i >= 0; i--) {
        if (circles[i]!==undefined) {
           if(
            circle.posX >= circles[i].posX-2  && circle.posX <= circles[i].posX+2 &&
             
            circle.posY >= circles[i].posY-2  && circle.posY <= circles[i].posY+2){
                return true;
            }
        }       
    }
    return false;
}
function drawSeedOfLife(){
  drawCircle(new Circle(centerX, centerY, globalRad, "red"));
  var circ;
  var circ2;
  var newPoints;
  for (var o = 0;  o <= 36; o++) {
    if(o===0){
      drawCircle(new Circle(centerX, centerY-globalRad, globalRad));
    }
    for (var p = 0; p <= circles.length-1; p++) {
      newPoints=intersection(circles[o], circles[p]);
      if(!isNaN(newPoints[0])){
        circ=new Circle(newPoints[0], newPoints[1], globalRad);
        circ2=new Circle(newPoints[2], newPoints[3], globalRad);  
      }
      if (circ !== undefined && exists(circ)===false) {
          drawCircle(circ);
      }
      if (circ2 !== undefined && exists(circ2)===false) {
          drawCircle(circ2);  
      }
    }
  }    
}
function drawMetatonsCube(){

    //draw First level - Seed of Life
    drawSeedOfLife(); 
    var largCirc = new Circle(centerX, centerY, globalRad*2, "purple");
    //drawCircle(largCirc);
    var largerCirc = new Circle(centerX, centerY, globalRad*5, "green");
    drawCircle(largerCirc); 
}
/**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
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
        xi=Math.round10(xi,-1);
        yi=Math.round10(yi,-1);
        xi_prime=Math.round10(xi_prime,-1);
        yi_prime=Math.round10(yi_prime,-1);
        return [xi, yi, xi_prime, yi_prime];
    }


 

 drawMetatonsCube();
  

})();