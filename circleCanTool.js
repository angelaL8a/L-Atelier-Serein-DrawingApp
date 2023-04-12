function CircleCanTool(){
	//set an icon and a name for the object
	this.icon = "assets/tools/circle_Tool.png";
	this.name = "MyCircleTool";

	//set the drawCircle state
	var self = this;
	var drawCircle = false;

	var noStrokeMode = false;

	var start_X = -1;
	var start_Y = -1;
	
	this.populateOptions = function()
    {
      select(".options").html(
        "<label style='color:black;font-size:20' for='circleTool'>Line Size</label> <input type='range' min='4' max='25' value='1' class='slider' id='circleTool'> <input checked='' type='checkbox' id='cbx' class='hidden-xs-up'><label for='cbx' class='cbx'></div>");

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

	//draw the circle
	this.draw = function(){
		//Define the cursor as a default symbol
		cursor(CROSS);
		strokeColor = document.getElementById("colorpicker").value;
		fillColor = document.getElementById("colorpicker_2").value;
		stroke(strokeColor);
		fill(fillColor);
		
		
		strokeW = document.getElementById("circleTool").value;
      	strokeWeight(strokeW);
		//if the mouse is pressed on the canvas, then the CIRCLE can be drawn
		if(mouseIsPressed){
			//identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
			if(start_X == -1){
				start_X = mouseX;
				start_Y = mouseY;
				drawCircle = true;
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
				//draw the ellipse
				ellipse(start_X, start_Y, dist(start_X,0,mouseX,0),dist(0,start_Y,0,mouseY));
			}

		}
		//if the mouse is not pressed then it will reset the initial values start_X=-1 & start_Y=-1
		else if(drawCircle){
			//save the pixels, resets the drawCircle bool and reset start locations
			loadPixels();
			drawCircle = false;
			start_X = -1;
			start_Y = -1;
		}
	};

	//When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
	this.unselectTool = function() {
		//reset cursor symbol
		cursor(HAND);
		if(self.name == "MyCircleTool"){
			//remove the current selection in the options section
			select(".options").html("");
			noStrokeMode = false;
	  	}
	};
}