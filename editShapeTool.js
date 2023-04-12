function EditShapeTool()
{
    //set an icon and a name for the object
    this.name = 'MyShapeTool'
    this.icon = 'assets/tools/editShape_Tool.png'

    //set the editShapeMode state
    var editShapeMode = false;
    var currentS = [];

    this.populateOptions = function()
    {
        //in the options section create an edit button, a finish button and a slider for line weight, plus add a label to describe what this slider does
        select(".options").html("<button class='button' id='editButton'>Edit Shape</button> <button class='button' id='finishButton'>Finish Shape</button> <label style='color:black;font-size:20;padding-left: 35px;' for='freehandSize'>Line Size</label> <input type='range' min='1' max='15' value='1' class='slider' id='sizeLine'>");

        //If the "FinishButton" is pressed, the current shape will be saved to the canvas, the array will be reset, editShapeMode = false and allow to start a new shape.
        select("#finishButton").mouseClicked(function(){
            editShapeMode = false;
            select("#editButton").html("Edit Shape");
            draw();
            loadPixels();
            currentS = [];
        });
        // if "editShapeMode" is off the button will show: "edit button" and when "editShapeMode" is on, the button will show: "Add vertices"
        select("#editButton").mouseClicked(function(){
            editButton = select("#editButton");
            if(editShapeMode)
            {
                editShapeMode = false;
                editButton.html('Edit Shape');
            }
            else
            {
                editShapeMode = true; 
                editButton.html('Add vertices');
            }
        });
    };
    
    this.draw = function()
    {
        push();
        updatePixels();
        //the strokeWeight will be set according to the value it takes on the slider
        var sizeLine = document.getElementById("sizeLine").value;
        strokeWeight(sizeLine);
        strokeColor = document.getElementById("colorpicker").value;
		stroke(strokeColor);
        // if the mouse is pressed within the canvas 
        if(mouseIsPressed && pressOnCanvas())
        {
            //If the tool is not in edit mode and the mouse is pressed, the current positions (x,y) will be added to the "currentS" array.
            if(!editShapeMode)
            {
                currentS.push({
                    x: mouseX,
                    y: mouseY
                })
            }
            else
            {
                //If the tool is in edit mode:
                //Between our mouse pointer and a certain vertex there must be a required distance [<25] to be able to scroll or move it around the canvas.
                for(var i = 0; i < currentS.length; i++)
                {
                    if(dist(currentS[i].x, currentS[i].y, mouseX, mouseY) < 25)
                    {
                        currentS[i].x = mouseX
                        currentS[i].y = mouseY
                    }
                }
            }
        }

        beginShape();
        push();
        noFill();
        for(var i = 0; i < currentS.length; i++){
            //Draw on the canvas the vertices stored in the array "currentS"
            vertex(currentS[i].x, currentS[i].y);
            //If edit mode is enabled on the canvas:
            //An ellipse will be drawn over each vertex to identify which vertices can be moved or adjusted.
            if(editShapeMode) {
                fill(document.getElementById("colorpicker").value);
			    ellipse(currentS[i].x, currentS[i].y, 10);
			    noFill();
            }  
        }
        endShape(); 
        pop();
        pop();

    }; 

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
		if(self.name == "MyShapeTool"){
            updatePixels();
            //remove the current selection in the options section
		    select(".options").html("");
        }        
	};
}