
function HighLightTool() {
    this.name = "HightLight"
    this.icon = "assets/tools/highLight.png"

    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;
    //set the starting point
    var start_X = -1;
    var start_Y = -1;

    var smoothMode = true

    this.populateOptions = function()
    {
        //create colorPicker
        // colorPicker = createColorPicker('#03fcdb');
        // colorPicker.position(width/1.4, height+width/10);
		// create a slider for size. Also, add a label "Size" to indicate what the slider does.
        select(".options").html(
			"<label style='color:black;font-size:20' for='freehandSize'> Size</label> <input type='range' min='25' max='50' value='1' class='slider' id='freehandSize'> <label style='color:black;font-size:20' class='smoothLabel' for='smooth'>Smooth</label><input checked='' type='checkbox' id='cbx' class='hidden-xs-up'><label for='cbx' class='cbx'></label></div>");
        
        select("#cbx").mouseClicked(function(){
            if(smoothMode == true)
            {
                smoothMode = false;
            }
            else 
            {
                smoothMode = true; 
            }
        })
    }

	this.draw = function(){
        //the size will be set according to the value it takes on the slider
        size = document.getElementById("freehandSize").value;
        strokeWeight(size);
        strokeColor = document.getElementById("colorpicker").value; 
        stroke(strokeColor+"50");

        if(size == 25 | size <=28)
        {
            cursor("assets/paint32.png",1,19);
        }
        if(size >28 && size <=32)
        {
            cursor("assets/paint38.png",1,23);
        }
        if(size > 32 && size <=37)
        {
            cursor("assets/paint45.png",1,26);
        }
        if(size >37 && size <=43)
        {
            cursor("assets/paint52.png",1,30);
        }
        if(size >43 && size <=46)
        {
            cursor("assets/paint59.png",1,34);
        }
        if(size >46 && size <51)
        {
            cursor("assets/paint64.png",1,38);
        }
        
        
        //col = colorPicker.color();
        if(mouseIsPressed && pressOnCanvas())
        {
            //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
            if (start_X == -1){ 
				start_X = mouseX;
				start_Y = mouseY;
				
			}
            else
            {
                //turn down the intensity of the color to make it look like a highlighter
                //stroke(col.levels[0],col.levels[1],col.levels[2],80);
                if(smoothMode == false)
                {
                    strokeColor = document.getElementById("colorpicker").value;
                    stroke(strokeColor);
                }
                //draw ths shape
                strokeCap(SQUARE);
				line(start_X, start_Y, mouseX, mouseY);
				start_X = mouseX;
				start_Y = mouseY; 
            }
        }
        else
        //if the mouse is not pressed then it will reset the initial values start_X=-1 & start_Y=-1
        {
			start_X = -1;
			start_Y = -1;
		}


	};

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() { 
        if(self.name == "HightLight")
        {
            select(".options").html("");
            strokeCap(ROUND);
            //colorPicker.remove();
            smoothMode = true;
            cursor(HAND);
        } 
	};

}