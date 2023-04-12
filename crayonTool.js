function CrayonTool()
{
    this.name = 'CrayonTool'
    this.icon = 'assets/tools/crayon.png'

    var start_X = -1;
	var start_Y = -1;
    //set the drawCrayon state
    var drawCrayon = false;

    //this changes in the p5.dom click handler. So storing it as
	//a variable self now means we can still access this in the handler
	var self = this;

    this.populateOptions = function()
    {
        //create a slider to change the strokeWeight 
        select(".options").html("<label style='color:black;font-size:20' for='CrayonTool'>Line Size</label> <input type='range' min='4' max='9' value='4' class='slider' id='crayonTool'> <label style='color:black;font-size:20' for='CrayonTool'>Opacity</label> <input type='range' min='40' max='99' value='60' class='slider' id='crayonIntensity'>");
    };

    this.draw = function()
    {
        minimunSize = document.getElementById("crayonTool").value;
        if(minimunSize == 4)
        {
            cursor("assets/crayon16.png",1,39);
        }
        if(minimunSize > 4 && minimunSize <= 9)
        {
            cursor("assets/crayon24.png",1,39);
        }


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
                this.crayon();
                pop();
            }   
        }
        else if(drawCrayon){
            //The positions and bool are reset when the mouse is released.
            //IMPORTANT: The updates that were made in the pixel array are 
            //not restored, they were saved.
            loadPixels();
            drawCrayon = false;
            start_X = -1;
            start_Y = -1;
        }
        
    };
   
    this.crayon = function() {
        // set the color and brush style
        fillColor = document.getElementById("colorpicker").value;
        intensity = document.getElementById("crayonIntensity").value;
        int = intensity.toString();
        if(intensity == 99)
        {
            int = "FF";
        }
        fill(fillColor+int);

        noStroke()
        // move the origin (0,0) to the current mouse coordinate
        translate(mouseX, mouseY)
      
        // find the angle of the direction the mouse is moving in
        // then rotate the canvas by that angle
        angleRot = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
        rotate(angleRot)
        
        //additional
        times = 4

        // find the distance between current mouse point and previous mouse 
        distMo = dist(mouseX, mouseY, pmouseX, pmouseY)
        
        // draw the ellipse
        ellipse(0, 0, distMo * 2 + times, minimunSize)
    };

    
    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "CrayonTool"){
            //remove the current selection in the options section
            select(".options").html("");
            stroke(colourP.selectedColour);
            cursor(HAND);
        } 
    };
}