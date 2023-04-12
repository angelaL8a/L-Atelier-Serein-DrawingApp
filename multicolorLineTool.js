function MulicolorLineTool(){  
    //set an icon and a name for the object
    this.name = "MuticolorLineTool"
    this.icon = "assets/tools/multicolor.png"
    //number of drawings made by joined vertices each time the canvas is clicked
    this.figTimes = 20
    //number of vertices to be drawn around an origin
    this.verTimes = PI
    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;
    loadPixels();

    this.populateOptions = function()
    {
        // create a slider for size. Also, add a label "Size" to indicate what the slider does.
        select(".options").html(
			"<label style='color:black;font-size:20' for='linSize'>Line size</label> <input type='range' min='10' max='50' value='1' class='slider' id='linSize'>");
    };

    this.draw = function()
    {
        //"this.times" will return a number that is in terms of radians, so the angle mode will be RADIANS
        angleMode(RADIANS); 
        //the size will be set according to the value it takes on the slider
        this.multiSize = document.getElementById("linSize").value;
        //if the mouse is pressed within the canvas
        if (mouseIsPressed && pressOnCanvas())
        {         
            for (i=0;i<this.figTimes;i++){
                push();
                //reposition the origin to the pointer
                translate(mouseX,mouseY);
                rotate(random(PI*2));
                beginShape();
                //Design a shape joining vertices that will give the impression of being a splash.
                for (m = 0; m < this.verTimes; m++) {
                    // change the colorMode to HSB(Hue, Saturation and Brightness.) This way, create a rainbow effect. A rainbow gradient from left to right. Brightness increasing to white at top.
                    colorMode(HSB);
                    //For the position of each vertex we will use the mathematical definition x = cos(m) * r and y = sin(m) * r
                    //r = radius that will be determined by a slider
                    r =  this.multiSize
                    var x = cos(m) * r;
                    var y = sin(m) * r;
                    // strokeweight adjusts to slider
                    strokeWeight(this.multiSize);
                    //stroke colour
                    stroke((5*frameCount) % 360, 80, 140);
                    vertex(x, y);
                }
                endShape(CLOSE);
                pop();
            }
        }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "MuticolorLineTool")
        {
            //remove the current selection in the options section
            select(".options").html("");
        }
	}; 
}