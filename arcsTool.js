function ArcsTool()
{
    //set an icon and a name for the object
    this.name = 'ArcsLineTool'
    this.icon = "assets/tools/other.png";

    var start_X = -1;
	var start_Y = -1;
    //set the drawarcs state
    var drawarcs = false;
    var self = this;
    
    this.populateOptions = function()
    {
        //create slider to change the strokeWeight 
        select(".options").html("<label style='color:black;font-size:20' for='arcsSize'>Line Size</label> <input type='range' min='2' max='10' value='2' class='slider' id='arcsSize'> <label style='color:black;font-size:20' for='freehandSize'>Opacity</label> <input type='range' min='40' max='99' value='99' class='slider' id='lineOpacity'>");
    };
    
    this.draw = function()
    {
        // select the width of the border according to the value of the chosen slider
        var size = document.getElementById("arcsSize").value;
		strokeWeight(size);

        if(size == 2 | size <=5)
		{
			cursor("assets/arcPencil24.png",4,32);
		}
		if(size > 5 && size <=10)
		{
			cursor("assets/arcPencil32.png",4,32);
		}
        
        //border color equal to the selected color within the colorPicker
        strokeColor = document.getElementById("colorpicker").value;
        //opacity of the line
		opacityLine = document.getElementById("lineOpacity").value; 
		op = opacityLine.toString();
		if(opacityLine == 99)
        {
            op = "FF";
        }
        stroke(strokeColor+op);
		noFill();
        
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
                this.wiggleArcs()
            }   
        }

        else if(drawarcs){
			//The positions and bool are reset when the mouse is released.
			//IMPORTANT: The updates that were made in the pixel array are 
			//not restored, they were saved.
			loadPixels();
			drawarcs = false;
			start_X = -1;
			start_Y = -1;
		}
    };
      
    this.wiggleArcs = function() {
        push();
        // set the color and brush style
        //strokeWeight(2)
        noFill()
        
        // distance between the current and previous mouse coordenate
        theDist = dist(mouseX, mouseY, pmouseX, pmouseY)
 
        // midpoint between the current and previous mouse coordenate
        middleX = (mouseX + pmouseX) / 2
        middleY = (mouseY + pmouseY) / 2
        
        // find the angle of the direction the mouse 
        angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
        
        // flip the arc
        flipAll = (frameCount % 2) * PI
        
        // draw 
        arc(middleX, middleY, theDist, theDist, angle + flipAll, angle + PI + flipAll);
        pop();
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
        if(self.name == "ArcsLineTool"){
            select(".options").html("");
            cursor(HAND);
        }	
	};
}