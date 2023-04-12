function RectangleTool() {
    //set an icon and a name for the object
    this.icon = "assets/tools/rectangle_Tool.png";
    this.name = "MyRectangleTool";
    
    //set the drawRect state
    var self = this;
    var drawRect = false;

    var noStrokeMode = false;
    
    //set the starting point
    var start_X = -1;
    var start_Y = -1;

    this.populateOptions = function()
    {
      select(".options").html(
        "<label style='color:black;font-size:20' for='rectangleTool'>Line Size</label> <input type='range' min='4' max='25' value='1' class='slider' id='rectangleTool'> <input checked='' type='checkbox' id='cbx' class='hidden-xs-up'><label for='cbx' class='cbx'></div>");
      
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
    
   //draw the rectangle
    this.draw = function () {
      //Define the cursor as a default symbol
      cursor(CROSS);
      strokeColor = document.getElementById("colorpicker").value;
      fillColor = document.getElementById("colorpicker_2").value;
		  fill(fillColor);
		  stroke(strokeColor);
      strokeW = document.getElementById("rectangleTool").value;
      strokeWeight(strokeW);
      //if the mouse is pressed on the canvas, then the RECTANGLE can be drawn
      if (mouseIsPressed) {
        //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
        if (start_X == -1) {
          start_X = mouseX;
          start_Y = mouseY;
          drawRect = true;
          //save the current pixel array after the drawing
          loadPixels();
        } 
        else 
        {
          if(noStrokeMode == true)
          {
            noStroke();
          }
          //updates the canvas with the data from the pixels[] array. This will remove any previous changes between pressing and releasing the mouse.
          updatePixels();
          //draw the rect
          rect(start_X, start_Y, mouseX-start_X, mouseY-start_Y);
        }
      }
      //if the mouse is not pressed then it will reset the initial values start_X=-1 & start_Y=-1
      else if (drawRect) {
        //save the pixels, resets the drawRect bool and reset start locations
        loadPixels();
        drawRect = false;
        start_X = -1;
        start_Y = -1;
      }
    };

    this.unselectTool = function() {
      //reset cursor symbol
      cursor(HAND);
      if(self.name == "MyRectangleTool"){
          //remove the current selection in the options section
          select(".options").html("");
          noStrokeMode = false;
      } 
    };
  }