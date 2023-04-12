function MyEraserTool()
{
    //set an icon and a name for the object
    this.icon = "assets/tools/eraser_Tool.png"
    this.name = "myEraserTool"
    //eraser color
    this.color = 255;

    //set the drawRect state
    var eraserMode = false;
    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;

    //choose the thickness of the tool
    this.populateOptions = function() {
        // noCursor();
        // cursor("assets/anaconda.png", 20, -10);
		// create a slider for size of the eraser. Also, add a label "Eraser size" to indicate what the slider does.
		select(".options").html(
			"<label style='color:black;font-size:20' for='eraserSize'>Eraser size</label> <input type='range' min='10' max='50' value='1' class='slider' id='eraserSize'>");
	};

    this.draw = function(){
        //the size will be set according to the value it takes on the slider
        var size = document.getElementById("eraserSize").value;
        if(size == 10)
        {
            cursor("assets/era16.png",6,18);
        }
        if(size > 10 && size < 30)
        {
            cursor("assets/era24.png",10,60);
        }
        if(size >= 30 && size < 40)
        {
            cursor("assets/era32.png",16,60);
        }
        if(size >= 40 && size <=50)
        {
            cursor("assets/era64.png",26,54);
        }
		//if the mouse is pressed
		if(mouseIsPressed){
			//identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
			if (pMouseX == -1){
				pMouseX = mouseX;
				pMouseY = mouseY;
                eraserMode = true;
			}
			else
            {
                fill(this.color);
                strokeWeight(size);
                stroke(255);
                line(pMouseX, pMouseY, mouseX, mouseY);
                pMouseX = mouseX;
                pMouseY = mouseY;
			}
		}
		//if the mouse is not pressed then it will reset the initial values pMouseX=-1 & pMouseY=-1
		else{
            //save the pixels, resets the eraserMode bool and reset start locations
			eraserMode = false;
            pMouseX = -1;
			pMouseY = -1;
		}
        pop();
	};

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "myEraserTool")
        {
            //remove the current selection in the options section
            select(".options").html("");
            cursor(HAND);
        }
    };

}