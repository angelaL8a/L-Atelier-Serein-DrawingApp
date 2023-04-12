function SprayPincelTool()
{
    this.name = 'PinturaTool'
    this.icon = 'assets/tools/pintura.png'

    var start_X = -1;
    var start_Y = -1;
    //set the drawCrayon state
    var drawPintura = false;

    var self = this; 

    this.populateOptions = function()
    {
      //create a slider to change the value of strokeWeight
      select(".options").html(" ");
    }

    this.draw = function()
    {
        strokeColor = document.getElementById("colorpicker").value;
        stroke(strokeColor);  
      
        if (mouseIsPressed) {
          //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
          if(start_X == -1){
            start_X = mouseX;
            start_Y = mouseY;
            drawCircle = true;
            //save the current pixel array after the drawing
            loadPixels();
          }
          else{
            push();
            this.pintura();
            pop();
          }   
        }
        else if(drawPintura){
            //The positions and bool are reset when the mouse is released.
            //IMPORTANT: The updates that were made in the pixel array are 
            //not restored, they were saved.
            loadPixels();
            drawPintura = false;
            start_X = -1;
            start_Y = -1;
        }
    };
      
    this.pintura = function() {
        // set the color and brush style
        strokeWeight(1)
      
        // find the speed of the mouse movement
        speedM = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)
      
        // set minimum radius and spray density of spraypaint brush
        minimumRadius = 10;
        sprayDensity = 80
        
        // find radius of the spray paint brush and radius squared
        radius = speedM + minimumRadius;
        radiusSquared = radius * radius;
      
        // set the number of times we lerp the points in the for loop
        times = 10
      
        // repeat the random points with lerping
        for (let i = 0; i < times; i++) {
          
          // find the lerped X and Y coordinates
          lerpX = lerp(mouseX, pmouseX, i / times)
          lerpY = lerp(mouseY, pmouseY, i / times)
          
          // draw a bunch of random points within a circle
          for (let j = 0; j < sprayDensity; j++) {
      
            // pick a random position within the circle
            randomX = random(-radius, radius)
            randomY = random(-1, 1) * sqrt(radiusSquared - randomX * randomX)
      
            // draw the random point
            point(lerpX + randomX, lerpY + randomY)
          }
        }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
      if(self.name == "PinturaTool"){
          select(".options").html(" ");
      }	
  };
}