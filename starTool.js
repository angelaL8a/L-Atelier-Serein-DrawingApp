function StarTool()
{
    //set an icon and a name for the object
    this.name = 'MyStarTool'
    this.icon = 'assets/tools/StarTool.png'
    // set the image and default size for the star
    this.starImg = loadImage("./assets/estrella.png");
    this.starSize = 20;
    //When a function is used as an event handler, it is changed from the triggered event element. So storing a "self" variable to reference the content of the object it's associated with without having to explicitly reference the object is necessary so that we can access this in the controller that was changed.
    var self = this;
    //set the starting point
    var start_X = -1;
    var start_Y = -1;
    
      
    this.populateOptions = function() {
        // create a slider for size of the stars. Also, add a label "Star size" to indicate what the slider does.
        select(".options").html(
			"<label style='color:black;font-size:20' for='starSize'>Star size</label> <input type='range' min='20' max='50' value='1' class='slider' id='starSize'>");
    };
    
    //draw the stars
    this.draw = function()
    {
        //the size will be set according to the value it takes on the slider
        this.starSize = document.getElementById("starSize").value;
        cursor("assets/star24.png",1,39);
        //if the mouse is pressed
        if(mouseIsPressed)
        {   
            //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
            if (start_X == -1){
                start_X = mouseX;
                start_Y = mouseY;
            }
            else
            {
                // center the position of all stars around the mouse position on the canvas
                var starX = random((mouseX - this.starSize/2)-10,(mouseX - this.starSize/2)+10);
                var starY = random((mouseY - this.starSize/2)-10,(mouseY - this.starSize/2)+10);
                //clicked must be on the Canvas
                if(pressOnCanvas())
                {
                    image(this.starImg, starX, starY, this.starSize, this.starSize);
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
    };

    this.unselectTool = function() {
        if(self.name == "MyStarTool"){
            //remove the current selection in the options sectio
            select(".options").html("");
            cursor(HAND);
        }
    };
  
}
