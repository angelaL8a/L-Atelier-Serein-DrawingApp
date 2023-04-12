function HatchingTool()
{
    this.name = 'BloomBrushTool'
    this.icon = 'assets/tools/parallel.png'

    var start_X = -1;
	  var start_Y = -1;
    //set the drawLines state
    var drawLines = false;
    var self = this;

    this.populateOptions = function()
    {
      //create a slider to change the strokeWeight of the lines
      select(".options").html(
        "<label style='color:black;font-size:20' for='freehandSize'>Opacity</label> <input type='range' min='40' max='99' value='99' class='slider' id='lineOpacity'>");
    }

    this.draw = function() 
    {
      strokeColor = document.getElementById("colorpicker").value;
		  //stroke(strokeColor);
      opacityLine = document.getElementById("lineOpacity").value; 
      op = opacityLine.toString();
      if(opacityLine == 99)
        {
            op = "FF";
        }
        stroke(strokeColor+op);
      
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
          push();
          this.hatching()
          pop();
        }
      }
      else if(drawLines){
        //The positions and bool are reset when the mouse is released.
        //IMPORTANT: The updates that were made in the pixel array are 
        //not restored, they were saved.
        loadPixels();
        drawLines = false;
        start_X = -1;
        start_Y = -1;
      }
    };
      
    this.hatching = function() {   
      
      strokeWeight(1);
      
      // calculate the speed of the mouse
      speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)
      
      // make a vector by inverting X and Y values
      vector = createVector(mouseY - pmouseY, mouseX - pmouseX)
        
      // set the vector magnitude (the line length) based on the mouse speed
      vector.setMag(speed / 2)
        
      // set the number of times we lerp the line
      lerps = 3
      
      // repeat the line with lerping
      for (let i = 0; i < lerps; i++) {
      
        // find the lerp
        x = lerp(mouseX, pmouseX, i / lerps)
        y = lerp(mouseY, pmouseY, i / lerps)
      
        // draw
        line(x - vector.x, y - vector.y, x + vector.x, y + vector.y)
      }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
      if(self.name == "BloomBrushTool"){
          select(".options").html("");
      }	
    };
}