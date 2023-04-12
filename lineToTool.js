//This function will allow us to make straight lines on our canvas
function LineToTool(){
	//Choose a name and an icon for our tool
	this.icon = "assets/tools/line_To.png";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.populateOptions = function() {
		// slider for size, add label to indicate what the slider does
		select(".options").html(
			"<label style='color:black;font-size:20' for='lineToSize'>Line Size</label> <input type='range' min='1' max='25' value='1' class='slider' id='lineToSize'>");
	};

	// start to draw the line
	this.draw = function(){

		push();
        var size = document.getElementById("lineToSize").value;
        strokeWeight(size);
		strokeColor = document.getElementById("colorpicker").value;
		stroke(strokeColor);

		if(mouseIsPressed){

			cursor(CROSS);
			//if the mouse is clicked on the canvas
			if(startMouseX == -1){
				
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				// Load and save pixels array of the canvas
				loadPixels();
			}

			else{
				// Reflect the change of the pixels saved on the canvas,
				// from when the mouse was pressed until it was released
				updatePixels();
				//Draw the straight line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//The positions and bool are reset when the mouse is released.
			//IMPORTANT: The updates that were made in the pixel array are 
			//not restored, they were saved.
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}

		pop();

	};

	//When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
	this.unselectTool = function() {
        select(".options").html("");
		cursor(HAND);
	} 


	


}
