function BladesTool()
{
    //set an icon and a name for the object
    this.name = 'bladesTool'
    this.icon = 'assets/tools/lines.png'

    var start_X = -1;
    var start_Y = -1;
    //set the drawCrayon state
    var drawBlade = false;
    var self = this; 

    this.populateOptions = function()
    {
        select(".options").html("<label style='color:black;font-size:20' for='bladesTool'>Opacity</label> <input type='range' min='44' max='99' value='60' class='slider' id='opacityBlade'>");
    }

    this.draw = function()
    {
        fillColor = document.getElementById("colorpicker").value;
        opacityLine = document.getElementById("opacityBlade").value;
        op = opacityLine.toString();
        if(opacityLine == 99)
        {
            op = "FF";
        }
        fill(fillColor+op);
        cursor("assets/blade24.png",1,39)
        
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
                this.blades()
                pop();
            }   
          }
          else if(drawBlade){
              //The positions and bool are reset when the mouse is released.
              //IMPORTANT: The updates that were made in the pixel array are 
              //not restored, they were saved.
              loadPixels();
              drawBlade = false;
              start_X = -1;
              start_Y = -1;
          } 
    };
      
    this.blades = function() {
        // set the color and brush style
        noStroke()
      
        // move the origin (0,0) to the current mouse point
        translate(mouseX, mouseY)
      
        // find the angle of the direction the mouse is moving in
        // then rotate the canvas by that angle
        angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
        rotate(angle)
      
        // set minumum width and height of the toothpick-shaped ellipse
        minSize = 4
        
        // find the distance between current mouse point and previous mouse point
        distance = dist(mouseX, mouseY, pmouseX, pmouseY);
        
        // draw the toothpick-shaped ellipse
        ellipse(0, 0, distance * 18 + minSize, minSize);
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
        if(self.name == "bladesTool"){
            select(".options").html(" ");
            cursor(HAND);
        }	
    };
}