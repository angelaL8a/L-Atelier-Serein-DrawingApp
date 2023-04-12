function WatercolourTool(){  
    //set an icon and a name for the object
    this.name = "WatercolourTool"
    this.icon = "assets/tools/spray_Tool.png"
    //number of drawings made by vertices each time the canvas is clicked
    this.figTimes = 3
    //number of vertices to be drawn around an origin
    this.verTimes = PI * 2
    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;
    //set the starting point
    var start_X = -1;
    var start_Y = -1;

    var fullFill = false
    var colorPicker;
    var smooth = true; 

    this.populateOptions = function()
    {
        divForColorPicker = createDiv();
        divForColorPicker.parent(select('#otherSpace'));
        divForColorPicker.class('space');
        //create colorPicker
        colorPicker = createColorPicker('#26edc6');
        colorPicker.parent(divForColorPicker);
        colorPicker.class('colorPickerTool');
        colorPicker.id('colorPickerTool');
        
        //colorPicker.position(width/1.4, height+width/10);
        //create a slider for size. Also, add a label "Size" to indicate what the slider does.
        select(".options").html(
			"<label style='color:black;font-size:20' for='lineSize'>Size</label> <input type='range' min='10' max='60' value='10' class='slider' id='spraySize'> <input checked='' type='checkbox' id='cbx' class='hidden-xs-up'><label for='cbx' class='cbx'>");
        
        select("#cbx").mouseClicked(function(){
            if(fullFill == false)
            {
                fullFill = true;
                smooth = false;
            }
            else 
            {
                fullFill = false; 
                smooth = true;
            }
        })

        //create a div for a label
        divForlabel = createDiv();
        divForlabel.parent(select('#otherSpace'));
        divForlabel.class('spaceCheck');
        divForlabel.id('spaceCheck')
        //create a label "SMOOTH"
        labelCheck = document.createElement('label');
        labelCheck.innerHTML = "SMOOTH";
        document.getElementById('spaceCheck').appendChild(labelCheck);
           
    };

    this.draw = function()
    {
        push();
        col = colorPicker.color();
        angleMode(RADIANS); 
        //the size will be set according to the value it takes on the slider
        this.spraySize = document.getElementById("spraySize").value;       
        
        //if the mouse is pressed
        if(mouseIsPressed && pressOnCanvas())
        {   
            //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
            if (start_X == -1){
                start_X = mouseX;
                start_Y = mouseY;
            }
            else
            {
                if(smooth == true)
                {
                    fill(col.levels[0]+random(-25,25),col.levels[1]+random(-25,25),col.levels[2]+random(-25,25),6);
                }
                
                for (i=0;i<this.figTimes;i++){
                    push();
                    noStroke();
                    //reposition the origin to the pointer
                    translate(mouseX,mouseY);
                    rotate(random(PI*2));
                    beginShape();
                    //Design a shape joining vertices that will give the impression of being a splash.
                    for (m = 0; m < PI * 2; m++) {
                        noStroke();
                        //For the position of each vertex we will use the mathematical definition x = cos(m) * r and y = sin(m) * r
                        //r = radius that will be determined by a slider
                        r =  random(this.spraySize,90);
                        var x = cos(m) * r;
                        var y = sin(m) * r;  
                        if(fullFill == true && smooth==false)
                        {
                            strokeColor = document.getElementById("colorpicker").value;
                            stroke(strokeColor);
                            fill(strokeColor);
                        }
                        vertex(x, y); 
                    }
                    endShape(CLOSE);
                    pop();
                }
            }
            
        }
        //if the mouse is not pressed then it will reset the initial values start_X=-1 & start_Y=-1
        else
        {
			//save the pixels, resets the eraserMode bool and reset start locations
            start_X = -1;
			start_Y = -1;
		}
        pop();
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "WatercolourTool"){
            //remove the current selection in the options section
            select(".options").html(" ");
            fullFill = false
            select("#otherSpace").html(" ");
        }        
    }
}