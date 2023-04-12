function MidMoonTool(){
	//set an icon and a name for the object
	this.icon = "assets/tools/moon.png";
	this.name = "moonShapeTool";

	// set the drawMoon state
	var self = this;
	var drawMoon = false;

	var noStrokeMode = false;

	//set the starting point
	var sMouse_X = -1;
	var sMouse_Y = -1;
	
	this.populateOptions = function()
    {
      select(".options").html(
        "<label style='color:black;font-size:20' for='moonTool'>Line Size</label> <input type='range' min='1' max='5' value='1' class='slider' id='moonTool'> <input checked='' type='checkbox' id='cbx' class='hidden-xs-up'><label for='cbx' class='cbx'></div>");

		select("#cbx").mouseClicked(function(){
			if(noStrokeMode == false)
			{
				noStrokeMode = true;
			}
			else 
			{
				noStrokeMode = false; 
			}
		  })
    }

	//draw the moon
	this.draw = function(){
		push();
		fillColor = document.getElementById("colorpicker_2").value;
		strokeColor = document.getElementById("colorpicker").value;
		fill(fillColor);
		stroke(strokeColor);
		strokeW = document.getElementById("moonTool").value;
      	strokeWeight(strokeW);
		angleMode(RADIANS); 
		//if the mouse is pressed on the canvas, then the MOOON can be drawn
		if(mouseIsPressed && pressOnCanvas()){
			//if it's the start of drawMoon a new line
			//identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
			if(sMouse_X == -1){
				drawMoon = true;
				sMouse_X = mouseX;
				sMouse_Y = mouseY;
				//save the current pixel array after the drawing
				loadPixels();
			}
			else
			{
				//updates the canvas with the data from the pixels[] array. This will remove any previous changes between pressing and releasing the mouse.
				updatePixels();
				if(noStrokeMode == true)
          		{
            		noStroke();
          		}
				//draw the line
                push();
				arc(sMouse_X, sMouse_Y, mouseX, mouseY, PI/2, 3*PI/2);
				pop();
			}

		}
		//if the mouse is not pressed then it will reset the initial values sMouse_X=-1 & sMouse_Y=-1
		else if(drawMoon){
			//save the pixels, resets the drawMoon bool and reset start locations
			loadPixels();
			drawMoon = false;
			sMouse_X = -1;
			sMouse_Y = -1;
		}
	};

	this.unselectTool = function() {
		if(self.name == "moonShapeTool"){
			//remove the current selection in the options section
			select(".options").html("");
			noStrokeMode = false;
	  	}
	}
}