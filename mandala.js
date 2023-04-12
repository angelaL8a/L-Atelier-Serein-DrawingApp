function Mandala(){
    //set an icon and a name for the object
    this.icon = "assets/tools/mandala.png"
    this.name = "MandalaTool"
    
    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;
    var type1Button = false;
    var type2Button = false;

    //set the number of reflective surfaces that will be divided on the canvas 
    this.nReflections = 8; 
    this.division = 360/this.nReflections;
    
    //create buttons to change "nReflections" to: 6,8 or 10. Also, add a slider to set the line thickness. This slider will need a label to describe what it does.
    // create buttons to change the color mode in the brush
    this.populateOptions = function(){
        select(".options").html("<button class='button' id = 'nReflections'> 6 Reflections </button> <label class='label' style='color:black;font-size:20' for='mandalaLineSize'>Marker Size</label> <input type='range' class='slider' min='1' max='20' value='1'  id='mandalaLineSize'> <button class='button' id = 'type1'> TYPE1 </button> <button class='button' id = 'type2'> TYPE2 </button>");
        
        //If the number of reflections is 8, then the button will display "6" and if the number of reflections is 6, then the button will display "8".
        select("#nReflections").mouseClicked(function(){
            var mButton = select("#nReflections");
            if(self.nReflections == 8){
                self.nReflections = 6;
                self.division = 360 / self.nReflections;
                mButton.html("8 Reflections");
            } else{
                self.nReflections = 8;
                self.division = 360 / self.nReflections;
                mButton.html('6 Reflections')
            }
        })

        // When the button is pressed (type1Button or type2Button ): change the label of the button and activate type1Button or type2Button so that its functionality is executed inside the draw function.
        select("#type1").mouseClicked(function(){
            var t1Button = select("#type1");
            var t2Button = select("#type2");
            if(type1Button == false)
            {
                type2Button = false;
                type1Button = true;
                t1Button.html("TYPE1 ↑");
                t2Button.html("TYPE1 ↓");
            }
            else 
            {
                type1Button = false;
                t1Button.html("TYPE1 ↓");
            }  
        })
        select("#type2").mouseClicked(function(){
            var t2Button = select("#type2");
            var t1Button = select("#type1");
            if(type2Button == false)
            {
                type1Button = false;
                type2Button = true;
                t2Button.html("TYPE2 ↑");
                t1Button.html("TYPE1 ↓");
            }
            else 
            {
                type2Button = false;
                t2Button.html("TYPE1 ↓");
            }
        })

        restoreButton.hide();
        saveButton.hide();
        
    };
       
    this.draw = function(){
        //reposition the origin to the center of the canvas
        translate(width/2, height/2);
        //rendering style of the ends of the lines
        strokeCap(ROUND);
        //"this.division" will return a number that can be in terms of degrees, so we'll change the angle mode to DEGREES
        angleMode(DEGREES);
        
        //Adjust the strokeWeight of the brush with the help of the slider.
        var size = document.getElementById("mandalaLineSize").value;
        strokeWeight(size);
        strokeColor = document.getElementById("colorpicker").value;
		stroke(strokeColor);
        // if the pointer is within the canvas
        if(pressOnCanvas()){
            push();
            //if mouse is pressed
            if(mouseIsPressed){ 
                //When the respective button (type1Button or type2Button) is true, this code will be executed. It will change the color mode and the color of the stroke, creating a colorful or "rainbow" style.
                if(type1Button == true){
                    colorMode(HSB);
                    stroke((5*frameCount) % 360, 40, 100);
                    fill((5*frameCount) % 360, 100, 100);
                }
                if(type2Button == true){
                    colorMode(HSB);
                    stroke((5*frameCount) % 360, 80, 140);
                }

                //call the "mandala" function so that the code is executed while the click moves across the canvas
                this.mandala();
            }
            pop();
            colorMode(RGB);
        }
    };

    this.mandala = function()
    {
        //position of the mouse relative to the center of the canvas
        mouse_X = mouseX - width/2;
        mouse_Y = mouseY - height/2;
        mouse_PrevX = pmouseX - width/2;  
        mouse_PrevY = pmouseY - height/2;
        
        //draw two parallel and symmetrical lines for each [i] in "nReflections" each time the mouse clicks on the canvas.
        for(var i = 0; i < self.nReflections; i++){
            rotate(this.division);
            line(mouse_X, mouse_Y, mouse_PrevX, mouse_PrevY);
            push();
            //scalar will allow us to create a mirror and symmetrical effect between one line and the other
            scale(1, -1);
            line(mouse_X, mouse_Y, mouse_PrevX, mouse_PrevY);
            //reset settings to use other tools correctly
            pop();
        }
    }

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        
        if(self.name == "MandalaTool"){
            //remove the current selection in the options section
            select(".options").html("");
            type1Button = false;
            type2Button = false;
            angleMode(RADIANS); 
            restoreButton.show();
            saveButton.show()
        }
	}; 
}