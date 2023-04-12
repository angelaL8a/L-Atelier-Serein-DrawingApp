function RainbowRadialTool(){
	//set an icon and a name for the object
	this.icon = "assets/tools/rainbow.png";
	this.name = "arcoiris";

	//set the starting point
	var start_X = -1;
	var start_Y = -1;

    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
	var self = this;

	//choice of line thickness
	this.populateOptions = function()
	{  
        // create a slider for size. Also, add a label "Size" to indicate what the slider does.
		select(".options").html(
			"<label style='color:black;font-size:20' for='Size'>Size</label> <input type='range' min='20' max='50' value='1' class='slider' id='Size'>");
      
	};
	
	this.draw = function(){
        //the size will be set according to the value it takes on the slider
        this.size = document.getElementById("Size").value;
        
		//if the mouse is pressed
		if(mouseIsPressed){
			//identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
			if (start_X == -1)
			{
				start_X = mouseX;
				start_Y = mouseY;
			}
			else
			{ 
                //mouse must be on canvas to draw
                if(pressOnCanvas())
                {
                    // change the colorMode to HSB(Hue, Saturation and Brightness.) This way, create a rainbow effect. A rainbow gradient from left to right. Brightness increasing to white at top.
                    colorMode(HSB);
					// strokeweight adjusts to slider
                    strokeWeight(this.size);
                    stroke((3*frameCount) % 360, 100, 100);
                    line(start_X, start_Y, mouseX, mouseY);
                }
			}
            //reset colour and reset stroke
            stroke(0);
            colorMode(RGB);
		}
		//if the mouse is not pressed then it will reset the initial values pMouseX=-1 & pMouseY=-1
		else{
			//save the pixels, resets the eraserMode bool and reset start locations
			start_X = -1;
			start_Y = -1;
		}
	};

	//When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
    	if(self.name == "arcoiris"){
			//remove the current selection in the options section
			select(".options").html("");
		}
    };
}