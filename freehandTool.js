function FreehandTool() {
	//set an icon and a name for the object
	this.icon = "assets/tools/free_hand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
	
	var self = this; 
	
	this.populateOptions = function () {
		// slider for size, returns value to size with getelementbyid.value
		select(".options").html(
			"<label style='color:black;font-size:20' for='freehandSize'>Marker Size</label> <input type='range' min='1' max='15' value='1' class='slider' id='freehandSize'>");	
	}

	this.draw = function () {
		push();		
		var size = document.getElementById("freehandSize").value;
		strokeWeight(size);
		var strokeColor = document.getElementById("colorpicker").value;
		stroke(strokeColor);
		
		if(size == 1 | size <=10)
		{
			cursor("assets/pencil16.png",1,39);
		}
		if(size > 10 && size <16)
		{
			cursor("assets/pencil24.png",2,32);
		}


		//if the mouse is pressed
		if (mouseIsPressed) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from
			//there to the current mouse location
			else {
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				
			}
		}
		//if the user has released the mouse we want to set the previousMouse values
		//back to -1.
		//try and comment out these lines and see what happens!
		else {
			previousMouseX = -1;
			previousMouseY = -1;
		}

		pop();
	};

	this.unselectTool = function () {
		if(self.name == "freehand")
		{
			select(".options").html("");
			cursor(HAND);
		}
		
	}

}